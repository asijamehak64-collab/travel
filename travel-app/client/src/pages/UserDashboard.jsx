import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function UserDashboard() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingFor, setBookingFor] = useState(null);
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/places")
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

  if (loading) return <p>Loading destinations...</p>;

  return (
    <section>
      <h2>Explore Destinations</h2>
      {message && <p className="banner">{message}</p>}
      <div className="grid">
        {places.map((p) => (
          <div key={p._id} className="card place-card">
            <img src={p.image} alt={p.name} />
            <div className="place-body">
              <h3>{p.name}</h3>
              <p className="muted">{p.description}</p>
              <p className="price">${p.price}</p>
              {bookingFor === p._id ? (
                <div className="booking-form">
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <button className="btn btn-primary" onClick={() => book(p._id)}>
                    Confirm
                  </button>
                  <button className="btn btn-ghost" onClick={() => setBookingFor(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <button className="btn btn-primary" onClick={() => setBookingFor(p._id)}>
                  Book now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
