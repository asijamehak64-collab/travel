import { useEffect, useState } from "react";
import api from "../api/axios.js";

const STATUS_CONFIG = {
  approved: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
    label: "Approved",
  },
  rejected: {
    bg: "bg-red-50",
    text: "text-red-500",
    border: "border-red-200",
    dot: "bg-red-500",
    label: "Rejected",
  },
  pending: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-200",
    dot: "bg-amber-400",
    label: "Pending",
  },
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [toast, setToast] = useState({ text: "", type: "" });
  const [confirmDelete, setConfirmDelete] = useState(null);

  const showToast = (text, type = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast({ text: "", type: "" }), 3500);
  };

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/bookings");
      setBookings(data);
    } catch {
      showToast("Failed to load bookings", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await api.put(`/bookings/${id}`, { status });
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b)),
      );
      showToast(
        status === "approved"
          ? "Booking approved successfully."
          : "Booking rejected.",
        status === "approved" ? "success" : "warn",
      );
    } catch {
      showToast("Failed to update status", "error");
    } finally {
      setUpdatingId(null);
    }
  };

  const remove = async (id) => {
    setDeletingId(id);
    try {
      await api.delete(`/bookings/${id}`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      showToast("Booking deleted.");
    } catch {
      showToast("Failed to delete booking", "error");
    } finally {
      setDeletingId(null);
      setConfirmDelete(null);
    }
  };

  const filtered = bookings.filter((b) => {
    const matchFilter = filter === "all" || b.status === filter;
    const matchSearch =
      b.userId?.email?.toLowerCase().includes(search.toLowerCase()) ||
      b.placeId?.name?.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    approved: bookings.filter((b) => b.status === "approved").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
          @keyframes spin-slow { to { transform: rotate(360deg); } }
          .loader { animation: spin-slow 1.1s linear infinite; }
        `}</style>
        <div className="loader w-12 h-12 rounded-full border-4 border-orange-100 border-t-orange-500" />
        <p
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          className="text-orange-400 text-xs font-semibold tracking-widest uppercase"
        >
          Loading bookings…
        </p>
      </div>
    );
  }

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .booking-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .booking-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.09) !important; }

        .tab-pill { transition: all 0.2s; }

        .action-btn { transition: all 0.18s; }
        .action-btn:hover { transform: translateY(-1px); }
        .action-btn:active { transform: scale(0.97); }

        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
        .card-appear { animation: fadeUp 0.45s ease both; }

        @keyframes toastIn { from { opacity:0; transform:translateX(-50%) translateY(-16px) scale(0.95); } to { opacity:1; transform:translateX(-50%) translateY(0) scale(1); } }
        .toast-anim { animation: toastIn 0.35s cubic-bezier(.34,1.56,.64,1) forwards; }

        @keyframes modalIn { from { opacity:0; transform:scale(0.94); } to { opacity:1; transform:scale(1); } }
        .modal-anim { animation: modalIn 0.25s ease forwards; }

        .search-input:focus { outline: none; border-color: #e86a2e; box-shadow: 0 0 0 3px rgba(232,106,46,0.1); }
      `}</style>

      {/* ── TOAST ─────────────────────────────────────────────── */}
      {toast.text && (
        <div
          className="fixed top-5 left-1/2 z-50 toast-anim"
          style={{ transform: "translateX(-50%)" }}
        >
          <div
            className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-2xl text-sm font-medium bg-white border ${
              toast.type === "error"
                ? "border-red-100 text-red-600"
                : toast.type === "warn"
                  ? "border-amber-100 text-amber-600"
                  : "border-green-100 text-green-700"
            }`}
          >
            <span>
              {toast.type === "error"
                ? "❌"
                : toast.type === "warn"
                  ? "⚠️"
                  : "✅"}
            </span>
            {toast.text}
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM MODAL ──────────────────────────────── */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="modal-anim bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
            <div className="text-4xl mb-4">🗑️</div>
            <h3
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-xl font-bold text-gray-900 mb-2"
            >
              Delete this booking?
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              This action cannot be undone. The booking will be permanently
              removed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-3 rounded-full border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => remove(confirmDelete)}
                disabled={deletingId === confirmDelete}
                className="flex-1 py-3 rounded-full text-white text-sm font-semibold transition"
                style={{
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                }}
              >
                {deletingId === confirmDelete ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DARK HEADER ───────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1a1a1a 0%, #2d1810 50%, #1a1a1a 100%)",
          padding: "52px 40px 60px",
        }}
      >
        <div
          className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #e86a2e, transparent)",
            transform: "translate(30%, -30%)",
          }}
        />

        <div className="relative max-w-5xl">
          <p className="text-orange-400 text-xs font-semibold tracking-widest uppercase mb-3">
            Wanderly Admin ✦
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(30px, 4vw, 50px)",
              lineHeight: 1.1,
            }}
            className="text-white font-black mb-4"
          >
            Booking <em className="text-orange-400">Control Panel</em>
          </h1>
          <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
            Review, approve, reject, and manage all traveler booking requests in
            one place.
          </p>

          {/* Stat cards */}
          <div className="flex gap-4 mt-8 flex-wrap">
            {[
              { label: "Total", value: counts.all, color: "#e86a2e" },
              { label: "Pending", value: counts.pending, color: "#f59e0b" },
              { label: "Approved", value: counts.approved, color: "#10b981" },
              { label: "Rejected", value: counts.rejected, color: "#ef4444" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 min-w-[90px]"
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: s.color,
                  }}
                  className="text-2xl font-bold"
                >
                  {s.value}
                </div>
                <div className="text-gray-500 text-xs mt-0.5 uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FILTER + SEARCH BAR ───────────────────────────────── */}
      <div className="sticky top-[64px] z-40 bg-white/90 backdrop-blur-md border-b border-orange-50 shadow-sm px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Status tabs */}
          <div className="flex gap-2 flex-wrap">
            {[
              { key: "all", label: "All" },
              { key: "pending", label: "⏳ Pending" },
              { key: "approved", label: "✅ Approved" },
              { key: "rejected", label: "❌ Rejected" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`tab-pill px-4 py-2 rounded-full text-xs font-semibold border ${
                  filter === tab.key
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-500 border-gray-200 hover:border-orange-300 hover:text-orange-500"
                }`}
              >
                {tab.label}
                <span
                  className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                    filter === tab.key
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {counts[tab.key]}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search user or destination…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input w-full pl-9 pr-4 py-2.5 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-700"
              style={{ transition: "border-color 0.2s, box-shadow 0.2s" }}
            />
          </div>
        </div>
      </div>

      {/* ── BOOKINGS GRID ─────────────────────────────────────── */}
      <div className="px-6 py-10 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-7">
          <p className="text-gray-400 text-sm">
            Showing{" "}
            <span className="text-gray-700 font-semibold">
              {filtered.length}
            </span>{" "}
            booking{filtered.length !== 1 ? "s" : ""}
          </p>
          <button
            onClick={load}
            className="text-orange-500 text-xs font-semibold hover:underline flex items-center gap-1"
          >
            ↻ Refresh
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="text-5xl mb-4">📋</div>
            <h3
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-2xl font-bold text-gray-700 mb-2"
            >
              No bookings found
            </h3>
            <p className="text-gray-400 text-sm">
              {search
                ? "Try a different search term."
                : "No bookings in this category yet."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((b, i) => {
              const sc = STATUS_CONFIG[b.status] || STATUS_CONFIG.pending;
              const isUpdating = updatingId === b._id;

              return (
                <div
                  key={b._id}
                  className="booking-card card-appear bg-white rounded-3xl overflow-hidden border border-gray-100"
                  style={{
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                    animationDelay: `${i * 50}ms`,
                  }}
                >
                  {/* Destination image */}
                  {b.placeId?.image && (
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={b.placeId.image}
                        alt={b.placeId.name}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
                        }}
                      />
                      <div className="absolute bottom-3 left-4">
                        <p
                          style={{ fontFamily: "'Playfair Display', serif" }}
                          className="text-white font-bold text-lg leading-tight"
                        >
                          {b.placeId?.name || "—"}
                        </p>
                      </div>
                      {/* Status badge on image */}
                      <div
                        className={`absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${sc.bg} ${sc.text} ${sc.border}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}
                        />
                        {sc.label}
                      </div>
                    </div>
                  )}

                  <div className="p-5 space-y-4">
                    {/* No image fallback header */}
                    {!b.placeId?.image && (
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">
                            Destination
                          </p>
                          <p
                            style={{ fontFamily: "'Playfair Display', serif" }}
                            className="font-bold text-gray-900 text-lg"
                          >
                            {b.placeId?.name || "—"}
                          </p>
                        </div>
                        <div
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${sc.bg} ${sc.text} ${sc.border}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}
                          />
                          {sc.label}
                        </div>
                      </div>
                    )}

                    {/* Info rows */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 rounded-2xl px-4 py-3">
                        <p className="text-xs text-gray-400 mb-0.5">Traveler</p>
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {b.userId?.name ||
                            b.userId?.email?.split("@")[0] ||
                            "—"}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-2xl px-4 py-3">
                        <p className="text-xs text-gray-400 mb-0.5">
                          Travel Date
                        </p>
                        <p className="text-sm font-semibold text-gray-800">
                          {b.date
                            ? new Date(b.date).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "—"}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-2xl px-4 py-3 col-span-2">
                        <p className="text-xs text-gray-400 mb-0.5">Email</p>
                        <p className="text-sm font-medium text-gray-600 truncate">
                          {b.userId?.email || "—"}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    {b.placeId?.price && (
                      <div className="flex items-center justify-between px-1">
                        <span className="text-xs text-gray-400">
                          Package Price
                        </span>
                        <span className="text-orange-500 font-bold text-sm">
                          ₹{b.placeId.price.toLocaleString()}
                        </span>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => updateStatus(b._id, "approved")}
                        disabled={isUpdating || b.status === "approved"}
                        className="action-btn flex-1 py-2.5 rounded-full text-xs font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{
                          background:
                            b.status === "approved"
                              ? "#d1fae5"
                              : "linear-gradient(135deg, #10b981, #059669)",
                          color: b.status === "approved" ? "#059669" : "white",
                        }}
                      >
                        {isUpdating ? "…" : "✓ Approve"}
                      </button>

                      <button
                        onClick={() => updateStatus(b._id, "rejected")}
                        disabled={isUpdating || b.status === "rejected"}
                        className="action-btn flex-1 py-2.5 rounded-full text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{
                          background:
                            b.status === "rejected"
                              ? "#fee2e2"
                              : "linear-gradient(135deg, #f59e0b, #d97706)",
                          color: b.status === "rejected" ? "#dc2626" : "white",
                        }}
                      >
                        {isUpdating ? "…" : "✕ Reject"}
                      </button>

                      <button
                        onClick={() => setConfirmDelete(b._id)}
                        disabled={deletingId === b._id}
                        className="action-btn w-10 h-10 rounded-full flex items-center justify-center text-sm border border-red-100 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition disabled:opacity-40"
                        title="Delete booking"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
