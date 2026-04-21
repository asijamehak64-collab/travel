import { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function UserDashboard() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingFor, setBookingFor] = useState(null);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    api
      .get("/places")
      .then(({ data }) => setPlaces(data))
      .finally(() => setLoading(false));
  }, []);

  const book = async (placeId) => {
    if (!date) return;
    try {
      await api.post("/bookings", { placeId, date });
      setMessage({ text: "Booking submitted! Awaiting admin approval.", type: "success" });
      setBookingFor(null);
      setDate("");
      setTimeout(() => setMessage({ text: "", type: "" }), 4000);
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Booking failed. Please try again.", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 4000);
    }
  };

  const categories = ["All", ...new Set(places.map((p) => p.category).filter(Boolean))];
  const filtered = places.filter((p) => {
    const matchCat = filter === "All" || p.category === filter;
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
          @keyframes spin-slow { to { transform: rotate(360deg); } }
          .loader { animation: spin-slow 1.2s linear infinite; }
        `}</style>
        <div className="loader w-12 h-12 rounded-full border-4 border-orange-100 border-t-orange-500" />
        <p style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-orange-400 font-medium text-sm tracking-widest uppercase">
          Loading destinations…
        </p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .place-card { transition: transform 0.3s cubic-bezier(.25,.8,.25,1), box-shadow 0.3s; }
        .place-card:hover { transform: translateY(-8px); box-shadow: 0 24px 48px rgba(232,106,46,0.15) !important; }
        .place-card:hover .card-img { transform: scale(1.07); }
        .card-img { transition: transform 0.5s ease; }

        .filter-pill { transition: all 0.2s; }
        .filter-pill:hover { background: #fff3eb; color: #e86a2e; border-color: #e86a2e; }

        .book-btn { transition: all 0.2s; }
        .book-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(232,106,46,0.35); }

        .toast-enter { animation: toastIn 0.4s cubic-bezier(.34,1.56,.64,1) forwards; }
        @keyframes toastIn { from { opacity:0; transform: translateY(-20px) scale(0.95); } to { opacity:1; transform: none; } }

        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }
        .card-appear { animation: fadeUp 0.5s ease both; }

        .search-input:focus { outline: none; border-color: #e86a2e; box-shadow: 0 0 0 3px rgba(232,106,46,0.12); }

        input[type="date"]:focus { outline: none; border-color: #e86a2e !important; box-shadow: 0 0 0 3px rgba(232,106,46,0.12); }
      `}</style>

      {/* ── HERO BANNER ─────────────────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d1810 50%, #1a1a1a 100%)",
          padding: "56px 40px 64px",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #e86a2e, transparent)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #e86a2e, transparent)", transform: "translate(-30%, 30%)" }} />

        <div className="relative max-w-4xl">
          <p className="text-orange-400 text-xs font-semibold tracking-widest uppercase mb-3">
            {greeting()}, {user?.name?.split(" ")[0] || "Traveler"} ✦
          </p>
          <h1
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-white font-black leading-tight mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 56px)", fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}
          >
            Where are you<br />
            <em className="text-orange-400">going next?</em>
          </h1>
          <p className="text-gray-400 text-base max-w-md leading-relaxed">
            Browse our curated destinations and book your perfect 7-day all-inclusive experience.
          </p>

          {/* Stats row */}
          <div className="flex gap-10 mt-8 flex-wrap">
            {[
              { n: places.length, label: "Destinations" },
              { n: "7", label: "Days Per Trip" },
              { n: "All Incl.", label: "Packages" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-white font-bold text-2xl">{s.n}</div>
                <div className="text-gray-500 text-xs mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SEARCH + FILTER BAR ──────────────────────────────── */}
      <div className="sticky top-[64px] z-40 bg-white/90 backdrop-blur-md border-b border-orange-50 shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Search destinations…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input w-full pl-9 pr-4 py-2.5 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-700"
              style={{ transition: "border-color 0.2s, box-shadow 0.2s" }}
            />
          </div>

          {/* Category filters */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-pill px-4 py-2 rounded-full text-xs font-semibold border ${
                  filter === cat
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-500 border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TOAST MESSAGE ────────────────────────────────────── */}
      {message.text && (
        <div className="fixed top-6 left-1/2 z-50 toast-enter" style={{ transform: "translateX(-50%)" }}>
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-sm font-medium ${
              message.type === "success"
                ? "bg-white border border-green-100 text-green-700"
                : "bg-white border border-red-100 text-red-600"
            }`}
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}
          >
            <span className="text-lg">{message.type === "success" ? "✅" : "❌"}</span>
            {message.text}
          </div>
        </div>
      )}

      {/* ── DESTINATIONS GRID ────────────────────────────────── */}
      <div className="px-6 py-10 max-w-7xl mx-auto">
        {/* Results count */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-400 text-sm">
            Showing <span className="text-gray-700 font-semibold">{filtered.length}</span> destination{filtered.length !== 1 ? "s" : ""}
          </p>
          {search && (
            <button onClick={() => setSearch("")} className="text-orange-500 text-xs font-medium hover:underline">
              Clear search ✕
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🗺️</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-gray-700 mb-2">No destinations found</h3>
            <p className="text-gray-400 text-sm">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <div
                key={p._id}
                className="place-card card-appear bg-white rounded-3xl overflow-hidden"
                style={{
                  boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                  animationDelay: `${i * 60}ms`,
                }}
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden h-52">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="card-img w-full h-full object-cover"
                  />
                  {/* Price badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-bold text-orange-500 shadow-sm">
                    ₹{p.price?.toLocaleString()}
                  </div>
                  {/* Category badge */}
                  {p.category && (
                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-white">
                      {p.category}
                    </div>
                  )}
                  {/* Duration */}
                  <div className="absolute bottom-3 left-3 bg-orange-500/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-white">
                    7 Nights
                  </div>
                </div>

                {/* BODY */}
                <div className="p-5">
                  <h3
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    className="text-lg font-bold text-gray-900 mb-1 leading-snug"
                  >
                    {p.name}
                  </h3>

                  {p.location && (
                    <p className="text-orange-400 text-xs font-medium mb-2 flex items-center gap-1">
                      <span>📍</span> {p.location}
                    </p>
                  )}

                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                    {p.description || "A stunning destination awaits you on this 7-day all-inclusive package."}
                  </p>

                  {/* Amenity pills */}
                  <div className="flex gap-1.5 flex-wrap mb-4">
                    {["✈️ Flights", "🏨 Hotel", "🍽️ Meals"].map((tag) => (
                      <span key={tag} className="bg-orange-50 text-orange-500 text-xs px-2.5 py-1 rounded-full font-medium border border-orange-100">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* BOOKING UI */}
                  {bookingFor === p._id ? (
                    <div className="space-y-3 pt-1">
                      <label className="text-xs text-gray-500 font-medium block">Select your travel date</label>
                      <input
                        type="date"
                        value={date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50"
                        style={{ transition: "border-color 0.2s, box-shadow 0.2s" }}
                      />
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => book(p._id)}
                          disabled={!date}
                          className="book-btn flex-1 py-2.5 rounded-full text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed"
                          style={{ background: date ? "linear-gradient(135deg, #e86a2e, #d94f1a)" : "#f5d4c0" }}
                        >
                          Confirm Booking
                        </button>
                        <button
                          onClick={() => { setBookingFor(null); setDate(""); }}
                          className="px-4 py-2.5 rounded-full text-sm font-medium text-gray-500 border border-gray-200 hover:bg-gray-50 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setBookingFor(p._id)}
                      className="book-btn w-full py-3 rounded-full text-sm font-semibold text-white"
                      style={{ background: "linear-gradient(135deg, #e86a2e, #d94f1a)", boxShadow: "0 4px 16px rgba(232,106,46,0.25)" }}
                    >
                      Book Now — ₹{p.price?.toLocaleString()}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── BOTTOM CTA BANNER ────────────────────────────────── */}
      <div
        className="mx-6 mb-10 rounded-3xl overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #e86a2e, #c94e10)", padding: "48px 40px" }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: "white", transform: "translate(30%, -30%)" }} />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-white font-bold text-2xl mb-2">
              Need help choosing?
            </h3>
            <p className="text-orange-100 text-sm leading-relaxed max-w-sm">
              Our trip designers are available 24/7 to build your perfect 7-day itinerary.
            </p>
          </div>
          <a
            href="mailto:support@wanderly.in"
            className="shrink-0 bg-white text-orange-500 font-bold text-sm px-8 py-3.5 rounded-full hover:bg-orange-50 transition"
            style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
          >
            Talk to an Expert →
          </a>
        </div>
      </div>
    </div>
  );
}