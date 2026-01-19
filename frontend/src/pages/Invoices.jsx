import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getInvoices, payInvoice } from "../api/api";
import "../styles/invoices.css";

export default function Invoices() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const loadInvoices = () => {
    setLoading(true);
    getInvoices(user.user_id)
      .then(setInvoices)
      .finally(() => setLoading(false));
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
      alert("Payment failed: " + e.message);
    } finally {
      setLoadingId(null);
    }
  };

  const filteredInvoices = invoices.filter((inv) => {
    if (filter === "paid") return inv.status === "PAID";
    if (filter === "pending") return inv.status === "PENDING";
    return true;
  });

  const stats = {
    total: invoices.length,
    paid: invoices.filter((inv) => inv.status === "PAID").length,
    pending: invoices.filter((inv) => inv.status === "PENDING").length,
  };

  return (
    <div style={{ padding: "24px" }}>
      <div className="invoice-header">
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "700", margin: "0 0 8px 0" }}>
            Invoices
          </h1>
          <p style={{ color: "var(--text-light)", margin: 0 }}>
            Manage and view your billing invoices
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        <div style={{ background: "white", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <p style={{ color: "var(--text-light)", fontSize: "12px", margin: "0 0 8px 0" }}>Total Invoices</p>
          <h3 style={{ margin: 0, fontSize: "24px", fontWeight: "700", color: "var(--primary)" }}>{stats.total}</h3>
        </div>
        <div style={{ background: "white", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <p style={{ color: "var(--text-light)", fontSize: "12px", margin: "0 0 8px 0" }}>Paid</p>
          <h3 style={{ margin: 0, fontSize: "24px", fontWeight: "700", color: "var(--success)" }}>{stats.paid}</h3>
        </div>
        <div style={{ background: "white", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <p style={{ color: "var(--text-light)", fontSize: "12px", margin: "0 0 8px 0" }}>Pending</p>
          <h3 style={{ margin: 0, fontSize: "24px", fontWeight: "700", color: "var(--warning)" }}>{stats.pending}</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="invoice-filters" style={{ marginBottom: "24px" }}>
        <button
          className={`invoice-filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({stats.total})
        </button>
        <button
          className={`invoice-filter-btn ${filter === "paid" ? "active" : ""}`}
          onClick={() => setFilter("paid")}
        >
          Paid ({stats.paid})
        </button>
        <button
          className={`invoice-filter-btn ${filter === "pending" ? "active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          Pending ({stats.pending})
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-light)" }}>
          Loading invoices...
        </div>
      ) : filteredInvoices.length === 0 ? (
        <div className="invoice-empty">
          <div className="invoice-empty-icon">📄</div>
          <div className="invoice-empty-text">
            {filter === "all"
              ? "No invoices found"
              : `No ${filter} invoices found`}
          </div>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
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
              {filteredInvoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="invoice-period">
                    {inv.billing_period_start} – {inv.billing_period_end}
                  </td>
                  <td>{inv.total_units}</td>
                  <td className="invoice-amount">₹{inv.amount}</td>
                  <td>
                    <span
                      className={
                        inv.status === "PAID"
                          ? "status-paid"
                          : "status-pending"
                      }
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td>
                    {inv.status === "PENDING" ? (
                      <button
                        className="invoice-action"
                        onClick={() => handlePay(inv.id)}
                        disabled={loadingId === inv.id}
                      >
                        {loadingId === inv.id ? "Processing..." : "Pay Now"}
                      </button>
                    ) : (
                      <span style={{ color: "var(--text-light)", fontSize: "12px" }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
