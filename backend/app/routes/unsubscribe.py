from fastapi import APIRouter, HTTPException, status
from app.db.session import get_db_connection
from app.models.schemas import UnsubscribeRequest

router = APIRouter(prefix="/unsubscribe", tags=["Unsubscribe"])

@router.post("", status_code=status.HTTP_200_OK)
def unsubscribe_user(details: UnsubscribeRequest):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT COUNT(*) AS pending_count
        FROM invoices
        WHERE user_id = %s
        AND status = 'PENDING'
    """, (details.user_id,))

    pending = cur.fetchone()["pending_count"]

    if pending > 0:
        cur.close()
        conn.close()
        raise HTTPException(
            status_code=400,
            detail="Cannot unsubscribe: pending payments exist"
        )

    cur.execute("""
        DELETE FROM users
        WHERE id = %s
    """, (details.user_id,))

    conn.commit()
    cur.close()
    conn.close()

    return {
        "message": "User unsubscribed successfully",
        "reason": details.reason
    }
