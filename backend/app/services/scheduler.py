from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.services.billing_service import generate_previous_month_invoices_for_all_users
from app.services.usage_alerts import check_usage_thresholds
import asyncio

scheduler = AsyncIOScheduler()

def start_scheduler():
    # Monthly invoice generation (sync → wrap)
    scheduler.add_job(
        lambda: asyncio.to_thread(generate_previous_month_invoices_for_all_users),
        trigger="cron",
        day=1,
        hour=0,
        minute=5
    )

    # Usage threshold alerts (async → direct)
    scheduler.add_job(
        check_usage_thresholds,
        trigger="interval",
        minutes=10
    )

    scheduler.start()
    print("Scheduler started: invoices + usage alerts")
