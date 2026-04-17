import { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data } = await api.get("/bookings");
    setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/bookings/${id}`, { status });
    load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this booking?")) return;
    await api.delete(`/bookings/${id}`);
    load();
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-pink-500 font-medium">
        Loading bookings...
      </div>
    );
  }

  return (
    <section className="space-y-8">
      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold text-pink-600">All Bookings</h2>
        <p className="text-gray-500">Manage user travel requests</p>
      </div>

      {/* EMPTY STATE */}
      {bookings.length === 0 ? (
        <div className="text-center bg-white p-10 rounded-2xl shadow-md text-gray-500">
          No bookings yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 space-y-4"
            >
              {/* USER */}
              <div>
                <p className="text-sm text-gray-400">User</p>
                <p className="font-medium text-gray-800">
                  {b.userId?.email || "—"}
                </p>
              </div>

              {/* PLACE */}
              <div>
                <p className="text-sm text-gray-400">Destination</p>
                <p className="font-semibold text-pink-600">
                  {b.placeId?.name || "—"}
                </p>
              </div>

              {/* DATE */}
              <div>
                <p className="text-sm text-gray-400">Date</p>
                <p className="text-gray-700">
                  {new Date(b.date).toLocaleDateString()}
                </p>
              </div>

              {/* STATUS */}
              <div>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${
                    b.status === "approved"
                      ? "bg-green-100 text-green-600"
                      : b.status === "rejected"
                        ? "bg-red-100 text-red-500"
                        : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {b.status}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => updateStatus(b._id, "approved")}
                  className="flex-1 bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition text-sm"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateStatus(b._id, "rejected")}
                  className="flex-1 bg-yellow-400 text-white py-2 rounded-full hover:bg-yellow-500 transition text-sm"
                >
                  Reject
                </button>

                <button
                  onClick={() => remove(b._id)}
                  className="w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600 transition text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
