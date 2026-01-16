from fastapi import APIRouter, HTTPException, status
from datetime import date
from app.db.session import get_db_connection
from app.models.schemas import UsageCreate
from app.services.check_limit import check_limit
from app.ws.usage_ws import manager

router = APIRouter(prefix="/usage", tags=["Usage"])

#CURRENT_USER_ID = 7  # simulated logged-in user


@router.post("/", status_code=201)
async def add_usage(usage: UsageCreate):
    conn = get_db_connection()
    cur = conn.cursor()
    check_limit(usage.u_id,usage.units_used)
    cur.execute("""
        INSERT INTO usage_events (user_id, units_used)
        VALUES (%s, %s)
    """, (usage.u_id, usage.units_used))

    conn.commit()

    # get updated total
    cur.execute("""
        SELECT COALESCE(SUM(units_used), 0) AS total_used
        FROM usage_events
        WHERE user_id = %s
    """, (usage.u_id,))
    total_used = cur.fetchone()["total_used"]

    cur.close()
    conn.close()

    await manager.broadcast({
        "user_id": usage.u_id,
        "total_used": total_used
    })

    return {"message": "Usage added"}


@router.get("/summary")
def get_monthly_usage_summary(user_id: int):
    today = date.today()
    month_start = today.replace(day=1)

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT
            COALESCE(SUM(units_used), 0) AS total_units
        FROM usage_events
        WHERE user_id = %s
        AND timestamp >= %s
        """,
        (user_id, month_start)
    )

    result = cur.fetchone()

    cur.execute("""
        SELECT p.monthly_limit
        FROM users u
        JOIN plans p ON u.plan_id = p.id
        WHERE u.id = %s
    """, (user_id,))
    plan_limit = cur.fetchone()["monthly_limit"]

    cur.close()
    conn.close()

    return {
        "month": month_start.strftime("%Y-%m"),
        "total_used": result["total_units"],
        "plan_limit": plan_limit
    }

@router.get("/monthly")
def get_monthly_usage(user_id: int):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""SELECT
        EXTRACT(YEAR FROM timestamp) AS year,
        EXTRACT(MONTH FROM timestamp) AS month_num,
        TO_CHAR(timestamp, 'Mon YYYY') AS label,
        SUM(units_used) AS units
        FROM usage_events
        WHERE user_id = %s
        GROUP BY year, month_num, label
        ORDER BY year, month_num;
"""
, (user_id,))

    data = cur.fetchall()
    cur.close()
    conn.close()

    return data