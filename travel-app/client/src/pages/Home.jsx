import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Home() {
  const { user } = useAuth();
  return (
    <section className="hero">
      <h1>Discover your next adventure ✈️</h1>
      <p>Hand-picked destinations across the globe. Book your trip in seconds.</p>
      {user ? (
        <Link to={user.role === "admin" ? "/admin" : "/dashboard"} className="btn btn-primary">
          Go to {user.role === "admin" ? "Admin Panel" : "Dashboard"}
        </Link>
      ) : (
        <div className="hero-actions">
          <Link to="/signup" className="btn btn-primary">Get started</Link>
          <Link to="/login" className="btn btn-ghost">I have an account</Link>
        </div>
      )}
    </section>
  );
}
