import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Home from "./pages/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-100">
      {/* NAVBAR */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/70 shadow-sm ">
        <Navbar />
      </div>

      {/* MAIN CONTENT */}
      <Routes>
        {/* Full-width routes — no container */}
        <Route path="/" element={<Home />} />

        {/* Constrained routes */}
        <Route
          path="/login"
          element={
            <main className="max-w-[80vw] mx-auto px-4 py-6">
              <Login />
            </main>
          }
        />
        <Route
          path="/signup"
          element={
            <main className="max-w-[80vw] mx-auto px-4 py-6">
              <Signup />
            </main>
          }
        />
        <Route
          path="/dashboard"
          element={
            <main className="max-w-[80vw] mx-auto px-4 py-6">
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            </main>
          }
        />
        <Route
          path="/admin"
          element={
            <main className="max-w-[80vw] mx-auto px-4 py-6">
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            </main>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* FOOTER — hidden on home since Home.jsx has its own footer */}
      <Routes>
        <Route path="/" element={null} />
        <Route
          path="*"
          element={
            <footer className="text-center py-6 text-gray-500 text-sm">
              © {new Date().getFullYear()} Travel App ✈️ • Made with ❤️
            </footer>
          }
        />
      </Routes>
    </div>
  );
}
