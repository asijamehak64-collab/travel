import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function UserDashboard() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingFor, setBookingFor] = useState(null);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

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
      setMessage("✅ Booking submitted! Awaiting admin approval.");
      setBookingFor(null);
      setDate("");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Booking failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-pink-500">
        Loading destinations...
      </div>
    );
  }

  return (
    <section className="space-y-8">
      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold text-pink-600">
          Explore Destinations ✈️
        </h2>
        <p className="text-gray-500">
          Choose your next adventure and book instantly
        </p>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="bg-pink-100 text-pink-600 px-4 py-3 rounded-xl text-center shadow-sm">
          {message}
        </div>
      )}

      {/* GRID */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {places.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition overflow-hidden group"
          >
            {/* IMAGE */}
            <div className="overflow-hidden">
              <img
                src={p.image}
                alt={p.name}
                className="h-52 w-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* BODY */}
            <div className="p-5 space-y-3">
              <h3 className="text-lg font-semibold text-pink-600">{p.name}</h3>

              <p className="text-gray-500 text-sm line-clamp-2">
                {p.description}
              </p>

              <p className="text-pink-500 font-bold text-lg">${p.price}</p>

              {/* BOOKING UI */}
              {bookingFor === p._id ? (
                <div className="space-y-2">
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={() => book(p._id)}
                      className="flex-1 bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600 transition text-sm"
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() => setBookingFor(null)}
                      className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-full hover:bg-gray-100 transition text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setBookingFor(p._id)}
                  className="w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600 transition"
                >
                  Book Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
