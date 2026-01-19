import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ProfileModal from "./ProfileModal";
import "./Navbar.css";

export default function Navbar({ setActivePage }) {
  const { user } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <h2 className="navbar-title">💳 SaaS Billing</h2>
        </div>

        <div className="navbar-menu">
          <button
            className="navbar-link"
            onClick={() => setActivePage("dashboard")}
          >
            📊 Dashboard
          </button>
          <button
            className="navbar-link"
            onClick={() => setActivePage("invoices")}
          >
            📄 Invoices
          </button>
        </div>

        <div className="navbar-profile">
          <button
            className="profile-circle"
            onClick={() => setShowProfile(true)}
            title={user?.email}
          >
            {user?.email?.[0]?.toUpperCase() || "U"}
          </button>
        </div>
      </nav>

      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </>
  );
}
