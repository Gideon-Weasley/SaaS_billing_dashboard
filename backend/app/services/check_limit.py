from app.db.session import get_db_connection
from fastapi import HTTPException

def check_limit(cur_id,usage):
    conn=get_db_connection()
    cur=conn.cursor()
     #checking whether plan has been completely used
    try:
        cur.execute(
            """
            SELECT COALESCE(SUM(units_used),0) AS total_units FROM usage_events WHERE user_id = %s
            """,
            (cur_id,)
        )
        current_total = cur.fetchone()["total_units"]
        cur.execute(
            """
            SELECT p.monthly_limit AS plan_limit
            FROM users u JOIN plans p ON u.plan_id = p.id
            WHERE u.id = %s
            """,
            (cur_id,)
        )
        plan_limit = cur.fetchone()["plan_limit"]
        if current_total + usage > plan_limit:
            raise HTTPException(status_code=400, detail="Usage exceeds plan limit")
    finally:
        cur.close()
        conn.close()