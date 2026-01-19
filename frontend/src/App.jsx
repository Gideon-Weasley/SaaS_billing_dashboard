import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import Login from "./pages/login";
import "./styles/app.css";

function App() {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState("dashboard");

  if (!user) return <Login />;

  return (
    <>
      <Navbar setActivePage={setActivePage} />
      <main style={{ backgroundColor: "var(--bg-light)" }}>
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "invoices" && <Invoices />}
      </main>
    </>
  );
}

export default App;
