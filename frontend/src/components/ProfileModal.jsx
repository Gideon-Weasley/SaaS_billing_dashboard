import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { unsubscribeUser } from "../api/api";
import "./ProfileModal.css";

export default function ProfileModal({ isOpen, onClose }) {
  const { user, logout } = useAuth();
  const [showUnsubscribe, setShowUnsubscribe] = useState(false);
  const [unsubscribeReason, setUnsubscribeReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleUnsubscribe = async () => {
    if (!unsubscribeReason.trim()) {
      setError("Please provide a reason");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await unsubscribeUser(user.user_id, unsubscribeReason);
      logout();
      onClose();
    } catch (err) {
      setError(err.message || "Unsubscribe failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="profile-modal-overlay" onClick={onClose} />
      <div className="profile-modal">
        {!showUnsubscribe ? (
          <>
            <div className="profile-header">
              <div className="profile-avatar">
                {user?.email?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="profile-info">
                <h3>{user?.email || "User"}</h3>
                <p className="profile-id">ID: {user?.user_id}</p>
              </div>
              <button className="profile-close" onClick={onClose}>
                ✕
              </button>
            </div>

            <div className="profile-content">
              <div className="profile-section">
                <h4>Account</h4>
                <div className="profile-item">
                  <span className="profile-label">Email:</span>
                  <span className="profile-value">{user?.email}</span>
                </div>
              </div>
            </div>

            <div className="profile-actions">
              <button
                className="profile-btn danger"
                onClick={() => setShowUnsubscribe(true)}
              >
                Unsubscribe
              </button>
              <button className="profile-btn secondary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="unsubscribe-header">
              <h3>Unsubscribe</h3>
              <button className="profile-close" onClick={() => setShowUnsubscribe(false)}>
                ✕
              </button>
            </div>

            <div className="unsubscribe-content">
              <p className="warning-text">
                ⚠️ This action will permanently delete your account and all associated data.
              </p>
              <p className="warning-text secondary">
                Please note: You cannot unsubscribe if you have pending payments.
              </p>

              <label className="form-label">
                Why are you leaving? (Optional)
              </label>
              <textarea
                className="unsubscribe-textarea"
                placeholder="Tell us why you're unsubscribing..."
                value={unsubscribeReason}
                onChange={(e) => setUnsubscribeReason(e.target.value)}
                rows="4"
              />

              {error && <div className="error-text">{error}</div>}
            </div>

            <div className="profile-actions">
              <button
                className="profile-btn danger"
                onClick={handleUnsubscribe}
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm Unsubscribe"}
              </button>
              <button
                className="profile-btn secondary"
                onClick={() => setShowUnsubscribe(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
