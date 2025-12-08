import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    // --------------------------
    // Validate email empty
    // --------------------------
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    // --------------------------
    // Check registered users in localStorage
    // --------------------------
    const users = JSON.parse(localStorage.getItem("tms_users") || "[]");

    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      setError("This email is not registered.");
      return;
    }

    // -------------------------------------------------------
    // OPTION A (ACTIVE NOW)
    // ✔ Only show success message
    // ✔ Does NOT reset password
    // ✔ Does NOT send email (frontend only)
    // -------------------------------------------------------
    setMessage("Password reset successful.");

    // -------------------------------------------------------
    // OPTION B (BACKEND USE ONLY — keep commented)
    //
    // After backend integration:
    //
    // await fetch("http://localhost:5000/api/auth/forgot-password", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    // });
    //
    // setMessage(
    //   "A password reset link has been sent to your email. Please check your inbox."
    // );
    // -------------------------------------------------------
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <h2>Forgot Password</h2>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="yourname@tce.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </form>

        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <a href="/login" style={{ color: "#666" }}>
            ← Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
