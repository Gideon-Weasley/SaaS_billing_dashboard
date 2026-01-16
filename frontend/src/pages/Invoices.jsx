import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getInvoices, payInvoice } from "../api/api";
import "../styles/invoices.css";

export default function Invoices() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const loadInvoices = () => {
    getInvoices(user.user_id).then(setInvoices);
  };

  useEffect(() => {
    if (user) loadInvoices();
  }, [user]);

  const handlePay = async (invoiceId) => {
    try {
      setLoadingId(invoiceId);
      await payInvoice(invoiceId, user.user_id);
      loadInvoices(); // refresh after payment
    } catch (e) {
      alert("Payment failed");
    } finally {
      setLoadingId(null);
    }
  };

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
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td>
                {inv.billing_period_start} – {inv.billing_period_end}
              </td>
              <td>{inv.total_units}</td>
              <td>₹{inv.amount}</td>
              <td
                className={
                  inv.status === "PAID"
                    ? "status-paid"
                    : "status-pending"
                }
              >
                {inv.status}
              </td>
              <td>
                {inv.status === "PENDING" ? (
                  <button
                    onClick={() => handlePay(inv.id)}
                    disabled={loadingId === inv.id}
                  >
                    {loadingId === inv.id ? "Processing..." : "Pay"}
                  </button>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
