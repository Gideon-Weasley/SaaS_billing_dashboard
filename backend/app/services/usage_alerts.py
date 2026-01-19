from app.db.session import get_db_connection
from app.services.email_service import send_email
import asyncio

async def check_usage_thresholds():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
          u.id,
          u.email,
          p.monthly_limit,
          COALESCE(SUM(ue.units_used),0) AS used
        FROM users u
        JOIN plans p ON u.plan_id = p.id
        LEFT JOIN usage_events ue ON ue.user_id = u.id
        GROUP BY u.id, u.email, p.monthly_limit
    """)

    users = cur.fetchall()

    for u in users:
        percent = int((u["used"] / u["monthly_limit"]) * 100)

        for threshold in (80, 100):
            if percent >= threshold:
                cur.execute("""
                    SELECT triggered FROM usage_alerts
                    WHERE user_id=%s AND threshold=%s
                """, (u["id"], threshold))

                row = cur.fetchone()

                if not row:
                    cur.execute("""
                        INSERT INTO usage_alerts (user_id, threshold, triggered)
                        VALUES (%s, %s, TRUE)
                    """, (u["id"], threshold))
                    conn.commit()

                    await send_email(
                        u["email"],
                        "Usage Alert",
                        f"You have reached {threshold}% of your usage limit."
                    )

    cur.close()
    conn.close()
