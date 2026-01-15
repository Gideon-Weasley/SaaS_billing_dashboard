from fastapi import APIRouter
from app.db.session import get_db_connection

router = APIRouter(prefix="/invoices", tags=["Invoices"]) #how does these all appear when running main?

#user_id = 1


@router.get("/")
def get_invoices(user_id:int):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            billing_period_start,
            billing_period_end,
            total_units,
            amount,
            status,
            created_at
        FROM invoices
        WHERE user_id = %s
        ORDER BY billing_period_start DESC
    """, (user_id,))

    invoices = cur.fetchall()

    cur.close()
    conn.close()

    return invoices
