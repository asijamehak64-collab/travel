require("dotenv").config();
const connectDB = require("../config/db");
const Place = require("../models/Place");

const places = [
  {
    name: "Goa, India",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200",
    description: "Sunny beaches, nightlife, and Portuguese heritage.",
    price: 800,
  },
  {
    name: "Manali, Himachal Pradesh",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/03/Manali_City.jpg",
    description: "Snowy mountains, adventure sports, and scenic valleys.",
    price: 950,
  },
  {
    name: "Jaipur, Rajasthan",
    image:
      "https://s7ap1.scene7.com/is/image/incredibleindia/hawa-mahal-jaipur-rajasthan-city-1-hero?qlt=82&ts=1742200253577",
    description: "Royal palaces, forts, and vibrant culture of the Pink City.",
    price: 700,
  },
  {
    name: "Kerala Backwaters, Kerala",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200",
    description: "Peaceful houseboats, lush greenery, and serene waterways.",
    price: 850,
  },
  {
    name: "Leh-Ladakh, Jammu & Kashmir",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/51/22/a3/caption.jpg?w=600&h=400&s=1",
    description:
      "High-altitude desert, monasteries, and breathtaking landscapes.",
    price: 1200,
  },
  {
    name: "Udaipur, Rajasthan",
    image:
      "https://s7ap1.scene7.com/is/image/incredibleindia/2-kumbhalgarh-fort-udaipur-rajasthan-attr-hero?qlt=82&ts=1742175707597",
    description: "Romantic lakes, palaces, and rich royal history.",
    price: 750,
  },
  {
    name: "Andaman Islands, India",
    image:
      "https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=1200",
    description: "Crystal-clear waters, coral reefs, and white sandy beaches.",
    price: 1400,
  },
  {
    name: "Rishikesh, Uttarakhand",
    image:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1200",
    description: "Yoga capital, river rafting, and spiritual vibes.",
    price: 600,
  },
];

(async () => {
  await connectDB();
  await Place.deleteMany({});
  await Place.insertMany(places);
  console.log(`🌱 Seeded ${places.length} places`);
  process.exit(0);
})();
