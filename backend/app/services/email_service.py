def send_invoice_email(email, amount, start_date, end_date):
    print("----- INVOICE EMAIL -----")
    print(f"To: {email}")
    print(f"Billing Period: {start_date} to {end_date}")
    print(f"Amount Due: ₹{amount}")
    print("-------------------------")
