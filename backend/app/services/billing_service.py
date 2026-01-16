from datetime import date, timedelta
from app.db.session import get_db_connection
from app.models.schemas import ManualBillingRequest
from fastapi import APIRouter, BackgroundTasks
from app.services.email_service import send_invoice_email, send_failure_email
import asyncio

router = APIRouter(prefix="/billing", tags=["Billing"])

@router.post("/manual")
def generate_previous_month_invoice_for_user(
    data: ManualBillingRequest,
    background_tasks: BackgroundTasks
):
    try:
        user_id = data.user_id
        ...
        conn.commit()

        # ASYNC EMAIL
        background_tasks.add_task(
            send_invoice_email,
            email,
            amount,
            billing_start,
            billing_end
        )

        return {
            "user_id": user_id,
            "amount": amount
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
            asyncio.run(
                generate_previous_month_invoice_for_user(
                    ManualBillingRequest(user_id=user["id"]),
                    background_tasks=None
                )
            )
        except Exception as e:
            asyncio.run(send_failure_email(str(e)))
