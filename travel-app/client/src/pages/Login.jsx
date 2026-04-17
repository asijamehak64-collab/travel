import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/login", form);
      login(data.token, data.user);
      navigate(data.user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      {/* CARD */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-8">
        {/* HEADER */}
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-2">
          Welcome back 💖
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to continue your journey
        </p>

        {/* FORM */}
        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          {/* ERROR */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-xl font-medium hover:bg-pink-600 transition shadow-md"
          >
            Login
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-gray-500 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-pink-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
