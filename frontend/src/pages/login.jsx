import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../api/api";
import "../styles/Login.css";

export default function Login() {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || "Login failed");

      login({ user_id: data.user_id, email });
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const data = await registerUser(email, password);
      login({ user_id: data.user_id, email });
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsRegister(!isRegister);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="login-title">
            {isRegister ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="login-subtitle">
            {isRegister
              ? "Join us today and start billing"
              : "Access your billing dashboard"}
          </p>
        </div>

        <div className="login-tabs">
          <button
            className={`login-tab ${!isRegister ? "active" : ""}`}
            onClick={() => !isRegister || handleToggle()}
          >
            Login
          </button>
          <button
            className={`login-tab ${isRegister ? "active" : ""}`}
            onClick={() => isRegister || handleToggle()}
          >
            Register
          </button>
        </div>

        <form
          onSubmit={isRegister ? handleRegisterSubmit : handleLoginSubmit}
          className="login-form"
        >
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isRegister && (
            <input
              className="login-input"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Processing..." : isRegister ? "Create Account" : "Login"}
          </button>

          {error && <div className="login-error">{error}</div>}
        </form>

        <div className="login-footer">
          <p>
            {isRegister
              ? "Already have an account?"
              : "Don't have an account?"}
            <button
              type="button"
              className="login-link"
              onClick={handleToggle}
            >
              {isRegister ? " Login" : " Register"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
