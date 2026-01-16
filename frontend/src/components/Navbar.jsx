import "./Navbar.css";

export default function Navbar({ setActivePage }) {
  return (
    <nav className="navbar">
      <h2>SaaS Billing</h2>
      <div>
        <button onClick={() => setActivePage("dashboard")}>
          Dashboard
        </button>
        <button onClick={() => setActivePage("invoices")}>
          Invoices
        </button>
      </div>
    </nav>
  );
}
