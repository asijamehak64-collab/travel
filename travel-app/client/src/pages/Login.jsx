import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      login(data.token, data.user);
      navigate(data.user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-[90vh] flex items-center justify-center px-4 py-12"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .wand-input {
          width: 100%;
          padding: 14px 18px;
          border: 1.5px solid #f0e6d8;
          border-radius: 14px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #1a1a1a;
          background: #fffaf7;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .wand-input:focus {
          border-color: #e86a2e;
          box-shadow: 0 0 0 3px rgba(232,106,46,0.1);
          background: #fff;
        }
        .wand-input::placeholder { color: #bbb; }

        .submit-btn {
          width: 100%;
          padding: 15px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #e86a2e, #d94f1a);
          color: white;
          font-size: 15px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 4px 20px rgba(232,106,46,0.35);
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(232,106,46,0.45);
        }
        .submit-btn:active:not(:disabled) { transform: scale(0.98); }
        .submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.55s ease both; }
        .fade-up-1 { animation: fadeUp 0.55s 0.1s ease both; }
        .fade-up-2 { animation: fadeUp 0.55s 0.2s ease both; }

        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%,60% { transform: translateX(-6px); }
          40%,80% { transform: translateX(6px); }
        }
        .shake { animation: shake 0.4s ease; }

        .pass-toggle {
          background: none;
          border: none;
          cursor: pointer;
          color: #bbb;
          font-size: 16px;
          padding: 0 4px;
          transition: color 0.2s;
        }
        .pass-toggle:hover { color: #e86a2e; }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #f0e6d8;
        }

        .social-btn {
          flex: 1;
          padding: 11px;
          border-radius: 12px;
          border: 1.5px solid #f0e6d8;
          background: #fff;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          color: #555;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: border-color 0.2s, background 0.2s;
        }
        .social-btn:hover { border-color: #e86a2e; background: #fff9f5; }
      `}</style>

      <div style={{ width: "100%", maxWidth: 460 }}>
        {/* ── LOGO ────────────────────────────────────── */}
        <div
          className="fade-up"
          style={{ textAlign: "center", marginBottom: 36 }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 16,
                background: "linear-gradient(135deg, #e86a2e, #d94f1a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: "white",
                boxShadow: "0 6px 20px rgba(232,106,46,0.35)",
              }}
            >
              ✦
            </div>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 26,
                fontWeight: 900,
                color: "#1a1a1a",
                letterSpacing: "-0.5px",
              }}
            >
              Wanderly
            </span>
          </Link>
        </div>

        {/* ── CARD ─────────────────────────────────────── */}
        <div
          className="fade-up-1"
          style={{
            background: "#fff",
            borderRadius: 28,
            padding: "40px 40px 36px",
            boxShadow:
              "0 8px 48px rgba(232,106,46,0.1), 0 2px 12px rgba(0,0,0,0.06)",
            border: "1px solid #f5ece4",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 30,
                fontWeight: 900,
                color: "#1a1a1a",
                marginBottom: 8,
                lineHeight: 1.2,
              }}
            >
              Welcome back
            </h1>
            <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.6 }}>
              Sign in to continue planning your next adventure.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="shake"
              style={{
                background: "#fff5f5",
                border: "1px solid #fdd",
                borderRadius: 12,
                padding: "12px 16px",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 13,
                color: "#e53e3e",
              }}
            >
              <span style={{ fontSize: 16 }}>⚠️</span>
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={submit}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {/* Email */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#888",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="wand-input"
              />
            </div>

            {/* Password */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <label
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#888",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  Password
                </label>
                <a
                  href="#"
                  style={{
                    fontSize: 12,
                    color: "#e86a2e",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.textDecoration = "underline")
                  }
                  onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                >
                  Forgot password?
                </a>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  className="wand-input"
                  style={{ paddingRight: 48 }}
                />
                <button
                  type="button"
                  className="pass-toggle"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute",
                    right: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
              style={{ marginTop: 8 }}
            >
              {loading ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.4)",
                      borderTopColor: "white",
                      animation: "spin 0.8s linear infinite",
                      display: "inline-block",
                    }}
                  />
                  Signing in…
                </span>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              margin: "24px 0",
            }}
          >
            <div className="divider-line" />
            <span style={{ fontSize: 12, color: "#ccc", whiteSpace: "nowrap" }}>
              or continue with
            </span>
            <div className="divider-line" />
          </div>

          {/* Social buttons */}

          {/* Footer */}
          <p
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "#aaa",
              marginTop: 28,
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#e86a2e",
                fontWeight: 600,
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.target.style.textDecoration = "underline")
              }
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              Create one →
            </Link>
          </p>
        </div>

        {/* Bottom note */}
        <p
          className="fade-up-2"
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "#ccc",
            marginTop: 24,
          }}
        >
          By signing in, you agree to our{" "}
          <a href="#" style={{ color: "#e86a2e", textDecoration: "none" }}>
            Terms
          </a>{" "}
          &{" "}
          <a href="#" style={{ color: "#e86a2e", textDecoration: "none" }}>
            Privacy Policy
          </a>
        </p>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}
