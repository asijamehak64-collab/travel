import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const destinations = [
  {
    name: "Paris",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
  },
  {
    name: "Bali",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    name: "Maldives",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/0b/a5/a6/caption.jpg?w=1600&h=-1&s=1&cx=1920&cy=1080&chk=v1_15c12bc8431b4bf1b61e",
  },
  {
    name: "Dubai",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
  },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="text-center py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-pink-600 leading-tight">
          Explore the World 🌍
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Find beautiful destinations, plan your trips, and book unforgettable
          experiences.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          {user ? (
            <Link
              to={user.role === "admin" ? "/admin" : "/dashboard"}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full shadow-lg transition"
            >
              Go to {user.role === "admin" ? "Admin Panel" : "Dashboard"}
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full shadow-lg transition"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border border-pink-400 text-pink-500 px-8 py-3 rounded-full hover:bg-pink-100 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </section>

      {/* DESTINATIONS */}
      <section>
        <h2 className="text-3xl font-bold text-center text-pink-500 mb-10">
          Popular Destinations ✨
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {destinations.map((place, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-52 w-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-pink-600">
                  {place.name}
                </h3>

                <button className="mt-3 text-sm text-white bg-pink-500 px-4 py-2 rounded-full hover:bg-pink-600 transition">
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-pink-100 rounded-3xl py-12 text-center shadow-inner">
        <h2 className="text-2xl font-semibold text-pink-600">
          Ready for your next trip?
        </h2>
        <p className="text-gray-600 mt-2">Book your dream destination today.</p>

        <Link
          to="/signup"
          className="inline-block mt-4 bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition"
        >
          Start Booking
        </Link>
      </section>
    </div>
  );
}
