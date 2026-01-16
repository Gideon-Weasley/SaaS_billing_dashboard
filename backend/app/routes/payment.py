from fastapi import APIRouter, HTTPException
from app.db.session import get_db_connection

router = APIRouter(prefix="/payments", tags=["Payments"])

@router.post("/pay")
def pay_invoice(invoice_id: int, user_id: int):
    conn = get_db_connection()
    cur = conn.cursor()

    # verify invoice
    cur.execute("""
        SELECT status FROM invoices
        WHERE id = %s AND user_id = %s
    """, (invoice_id, user_id))

    invoice = cur.fetchone()
    if not invoice:
        cur.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Invoice not found")

    if invoice["status"] == "PAID":
        cur.close()
        conn.close()
        return {"message": "Invoice already paid"}

    # mark as paid
    cur.execute("""
        UPDATE invoices
        SET status = 'PAID'
        WHERE id = %s
    """, (invoice_id,))

    conn.commit()
    cur.close()
    conn.close()

    return {"message": "Payment successful"}
