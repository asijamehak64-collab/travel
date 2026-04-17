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
    <nav className="flex items-center justify-between px-6 py-4">
      {/* LOGO */}
      <Link
        to="/"
        className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition"
      >
        🌍 Wanderly
      </Link>

      {/* LINKS */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {/* Dashboard/Admin */}
            {user.role === "admin" ? (
              <Link
                to="/admin"
                className="text-gray-700 hover:text-pink-600 transition"
              >
                Admin
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-pink-600 transition"
              >
                Dashboard
              </Link>
            )}

            {/* USER EMAIL */}
            <span className="hidden sm:block text-sm bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
              {user.email}
            </span>

            {/* LOGOUT BUTTON */}
            <button
              onClick={handleLogout}
              className="border border-pink-400 text-pink-500 px-4 py-2 rounded-full hover:bg-pink-500 hover:text-white transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-pink-600 transition"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-pink-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-pink-600 transition"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
