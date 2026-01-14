from fastapi import APIRouter, HTTPException, status
from datetime import date
from app.db.session import get_db_connection
from app.models.schemas import UsageCreate
from app.services.check_limit import check_limit

router = APIRouter(prefix="/usage", tags=["Usage"])

CURRENT_USER_ID = 1  # simulated logged-in user


@router.post("")
def add_usage(usage: UsageCreate,status_code=status.HTTP_201_CREATED):
    if usage.units_used <= 0:
        raise HTTPException(status_code=400, detail="Units must be positive")

    conn = get_db_connection()
    cur = conn.cursor()
    #checking whether plan has been completely used
    check_limit(CURRENT_USER_ID, usage.units_used)
    #else, insert
    cur.execute(
        """
        INSERT INTO usage_events (user_id, units_used)
        VALUES (%s, %s) 
        """,
        (CURRENT_USER_ID, usage.units_used)
    )

    conn.commit()
    cur.close()
    conn.close()

    return {
        "message": "Usage recorded successfully",
        "units_used": usage.units_used
    }


@router.get("/summary")
def get_monthly_usage_summary():
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
        (CURRENT_USER_ID, month_start)
    )

    result = cur.fetchone()

    cur.close()
    conn.close()

    return {
        "month": month_start.strftime("%Y-%m"),
        "total_units": result["total_units"]
    }
