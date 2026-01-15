import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getInvoices } from "../api/api";

export default function Invoices() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    if (user) {
      getInvoices(user.user_id).then(setInvoices);
    }
  }, [user]);

  return (
    <div>
      <h2>Invoices</h2>
      <ul>
        {invoices.map((inv) => (
          <li key={inv.id}>
            {inv.billing_period_start} – ₹{inv.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
