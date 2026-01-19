const BASE_URL = "http://localhost:8000";

export async function getUsageSummary(userId) {
  const res = await fetch(
    `${BASE_URL}/usage/summary?user_id=${userId}`
  );
  return res.json();
}

export async function getInvoices(userId) {
  const res = await fetch(`${BASE_URL}/invoices?user_id=${userId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch invoices: ${res.statusText}`);
  }
  return res.json();
}

export async function generateInvoice(user_id) {
  const res = await fetch(`${BASE_URL}/billing/manual`);
}

export async function loginUser(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_id: email,
      passwd: password,
    }),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json();
}

export async function registerUser(email, password, planId = 1) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      plan_id: planId,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Registration failed");
  }

  return res.json();
}

export async function getMonthlyUsage(userId) {
  const res = await fetch(
    `http://localhost:8000/usage/monthly?user_id=${userId}`
  );
  return res.json();
}

export async function payInvoice(invoiceId, userId) {
  const res = await fetch(
    `http://localhost:8000/payments/pay?invoice_id=${invoiceId}&user_id=${userId}`,
    {
      method: "POST"
    }
  );

  if (!res.ok) {
    throw new Error("Payment failed");
  }

  return res.json();
}

export async function unsubscribeUser(userId, reason = "User requested") {
  const res = await fetch(`${BASE_URL}/unsubscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      reason,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Unsubscribe failed");
  }

  return res.json();
}

