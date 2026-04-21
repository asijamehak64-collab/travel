import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isHome = location.pathname === "/";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        .nav-link {
          position: relative;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #555;
          text-decoration: none;
          transition: color 0.2s;
          padding-bottom: 2px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #e86a2e;
          transition: width 0.25s ease;
        }
        .nav-link:hover { color: #e86a2e; }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active { color: #e86a2e; }
        .nav-link.active::after { width: 100%; }

        .logout-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          padding: 8px 20px;
          border-radius: 50px;
          border: "1.5px solid #e8d5c8";
color: "#e86a2e";
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
        }
        .logout-btn:hover {
          background: #e86a2e;
          border-color: #e86a2e;
          color: white;
        }

        .signup-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          padding: 9px 22px;
          border-radius: 50px;
          border: none;
          background: linear-gradient(135deg, #e86a2e, #d94f1a);
          color: white;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 3px 14px rgba(232,106,46,0.3);
        }
        .signup-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(232,106,46,0.4);
        }

        @keyframes menuSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu { animation: menuSlide 0.22s ease forwards; }

        .hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          border-radius: 2px;
          transition: all 0.25s;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
      `}</style>

      <nav
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(232,106,46,0.08)",
          boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.06)" : "none",
          transition: "all 0.3s ease",
          padding: "0 32px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        {/* ── LOGO ─────────────────────────────────── */}
        <Link
          to="/"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 24,
            fontWeight: 900,
            textDecoration: "none",
            color: isHome && !scrolled ? "#fff" : "#1a1a1a",
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "color 0.3s",
            letterSpacing: "-0.5px",
          }}
        >
          <span
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: "linear-gradient(135deg, #e86a2e, #d94f1a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              flexShrink: 0,
            }}
          >
            ✦
          </span>
          Wanderly
        </Link>

        {/* ── DESKTOP LINKS ─────────────────────────── */}
        <div className="hidden sm:flex items-center gap-6">
          {user ? (
            <>
              <Link
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                className={`nav-link ${
                  location.pathname ===
                  (user.role === "admin" ? "/admin" : "/dashboard")
                    ? "active"
                    : ""
                }`}
              >
                {user.role === "admin" ? "Admin Panel" : "My Trips"}
              </Link>

              {/* User pill */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#fff5f0",
                  border: "1px solid #f5d4c0",
                  // span color:
                  color: "#e86a2e",
                  borderRadius: 50,
                  padding: "6px 14px 6px 8px",
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #e86a2e, #d94f1a)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "black",
                    flexShrink: 0,
                  }}
                >
                  {(user.name || user.email || "U")[0].toUpperCase()}
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color:
                      isHome && !scrolled
                        ? "rgba(255,255,255,0.85)"
                        : "#e86a2e",
                    maxWidth: 140,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.name || user.email}
                </span>
              </div>

              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}
              >
                Login
              </Link>
              <Link to="/signup" className="signup-btn">
                Get Started →
              </Link>
            </>
          )}
        </div>

        {/* ── MOBILE HAMBURGER ──────────────────────── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`hamburger sm:hidden flex flex-col gap-[5px] p-2 rounded-xl transition ${
            menuOpen ? "open" : ""
          }`}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span
            style={{ background: isHome && !scrolled ? "#fff" : "#1a1a1a" }}
          />
          <span
            style={{ background: isHome && !scrolled ? "#fff" : "#1a1a1a" }}
          />
          <span
            style={{ background: isHome && !scrolled ? "#fff" : "#1a1a1a" }}
          />
        </button>
      </nav>

      {/* ── MOBILE MENU ───────────────────────────────── */}
      {menuOpen && (
        <div
          className="mobile-menu sm:hidden"
          style={{
            position: "fixed",
            top: 68,
            left: 0,
            right: 0,
            zIndex: 49,
            background: "rgba(255,255,255,0.98)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(232,106,46,0.1)",
            padding: "20px 24px 28px",
            boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {user ? (
              <>
                {/* Mobile user info */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 16px",
                    background: "#fff5f0",
                    borderRadius: 14,
                    marginBottom: 8,
                    border: "1px solid #f5d4c0",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #e86a2e, #d94f1a)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "white",
                      flexShrink: 0,
                    }}
                  >
                    {(user.name || user.email || "U")[0].toUpperCase()}
                  </div>
                  <div>
                    {user.name && (
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#1a1a1a",
                          margin: 0,
                        }}
                      >
                        {user.name}
                      </p>
                    )}
                    <p style={{ fontSize: 12, color: "#e86a2e", margin: 0 }}>
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  to={user.role === "admin" ? "/admin" : "/dashboard"}
                  style={{
                    padding: "13px 16px",
                    borderRadius: 12,
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#1a1a1a",
                    textDecoration: "none",
                    transition: "background 0.15s",
                    background:
                      location.pathname ===
                      (user.role === "admin" ? "/admin" : "/dashboard")
                        ? "#fff5f0"
                        : "transparent",
                  }}
                >
                  {user.role === "admin" ? "⚙️  Admin Panel" : "🗺️  My Trips"}
                </Link>

                <button
                  onClick={handleLogout}
                  style={{
                    marginTop: 8,
                    padding: "13px 16px",
                    borderRadius: 12,
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#e86a2e",
                    background: "#fff5f0",
                    border: "1.5px solid #f5d4c0",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    padding: "13px 16px",
                    borderRadius: 12,
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#555",
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  style={{
                    marginTop: 4,
                    padding: "13px 16px",
                    borderRadius: 12,
                    fontSize: 15,
                    fontWeight: 600,
                    color: "white",
                    background: "linear-gradient(135deg, #e86a2e, #d94f1a)",
                    textDecoration: "none",
                    textAlign: "center",
                    boxShadow: "0 4px 16px rgba(232,106,46,0.3)",
                  }}
                >
                  Get Started →
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
