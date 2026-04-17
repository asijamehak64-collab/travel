require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/places", require("./routes/places"));
app.use("/api/bookings", require("./routes/bookings"));

app.get("/", (_req, res) => res.send("Travel API is running"));

const ensureAdmin = async () => {
  const email = (process.env.ADMIN_EMAIL || "mehak@gmail.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "pass123";
  const existing = await User.findOne({ email });
  if (existing) {
    if (existing.role !== "admin") {
      existing.role = "admin";
      await existing.save();
    }
    console.log("👑 Admin already exists:", email);
    return;
  }
  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name: "Admin", email, password: hashed, role: "admin" });
  console.log("👑 Admin user created:", email);
};

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  await ensureAdmin();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})();
