const BASE_URL = "http://localhost:8000";

export async function getUsageSummary() {
  const res = await fetch(`${BASE_URL}/usage/summary`);
  if (!res.ok) {
    throw new Error(`Failed to fetch usage summary: ${res.statusText}`);
  }
  return res.json();
}

export async function getInvoices() {
  const res = await fetch(`${BASE_URL}/invoices`);
  if (!res.ok) {
    throw new Error(`Failed to fetch invoices: ${res.statusText}`);
  }
  return res.json();
}

export async function generateInvoice(user_id) {
  const res = await fetch(`${BASE_URL}/billing/manual`);
  }