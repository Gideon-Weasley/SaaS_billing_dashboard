from fastapi import APIRouter, Depends, HTTPException, status
from app.db.session import get_db_connection
from app.models.schemas import UnsubscribeRequest
router = APIRouter(prefix="/unsubscribe", tags=["Unsubscribe"])

CURR_USER_ID=3
@router.post("", status_code=status.HTTP_200_OK)
def unsubscribe_user(details:UnsubscribeRequest):
    conn=get_db_connection()
    curr=conn.cursor()

    curr.execute("""DELETE FROM users WHERE id=%s""",(details.user_id,))

    conn.commit()
    curr.close()
    conn.close()
    return{"message":"User unsubscribed successfully",
           "reason":details.reason}