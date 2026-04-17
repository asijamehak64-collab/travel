require("dotenv").config();
const connectDB = require("../config/db");
const Place = require("../models/Place");

const places = [
  {
    name: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200",
    description: "Whitewashed cliffside villages overlooking the Aegean Sea.",
    price: 1200,
  },
  {
    name: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200",
    description: "Ancient temples, bamboo forests and traditional tea houses.",
    price: 1500,
  },
  {
    name: "Banff, Canada",
    image: "https://images.unsplash.com/photo-1609825488888-3a766db05542?w=1200",
    description: "Turquoise lakes and snow-capped Rocky Mountain peaks.",
    price: 1100,
  },
  {
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200",
    description: "Tropical beaches, rice terraces and vibrant culture.",
    price: 900,
  },
  {
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200",
    description: "The city of lights, art, fashion and the Eiffel Tower.",
    price: 1300,
  },
  {
    name: "Cape Town, South Africa",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200",
    description: "Table Mountain views, beaches and world-class wine country.",
    price: 1050,
  },
];

(async () => {
  await connectDB();
  await Place.deleteMany({});
  await Place.insertMany(places);
  console.log(`🌱 Seeded ${places.length} places`);
  process.exit(0);
})();
