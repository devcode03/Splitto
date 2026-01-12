import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import "../styles/Auth.css";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { forgotPassword } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!email) {
            setError("Please enter your email address");
            return;
        }

        setError("");
        setSuccess(false);
        setLoading(true);

        const result = await forgotPassword(email);
        setLoading(false);

        if (result.success) {
            setSuccess(true);
            setEmail("");
        } else {
            setError(result.error);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Reset Password</h1>
                    <p className="auth-subtitle">
                        Enter your email to receive a password reset link
                    </p>
                </div>

                {error && (
                    <div className="auth-message error-message">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="auth-message success-message">
                        If an account exists with this email, you will receive a password reset link. Please check your inbox (and spam folder).
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="form-input"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="auth-spinner"></span>
                                Sending Reset Link...
                            </>
                        ) : (
                            "Send Reset Link"
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p className="auth-footer-text">
                        Remember your password?{" "}
                        <Link to="/login" className="auth-link">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
