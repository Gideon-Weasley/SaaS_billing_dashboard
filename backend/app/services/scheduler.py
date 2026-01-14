from apscheduler.schedulers.background import BackgroundScheduler
from app.services.billing_service import generate_previous_month_invoices_for_all_users

def start_scheduler():
    scheduler = BackgroundScheduler()

    scheduler.add_job(
        generate_previous_month_invoices_for_all_users,
        trigger="cron",
        day=1,
        hour=0,
        minute=5
    )

    scheduler.start()
    print("Scheduler started: Monthly invoice generation job scheduled.")