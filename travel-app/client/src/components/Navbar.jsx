import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">🌍 Wanderly</Link>
      <div className="nav-links">
        {user ? (
          <>
            {user.role === "admin" ? (
              <Link to="/admin">Admin</Link>
            ) : (
              <Link to="/dashboard">Dashboard</Link>
            )}
            <span className="user-tag">{user.email}</span>
            <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="btn btn-primary">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
