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

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/bookings/${id}`, { status });
    load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this booking?")) return;
    await api.delete(`/bookings/${id}`);
    load();
  };

  if (loading) return <p>Loading bookings...</p>;

  return (
    <section>
      <h2>All Bookings</h2>
      {bookings.length === 0 ? (
        <p className="muted">No bookings yet.</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Place</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.userId?.email || "—"}</td>
                  <td>{b.placeId?.name || "—"}</td>
                  <td>{new Date(b.date).toLocaleDateString()}</td>
                  <td><span className={`status ${b.status}`}>{b.status}</span></td>
                  <td className="actions">
                    <button className="btn btn-sm btn-success" onClick={() => updateStatus(b._id, "approved")}>Approve</button>
                    <button className="btn btn-sm btn-warn" onClick={() => updateStatus(b._id, "rejected")}>Reject</button>
                    <button className="btn btn-sm btn-danger" onClick={() => remove(b._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
