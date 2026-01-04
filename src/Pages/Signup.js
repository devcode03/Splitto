import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../Contexts/AuthContext";
import "../styles/Auth.css";

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState("");
    const { signup, loginGoogle } = useAuth();
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Check password strength
        if (name === "password") {
            checkPasswordStrength(value);
        }
    }

    function checkPasswordStrength(password) {
        if (password.length === 0) {
            setPasswordStrength("");
        } else if (password.length < 6) {
            setPasswordStrength("weak");
        } else if (password.length < 10) {
            setPasswordStrength("medium");
        } else {
            setPasswordStrength("strong");
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Validation
        if (!formData.firstName || !formData.lastName || !formData.email ||
            !formData.password || !formData.confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password should be at least 6 characters");
            return;
        }

        setError("");
        setLoading(true);

        const result = await signup(
            formData.email,
            formData.password,
            formData.firstName,
            formData.lastName
        );

        setLoading(false);

        if (result.success) {
            navigate("/");
        } else {
            setError(result.error);
        }
    }

    async function handleGoogleSignup() {
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
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Start splitting bills with friends</p>
                </div>

                {error && (
                    <div className="auth-message error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label className="form-label" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                name="firstName"
                                className="form-input"
                                placeholder="John"
                                value={formData.firstName}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                name="lastName"
                                className="form-input"
                                placeholder="Doe"
                                value={formData.lastName}
                                onChange={handleChange}
                                disabled={loading}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
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
                            name="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            required
                        />
                        {passwordStrength && (
                            <div className="password-strength">
                                <div className="strength-bar">
                                    <div className={`strength-fill strength-${passwordStrength}`}></div>
                                </div>
                                <span className="strength-text">
                                    Password strength: {passwordStrength}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            className="form-input"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
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
                                Creating Account...
                            </>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

                <div className="auth-divider">
                    <div className="divider-line"></div>
                    <span className="divider-text">OR</span>
                    <div className="divider-line"></div>
                </div>

                <button
                    onClick={handleGoogleSignup}
                    className="auth-btn btn-google"
                    disabled={loading}
                >
                    <FcGoogle className="google-icon" />
                    Sign up with Google
                </button>

                <div className="auth-footer">
                    <p className="auth-footer-text">
                        Already have an account?{" "}
                        <Link to="/login" className="auth-link">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
