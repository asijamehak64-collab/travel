# 🌍 Wanderly — MERN Travel Booking App

A full-stack travel booking application built with **MongoDB, Express, React, and Node.js**.

## ✨ Features

- 🔐 JWT authentication with bcrypt password hashing
- 👤 Two roles: **admin** & **user**
- 🏝️ Browse travel destinations from MongoDB
- 📅 Users can book a destination with a travel date
- 🛠️ Admin can approve, reject or delete bookings
- 🌱 Pre-seeded admin account & sample destinations

## 📁 Project Structure

```
travel-app/
├── client/          # React + Vite frontend
│   ├── src/
│   │   ├── api/         # axios instance
│   │   ├── components/  # Navbar, ProtectedRoute
│   │   ├── context/     # AuthContext
│   │   ├── pages/       # Home, Login, Signup, Dashboards
│   │   └── styles.css
│   └── package.json
└── server/          # Express + MongoDB backend
    ├── config/db.js
    ├── middleware/auth.js
    ├── models/      # User, Place, Booking
    ├── routes/      # auth, places, bookings
    ├── seed/seed.js
    └── server.js
```

## 🛠️ Prerequisites

- **Node.js 18+** ([download](https://nodejs.org))
- **A MongoDB Atlas account** (free tier is fine) — [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)

## 🚀 Step-by-step Setup

### 1️⃣ Set up MongoDB Atlas

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a **free shared cluster**.
3. In **Database Access**, create a user with a username & password.
4. In **Network Access**, click **Allow Access from Anywhere** (`0.0.0.0/0`).
5. Click **Connect → Drivers** and copy the **connection string**, e.g.:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/travelapp?retryWrites=true&w=majority
   ```
   Replace `<user>`, `<password>`, and add a database name (e.g. `travelapp`).

### 2️⃣ Set up the backend

```bash
cd server
cp .env.example .env
# Edit .env and paste your MONGO_URI from Atlas
npm install
npm run seed     # Inserts sample destinations
npm run dev      # Starts server on http://localhost:5000
```

On first start, the server automatically creates the admin user:
- **Email:** `mehak@gmail.com`
- **Password:** `pass123`

### 3️⃣ Set up the frontend

In a **second terminal**:

```bash
cd client
cp .env.example .env   # default API URL is fine
npm install
npm run dev            # Starts on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

## 🔑 Default Accounts

| Role  | Email              | Password  |
|-------|--------------------|-----------|
| Admin | mehak@gmail.com    | pass123   |
| User  | (sign up your own) | —         |

## 🌐 API Endpoints

### Auth
- `POST /api/auth/register` — `{ name, email, password }`
- `POST /api/auth/login` — `{ email, password }`

### Places
- `GET /api/places`

### Bookings
- `POST /api/bookings` *(user)* — `{ placeId, date }`
- `GET /api/bookings` *(admin)*
- `PUT /api/bookings/:id` *(admin)* — `{ status: "approved" | "rejected" | "pending" }`
- `DELETE /api/bookings/:id` *(admin)*

All protected routes require header: `Authorization: Bearer <token>`.

## 🧪 Quick test flow

1. Login as **admin** (`mehak@gmail.com` / `pass123`) → see empty bookings.
2. In another browser/incognito, **sign up** as a regular user.
3. As the user, **book a destination**.
4. Go back to the admin tab → **approve / reject / delete** the booking.

## 🐛 Troubleshooting

- **MongoDB connection error** → double-check your `MONGO_URI` and that your IP is whitelisted in Atlas.
- **CORS errors** → make sure the client runs on the URL set in `CLIENT_ORIGIN` (default `http://localhost:5173`).
- **401 Unauthorized** → token expired or missing; log in again.

Happy travels! ✈️
