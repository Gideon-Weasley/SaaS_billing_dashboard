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

export async function getMonthlyUsage(userId) {
  const res = await fetch(
    `http://localhost:8000/usage/monthly?user_id=${userId}`
  );
  return res.json();
}
