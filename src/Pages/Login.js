import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../Contexts/AuthContext";
import "../styles/Auth.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login, loginGoogle } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setError("");
        setLoading(true);

        const result = await login(email, password);
        setLoading(false);

        if (result.success) {
            navigate("/");
        } else {
            setError(result.error);
        }
    }

    async function handleGoogleLogin() {
        setError("");
        setLoading(true);

        const result = await loginGoogle();
        setLoading(false);

        if (result.success) {
            navigate("/");
        } else {
            setError(result.error);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-title">Welcome Back</h1>
                    <p className="auth-subtitle">Sign in to manage your splits</p>
                </div>

                {error && (
                    <div className="auth-message error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">
                            Email
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

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="forgot-password">
                        <Link to="/forgot-password" className="auth-link">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="auth-btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="auth-spinner"></span>
                                Signing In...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                <div className="auth-divider">
                    <div className="divider-line"></div>
                    <span className="divider-text">OR</span>
                    <div className="divider-line"></div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="auth-btn btn-google"
                    disabled={loading}
                >
                    <FcGoogle className="google-icon" />
                    Continue with Google
                </button>

                <div className="auth-footer">
                    <p className="auth-footer-text">
                        Don't have an account?{" "}
                        <Link to="/signup" className="auth-link">
                            <strong>Sign Up</strong>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
