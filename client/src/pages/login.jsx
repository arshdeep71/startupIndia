import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  // Validate signup fields
  const validateSignup = () => {
    if (!formData.fullName) return "Full name is required";
    if (!formData.email) return "Email is required";
    if (!formData.password) return "Password is required";
    if (formData.password.length < 6)
      return "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      return "Passwords do not match";
    return null;
  };

  // Login request
  const handleLogin = async () => {
    const { email, password } = formData;

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  // Signup request
  const handleSignup = async () => {
    const errorMsg = validateSignup();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      // Auto-login after signup (optional)
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      await handleLogin();
    } else {
      await handleSignup();
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <div className="login-form-card card">

          <div className="login-header">
            <h1 className="login-title">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="login-subtitle">
              {isLogin
                ? "Sign in to your account to continue"
                : "Join us to get started with your startup"}
            </p>
          </div>

          {error && (
            <div className="alert alert-danger">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-input"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            )}

            <button
              type="submit"
              className="login-btn btn-primary"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          <div className="login-footer">
            <p>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setIsLogin(!isLogin)}
                disabled={loading}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          <div className="social-login">
            <div className="divider">Or continue with</div>
            <div className="social-buttons">
              <button type="button" className="social-btn" disabled={loading}>
                🔵 Google
              </button>
              <button type="button" className="social-btn" disabled={loading}>
                📱 GitHub
              </button>
            </div>
          </div>
        </div>

        <div className="login-info">
          <div className="info-content">
            <h2>StartupHub</h2>
            <p>Empowering Indian startups to reach their potential</p>
            <ul className="info-features">
              <li>✓ Track startup growth</li>
              <li>✓ Analyze market trends</li>
              <li>✓ Connect with investors</li>
              <li>✓ Access resources</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
