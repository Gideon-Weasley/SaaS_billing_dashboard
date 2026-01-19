from datetime import date, timedelta
from app.db.session import get_db_connection
from app.models.schemas import ManualBillingRequest
from fastapi import APIRouter, BackgroundTasks
from app.services.email_service import send_invoice_email, send_failure_email
import asyncio

router = APIRouter(prefix="/billing", tags=["Billing"])

def create_previous_month_invoice(user_id: int):
    conn = get_db_connection()
    cur = conn.cursor()

    today = date.today()
    first_of_this_month = today.replace(day=1)
    last_day_prev_month = first_of_this_month - timedelta(days=1)
    billing_start = last_day_prev_month.replace(day=1)
    billing_end = first_of_this_month

    # prevent duplicates
    cur.execute("""
        SELECT id FROM invoices
        WHERE user_id = %s AND billing_period_start = %s
    """, (user_id, billing_start))

    if cur.fetchone():
        cur.close()
        conn.close()
        return None

    # total usage
    cur.execute("""
        SELECT COALESCE(SUM(units_used), 0) AS total_units
        FROM usage_events
        WHERE user_id = %s
        AND timestamp >= %s AND timestamp < %s
    """, (user_id, billing_start, billing_end))

    total_units = cur.fetchone()["total_units"]

    cur.execute("""
        SELECT u.email, p.ppu
        FROM users u
        JOIN plans p ON u.plan_id = p.id
        WHERE u.id = %s
    """, (user_id,))

    row = cur.fetchone()
    email = row["email"]
    price_per_unit = row["ppu"]

    amount = total_units * price_per_unit

    cur.execute("""
        INSERT INTO invoices (
            user_id,
            unit,
            billing_period_start,
            billing_period_end,
            total_units,
            amount,
            status
        )
        VALUES (%s,3, %s, %s, %s, %s, %s)
    """, (
        user_id,
        billing_start,
        billing_end,
        total_units,
        amount,
        "PENDING"
    ))

    conn.commit()
    cur.close()
    conn.close()

    return {
        "email": email,
        "amount": amount,
        "billing_start": billing_start,
        "billing_end": billing_end
    }


@router.post("/manual")
def manual_billing(
    data: ManualBillingRequest,
    background_tasks: BackgroundTasks
):
    try:
        result = create_previous_month_invoice(data.user_id)

        if not result:
            return {"message": "Invoice already exists"}

        background_tasks.add_task(
            send_invoice_email,
            result["email"],
            result["amount"],
            result["billing_start"],
            result["billing_end"]
        )

        return {
            "user_id": data.user_id,
            "amount": result["amount"]
        }

    except Exception as e:
        background_tasks.add_task(send_failure_email, str(e))
        raise

def generate_previous_month_invoices_for_all_users():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT id FROM users")
    users = cur.fetchall()
    cur.close()
    conn.close()

    for user in users:
        try:
            result = create_previous_month_invoice(user["id"])
            if result:
                asyncio.run(
                    send_invoice_email(
                        result["email"],
                        result["amount"],
                        result["billing_start"],
                        result["billing_end"]
                    )
                )
        except Exception as e:
            asyncio.run(send_failure_email(str(e)))
