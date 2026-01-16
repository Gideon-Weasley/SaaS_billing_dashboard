import os
from email.message import EmailMessage
import aiosmtplib
from dotenv import load_dotenv

load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST")
SMTP_PORT = int(os.getenv("SMTP_PORT"))
SMTP_USER = os.getenv("SMTP_USER")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")


async def send_email(to: str, subject: str, body: str):
    message = EmailMessage()
    message["From"] = SMTP_USER
    message["To"] = to
    message["Subject"] = subject
    message.set_content(body)

    await aiosmtplib.send(
        message,
        hostname=SMTP_HOST,
        port=SMTP_PORT,
        start_tls=True,
        username=SMTP_USER,
        password=SMTP_PASSWORD,
    )


async def send_invoice_email(email, amount, start_date, end_date):
    subject = "Your Monthly Invoice"
    body = f"""
Hello,

Your invoice has been generated successfully.

Billing Period: {start_date} to {end_date}
Amount Due: ₹{amount}

Thank you for using our service.
"""
    await send_email(email, subject, body)


async def send_failure_email(reason: str):
    subject = "Billing Failure Alert"
    body = f"""
ALERT:

A billing failure occurred.

Reason:
{reason}
"""
    await send_email(ADMIN_EMAIL, subject, body)
