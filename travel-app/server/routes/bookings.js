const express = require("express");
const Booking = require("../models/Booking");
const { auth, adminOnly } = require("../middleware/auth");
const sendNotificationEmail = require("../services/mailSender");

const router = express.Router();

// POST /api/bookings - user creates booking
router.post("/", auth, async (req, res) => {
  try {
    const { placeId, date } = req.body;

    if (!placeId || !date)
      return res.status(400).json({ message: "placeId and date are required" });

    const booking = await Booking.create({
      userId: req.user.id,
      placeId,
      date,
    });

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/bookings - admin only
router.get("/", auth, adminOnly, async (_req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("placeId", "name price")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/bookings/:id - update status (admin)
router.put("/:id", auth, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "approved", "rejected"].includes(status))
      return res.status(400).json({ message: "Invalid status" });
    console.log("Updating booking ID:", req.params.id, "to status:", status);

    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    )
      .populate("placeId", "name price")
      .populate("userId", "name email");

    await sendNotificationEmail({
      email: updated.userId.email,
      name: updated.userId.name,
      status: updated.status,
      placeName: updated.placeId.name,
      bookingDate: updated.date,
      bookingId: updated._id,
    });
    res.json(updated);
  } catch (err) {
    console.error("Error mail updating booking:", err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/bookings/:id - admin
router.delete("/:id", auth, adminOnly, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
