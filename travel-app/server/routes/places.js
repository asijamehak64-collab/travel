const express = require("express");
const Place = require("../models/Place");

const router = express.Router();

// GET /api/places
router.get("/", async (_req, res) => {
  try {
    const places = await Place.find().sort({ createdAt: -1 });
    res.json(places);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
