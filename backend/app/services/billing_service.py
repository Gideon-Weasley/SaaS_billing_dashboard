from datetime import date, timedelta
from app.db.session import get_db_connection
from app.services.email_service import send_invoice_email
from fastapi import APIRouter
from app.models.schemas import ManualBillingRequest

router = APIRouter(prefix="/billing", tags=["Billing"])

@router.post("/manual")
def generate_previous_month_invoice_for_user(data: ManualBillingRequest):
    #Generates invoice for the previous month for a single user.
    user_id=data.user_id
    today = date.today()
    first_of_this_month = today.replace(day=1)
    last_day_prev_month = first_of_this_month - timedelta(days=1)
    first_day_prev_month = last_day_prev_month.replace(day=1)

    billing_start = first_day_prev_month
    billing_end = first_of_this_month

    conn = get_db_connection()
    cur = conn.cursor()

    # Prevent duplicate invoice
    cur.execute("""
        SELECT id FROM invoices
        WHERE user_id = %s
        AND billing_period_start = %s
    """, (user_id, billing_start))

    if cur.fetchone():
        cur.close()
        conn.close()
        return {"message": "Invoice already exists for previous month"}

    # find tottal units used in that month
    cur.execute("""
        SELECT COALESCE(SUM(units_used), 0) AS total_units
        FROM usage_events
        WHERE user_id = %s
        AND timestamp >= %s
        AND timestamp < %s
    """, (user_id, billing_start, billing_end))

    total_units = cur.fetchone()["total_units"]

    # Get pricing and email
    cur.execute("""
        SELECT u.email, p.ppu AS price_per_unit
        FROM users u
        JOIN plans p ON u.plan_id = p.id
        WHERE u.id = %s
    """, (user_id,))

    user_data = cur.fetchone()
    email = user_data["email"]
    price_per_unit = user_data["price_per_unit"]
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

    send_invoice_email(email, amount, billing_start, billing_end)

    cur.close()
    conn.close()

    return {
        "user_id": user_id,
        "billing_period": f"{billing_start} to {billing_end}",
        "total_units": total_units,
        "amount": amount
    }

def generate_previous_month_invoices_for_all_users():
   # Called by scheduler - generates  invoices for all users for the previous month.

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT id FROM users")
    users = cur.fetchall()

    cur.close()
    conn.close()

    for user in users:
        generate_previous_month_invoice_for_user(user["id"])