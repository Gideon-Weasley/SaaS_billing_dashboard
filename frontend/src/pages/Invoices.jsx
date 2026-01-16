import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getInvoices } from "../api/api";
import "../styles/invoices.css";

export default function Invoices() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    getInvoices(user.user_id).then(setInvoices);
  }, [user]);

  return (
    <div style={{ padding: "24px" }}>
      <h2>Invoices</h2>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Period</th>
            <th>Units</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td>{inv.billing_period_start} – {inv.billing_period_end}</td>
              <td>{inv.total_units}</td>
              <td>₹{inv.amount}</td>
              <td className={inv.status === "PAID" ? "status-paid" : "status-pending"}>
                {inv.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
