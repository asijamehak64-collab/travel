import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect, useRef, useState } from "react";

const indiaDestinations = [
  {
    name: "Rajasthan",
    tagline: "Land of Kings",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80",
    badge: "Most Popular",
    highlight: "Jaipur · Udaipur · Jodhpur",
  },
  {
    name: "Kerala",
    tagline: "God's Own Country",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
    badge: "Nature Escape",
    highlight: "Backwaters · Munnar · Alleppey",
  },
  {
    name: "Goa",
    tagline: "Sun, Sand & Soul",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80",
    badge: "Beach Bliss",
    highlight: "Calangute · Anjuna · Old Goa",
  },
  {
    name: "Himachal Pradesh",
    tagline: "Where Mountains Whisper",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
    badge: "Adventure",
    highlight: "Manali · Spiti · Dharamsala",
  },
  {
    name: "Varanasi",
    tagline: "City of Light",
    image:
      "https://images.unsplash.com/photo-1561361058-c24e021c8b25?w=600&q=80",
    badge: "Spiritual",
    highlight: "Ghats · Temples · Ganges",
  },
  {
    name: "Ladakh",
    tagline: "Roof of the World",
    image:
      "https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?w=600&q=80",
    badge: "Offbeat",
    highlight: "Pangong · Leh · Nubra Valley",
  },
  {
    name: "Andaman Islands",
    tagline: "Paradise Untouched",
    image:
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=600&q=80",
    badge: "Island Escape",
    highlight: "Havelock · Neil Island · Radhanagar",
  },
  {
    name: "Mysore & Coorg",
    tagline: "Palaces & Coffee Hills",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80",
    badge: "Heritage",
    highlight: "Mysore Palace · Coorg · Nagarhole",
  },
];

const internationalDestinations = [
  {
    name: "Paris",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
    tagline: "City of Love",
  },
  {
    name: "Bali",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    tagline: "Island of Gods",
  },
  {
    name: "Maldives",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80",
    tagline: "Ocean Paradise",
  },
  {
    name: "Dubai",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    tagline: "City of the Future",
  },
];

const services = [
  {
    icon: "✈️",
    title: "Flight Booking",
    desc: "We handle all your flight reservations — domestic and international. Our team finds the best fares, optimal layovers, and comfortable seating so you focus on the excitement, not the logistics.",
    color: "#ffe8d6",
    accent: "#e86a2e",
  },
  {
    icon: "🏨",
    title: "Luxury Accommodation",
    desc: "From heritage havelis in Rajasthan to beachside villas in Goa, every Wanderly package includes hand-picked stays. We partner with 500+ hotels across India to match your comfort level and budget.",
    color: "#e8f4fd",
    accent: "#1a7abf",
  },
  {
    icon: "🍽️",
    title: "Food & Dining",
    desc: "Three meals a day, every day of your 7-night journey. We curate local dining experiences — from rooftop dinners in Jaipur to seafood shacks in Goa — alongside familiar comfort food options.",
    color: "#e8fdf0",
    accent: "#1a9c4e",
  },
  {
    icon: "🚐",
    title: "Local Transfers",
    desc: "Airport pickups, inter-city travel, and local sightseeing — all covered. Our fleet of clean, air-conditioned vehicles and experienced local drivers ensure you never worry about getting around.",
    color: "#f4e8fd",
    accent: "#7a1abf",
  },
  {
    icon: "🏛️",
    title: "Guided Tours",
    desc: "Every destination in our catalogue includes guided heritage walks, cultural experiences, and curated sightseeing itineraries with knowledgeable local guides who bring stories to life.",
    color: "#fdf4e8",
    accent: "#c47a00",
  },
  {
    icon: "🛡️",
    title: "Travel Insurance",
    desc: "All Wanderly packages include comprehensive travel insurance covering medical emergencies, trip cancellations, and lost luggage — so you travel with complete peace of mind.",
    color: "#fde8e8",
    accent: "#bf1a1a",
  },
  {
    icon: "📞",
    title: "24/7 Support",
    desc: "Our dedicated trip managers are available round the clock during your journey. Whether it's a last-minute change or just a recommendation for tonight's dinner — we're always a call away.",
    color: "#e8fdfd",
    accent: "#0a9e9e",
  },
  {
    icon: "🎒",
    title: "Custom Experiences",
    desc: "Adventure seekers, honeymooners, solo travelers, families — we personalize every trip. Add paragliding in Manali, houseboat nights in Kerala, or a cooking class in Varanasi to your package.",
    color: "#fde8f4",
    accent: "#bf1a7a",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    text: "Booked the Rajasthan package for our anniversary. Every single detail was taken care of — from palace stays to sunrise camel rides. Absolutely magical.",
    rating: 5,
    avatar: "PS",
    color: "#ffe8d6",
  },
  {
    name: "Arjun Mehta",
    location: "Bangalore",
    text: "Wanderly's Ladakh trip was a dream come true. The local guides were incredible, food was fantastic, and the 7-day structure was perfect for exploring without feeling rushed.",
    rating: 5,
    avatar: "AM",
    color: "#e8f4fd",
  },
  {
    name: "Sneha Reddy",
    location: "Hyderabad",
    text: "Solo travel used to scare me, but Wanderly made it feel safe and thrilling. The Andaman package had me snorkeling, island-hopping, and completely in love with travel.",
    rating: 5,
    avatar: "SR",
    color: "#e8fdf0",
  },
];

const faqs = [
  {
    q: "Are all Wanderly packages exactly 7 days?",
    a: "Yes! Every package is carefully crafted for a 7-night, 8-day duration. We've found this is the sweet spot — long enough to truly immerse yourself in a destination, short enough to fit into most work leave schedules.",
  },
  {
    q: "What's included in the package price?",
    a: "All packages include return flights or train tickets, hotel stays (3–5 star based on the package tier), all meals (breakfast, lunch, dinner), local transfers, guided tours, and travel insurance. Only personal shopping and optional add-on experiences are extra.",
  },
  {
    q: "Can I customize my package?",
    a: "Absolutely. Every package can be personalized — upgrade your accommodation, add adventure activities, extend specific city stays, or request dietary preferences. Speak to our trip designers for a tailored experience.",
  },
  {
    q: "How far in advance should I book?",
    a: "We recommend booking at least 3–4 weeks in advance for domestic packages and 6–8 weeks for international ones. Peak season destinations like Rajasthan (Oct–Feb) and Ladakh (Jun–Sep) book out fast.",
  },
  {
    q: "Is there a group discount?",
    a: "Yes! Groups of 6 or more get 10–15% off the base price. We also have special honeymoon and family packages with complimentary upgrades and curated experiences.",
  },
];

function StarRating({ count }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#f0a500", fontSize: 14 }}>
          ★
        </span>
      ))}
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: "1px solid #f0e6d8",
        paddingBottom: 16,
        marginBottom: 16,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          textAlign: "left",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 0,
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 17,
            fontWeight: 600,
            color: "#1a1a1a",
            lineHeight: 1.4,
          }}
        >
          {q}
        </span>
        <span
          style={{
            fontSize: 22,
            color: "#e86a2e",
            flexShrink: 0,
            transform: open ? "rotate(45deg)" : "none",
            transition: "transform 0.2s",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <p
          style={{
            marginTop: 10,
            color: "#555",
            fontSize: 15,
            lineHeight: 1.7,
          }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  const heroRef = useRef(null);

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
      }}
    >
      {/* ─── GOOGLE FONTS ─────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,600&family=Inter:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .wand-btn-primary {
          background: linear-gradient(135deg, #e86a2e, #d94f1a);
          color: white;
          padding: 14px 32px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 15px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(232,106,46,0.35);
        }
        .wand-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(232,106,46,0.45); }

        .wand-btn-outline {
          background: transparent;
          color: #e86a2e;
          padding: 14px 32px;
          border-radius: 50px;
          font-weight: 600;
          font-size: 15px;
          border: 2px solid #e86a2e;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: background 0.2s, color 0.2s;
        }
        .wand-btn-outline:hover { background: #e86a2e; color: white; }

        .dest-card { transition: transform 0.3s, box-shadow 0.3s; }
        .dest-card:hover { transform: translateY(-8px); box-shadow: 0 20px 50px rgba(0,0,0,0.15) !important; }
        .dest-card:hover .dest-img { transform: scale(1.08); }

        .dest-img { transition: transform 0.5s ease; }

        .service-card { transition: transform 0.25s, box-shadow 0.25s; }
        .service-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1) !important; }

        .intl-card { position: relative; overflow: hidden; transition: transform 0.3s; }
        .intl-card:hover { transform: scale(1.02); }
        .intl-card .overlay { transition: opacity 0.3s; }
        .intl-card:hover .overlay { opacity: 1 !important; }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .float-badge { animation: float 3s ease-in-out infinite; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeInUp 0.7s ease forwards; }
        .fade-in-delay-1 { animation: fadeInUp 0.7s 0.15s ease both; }
        .fade-in-delay-2 { animation: fadeInUp 0.7s 0.3s ease both; }
        .fade-in-delay-3 { animation: fadeInUp 0.7s 0.45s ease both; }

        .stat-num { font-family: 'Playfair Display', serif; }

        section { scroll-margin-top: 80px; }
      `}</style>

      {/* ─── SECTION 1: HERO ────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(160deg, #fff9f5 0%, #fff3eb 40%, #ffeedd 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "100px 24px 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(232,106,46,0.06)",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(232,106,46,0.04)",
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 820 }}>
          {/* Pill badge */}
          <div
            className="float-badge"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#fff",
              border: "1px solid #f5d4c0",
              borderRadius: 50,
              padding: "8px 20px",
              fontSize: 13,
              color: "#e86a2e",
              fontWeight: 600,
              marginBottom: 32,
              boxShadow: "0 4px 16px rgba(232,106,46,0.12)",
            }}
          >
            <span>✦</span> All-inclusive 7-Day Packages from ₹950
          </div>

          <h1
            className="fade-in"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(48px, 8vw, 88px)",
              fontWeight: 900,
              color: "#1a1a1a",
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            Discover India,
            <br />
            <em style={{ color: "#e86a2e", fontStyle: "italic" }}>
              Wanderly Style
            </em>
          </h1>

          <p
            className="fade-in-delay-1"
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "#666",
              lineHeight: 1.8,
              maxWidth: 580,
              margin: "0 auto 40px",
              fontWeight: 400,
            }}
          >
            Every journey is 7 days. Every detail is handled. From flight to
            feast to final goodbye hug — Wanderly takes care of it all.
          </p>

          <div
            className="fade-in-delay-2"
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {user ? (
              <Link
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                className="wand-btn-primary"
              >
                Go to {user.role === "admin" ? "Admin Panel" : "Dashboard"}
              </Link>
            ) : (
              <>
                <Link to="/signup" className="wand-btn-primary">
                  Start Your Journey
                </Link>
                <Link to="/login" className="wand-btn-outline">
                  Login
                </Link>
              </>
            )}
          </div>

          {/* Trust stats */}
          <div
            className="fade-in-delay-3"
            style={{
              display: "flex",
              gap: 48,
              justifyContent: "center",
              marginTop: 64,
              flexWrap: "wrap",
            }}
          >
            {[
              { num: "50,000+", label: "Happy Travelers" },
              { num: "8", label: "India Destinations" },
              { num: "7", label: "Days Per Package" },
              { num: "4.9 ★", label: "Average Rating" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div
                  className="stat-num"
                  style={{ fontSize: 28, fontWeight: 700, color: "#e86a2e" }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#999",
                    marginTop: 4,
                    fontWeight: 500,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            color: "#ccc",
            fontSize: 12,
          }}
        >
          <span>Scroll to explore</span>
          <div
            style={{
              width: 1,
              height: 40,
              background: "linear-gradient(to bottom, #e86a2e, transparent)",
            }}
          />
        </div>
      </section>

      {/* ─── SECTION 2: ABOUT WANDERLY ──────────────────────────────── */}
      <section style={{ background: "#fff", padding: "100px 24px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 64,
            alignItems: "center",
          }}
        >
          {/* Text side */}
          <div>
            <p
              style={{
                color: "#e86a2e",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Who We Are
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 700,
                color: "#1a1a1a",
                lineHeight: 1.2,
                marginBottom: 24,
              }}
            >
              India's most loved all-inclusive travel brand
            </h2>
            <p
              style={{
                color: "#555",
                lineHeight: 1.8,
                fontSize: 16,
                marginBottom: 20,
              }}
            >
              Wanderly was born from a simple belief: travel should be
              effortless. Not just affordable — effortless. You shouldn't have
              to spend hours on 11 different tabs comparing flights, hotels,
              transfers, and restaurants. We do all of that for you.
            </p>
            <p
              style={{
                color: "#555",
                lineHeight: 1.8,
                fontSize: 16,
                marginBottom: 32,
              }}
            >
              Every Wanderly package is exactly <strong>7 nights</strong> — a
              duration we've refined over 10,000+ trips as the perfect balance
              between immersive exploration and practical leave planning. From
              the moment you book to the moment you're back home, we've got
              every single detail covered.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                "Zero Planning Stress",
                "All-Inclusive Pricing",
                "Expert Local Guides",
                "24/7 Trip Support",
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "#fff3eb",
                    color: "#e86a2e",
                    border: "1px solid #f5d4c0",
                    borderRadius: 50,
                    padding: "6px 16px",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Visual blocks */}
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            {[
              {
                icon: "🗓️",
                title: "7-Day Structure",
                sub: "Every trip. Every time. No exceptions.",
              },
              {
                icon: "🌏",
                title: "8 India Destinations",
                sub: "Carefully curated for all travel styles.",
              },
              {
                icon: "💰",
                title: "Transparent Pricing",
                sub: "One price. Everything included.",
              },
              {
                icon: "🤝",
                title: "Dedicated Manager",
                sub: "Your personal trip expert on call.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: "#fff9f5",
                  borderRadius: 16,
                  padding: 24,
                  border: "1px solid #f5e6d8",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 10 }}>
                  {item.icon}
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#1a1a1a",
                    marginBottom: 6,
                  }}
                >
                  {item.title}
                </div>
                <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: INDIA DESTINATIONS ─────────────────────────── */}
      <section style={{ background: "#fff9f5", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p
              style={{
                color: "#e86a2e",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Explore India
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                color: "#1a1a1a",
                lineHeight: 1.2,
                marginBottom: 16,
              }}
            >
              8 Incredible India Destinations
            </h2>
            <p
              style={{
                color: "#666",
                fontSize: 17,
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              Each destination is a full 7-night, all-inclusive experience. Pick
              your India.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 28,
            }}
          >
            {indiaDestinations.map((place) => (
              <div
                key={place.name}
                className="dest-card"
                style={{
                  background: "#fff",
                  borderRadius: 24,
                  overflow: "hidden",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                  cursor: "pointer",
                }}
              >
                <div style={{ overflow: "hidden", position: "relative" }}>
                  <img
                    src={place.image}
                    alt={place.name}
                    className="dest-img"
                    style={{
                      width: "100%",
                      height: 210,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 14,
                      left: 14,
                      background: "rgba(232,106,46,0.9)",
                      backdropFilter: "blur(4px)",
                      color: "#fff",
                      borderRadius: 50,
                      padding: "4px 14px",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {place.badge}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 14,
                      right: 14,
                      background: "rgba(0,0,0,0.55)",
                      color: "#fff",
                      borderRadius: 50,
                      padding: "4px 12px",
                      fontSize: 11,
                    }}
                  >
                    7 Nights
                  </div>
                </div>
                <div style={{ padding: "20px 22px 24px" }}>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 22,
                      fontWeight: 700,
                      color: "#1a1a1a",
                      marginBottom: 4,
                    }}
                  >
                    {place.name}
                  </h3>
                  <p
                    style={{
                      color: "#e86a2e",
                      fontStyle: "italic",
                      fontSize: 14,
                      marginBottom: 10,
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {place.tagline}
                  </p>
                  <p
                    style={{
                      color: "#aaa",
                      fontSize: 12,
                      letterSpacing: "0.05em",
                      marginBottom: 18,
                    }}
                  >
                    {place.highlight}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Link
                      to="/packages"
                      style={{
                        color: "#e86a2e",
                        fontWeight: 600,
                        fontSize: 14,
                        textDecoration: "none",
                        borderBottom: "1.5px solid #e86a2e",
                        paddingBottom: 2,
                      }}
                    >
                      View Package →
                    </Link>
                    <span style={{ fontSize: 12, color: "#bbb" }}>
                      All Incl.
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: INTERNATIONAL DESTINATIONS ──────────────────── */}
      <section style={{ background: "#fff", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p
              style={{
                color: "#e86a2e",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Beyond Borders
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                color: "#1a1a1a",
              }}
            >
              International Escapes
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {internationalDestinations.map((place) => (
              <div
                key={place.name}
                className="intl-card"
                style={{ borderRadius: 20, height: 300, cursor: "pointer" }}
              >
                <img
                  src={place.image}
                  alt={place.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: 20,
                  }}
                />
                <div
                  className="overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                    borderRadius: 20,
                    opacity: 0.85,
                  }}
                />
                <div style={{ position: "absolute", bottom: 22, left: 22 }}>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: 12,
                      marginBottom: 4,
                      fontStyle: "italic",
                    }}
                  >
                    {place.tagline}
                  </p>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 26,
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {place.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: HOW IT WORKS ────────────────────────────────── */}
      <section style={{ background: "#1a1a1a", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              color: "#e86a2e",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Simple as 1-2-3
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 700,
              color: "#fff",
              marginBottom: 16,
            }}
          >
            How Wanderly Works
          </h2>
          <p
            style={{
              color: "#888",
              fontSize: 17,
              maxWidth: 520,
              margin: "0 auto 64px",
            }}
          >
            Three steps is all it takes. We handle the next ten thousand.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 32,
            }}
          >
            {[
              {
                step: "01",
                title: "Pick Your Destination",
                desc: "Choose from 8 India destinations or 4 international getaways. Each is a curated 7-night experience.",
              },
              {
                step: "02",
                title: "We Build Your Trip",
                desc: "Our trip designers handle flights, hotels, food, transfers, and all activities. You review and confirm.",
              },
              {
                step: "03",
                title: "Just Show Up",
                desc: "Land at the airport and your Wanderly journey begins. A trip manager is with you every step of the way.",
              },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  background: "#242424",
                  borderRadius: 20,
                  padding: 36,
                  textAlign: "left",
                  border: "1px solid #333",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 52,
                    fontWeight: 900,
                    color: "#333",
                    marginBottom: 20,
                  }}
                >
                  {item.step}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 12,
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: "#888", fontSize: 15, lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: SERVICES ────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p
              style={{
                color: "#e86a2e",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              What We Offer
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                color: "#1a1a1a",
                marginBottom: 16,
              }}
            >
              Everything is taken care of
            </h2>
            <p
              style={{
                color: "#666",
                fontSize: 17,
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              When we say all-inclusive, we mean it. Here's everything that's
              covered in every single Wanderly package.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {services.map((s) => (
              <div
                key={s.title}
                className="service-card"
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: 28,
                  border: "1px solid #f0e6d8",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: s.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    marginBottom: 18,
                  }}
                >
                  {s.icon}
                </div>
                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#1a1a1a",
                    marginBottom: 10,
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div
            style={{
              marginTop: 64,
              background: "linear-gradient(135deg, #e86a2e, #c94e10)",
              borderRadius: 24,
              padding: "48px 40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 30,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 10,
                }}
              >
                One price. Zero stress. 7 days of magic.
              </h3>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 16 }}>
                Packages starting at ₹24,999 per person, all inclusive.
              </p>
            </div>
            <Link
              to="/packages"
              style={{
                background: "#fff",
                color: "#e86a2e",
                fontWeight: 700,
                padding: "16px 36px",
                borderRadius: 50,
                textDecoration: "none",
                fontSize: 15,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Browse Packages →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: TESTIMONIALS ────────────────────────────────── */}
      <section style={{ background: "#fff9f5", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p
              style={{
                color: "#e86a2e",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Real Stories
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: 700,
                color: "#1a1a1a",
              }}
            >
              Travelers who loved it
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 28,
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: 32,
                  border: "1px solid #f5e6d8",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                }}
              >
                <StarRating count={t.rating} />
                <p
                  style={{
                    color: "#444",
                    fontSize: 15,
                    lineHeight: 1.8,
                    margin: "16px 0 24px",
                    fontStyle: "italic",
                  }}
                >
                  "{t.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: t.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: 14,
                      color: "#e86a2e",
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 15,
                        color: "#1a1a1a",
                      }}
                    >
                      {t.name}
                    </div>
                    <div style={{ fontSize: 13, color: "#aaa" }}>
                      {t.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: FAQ ─────────────────────────────────────────── */}
      <section style={{ background: "#fff", padding: "100px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p
              style={{
                color: "#e86a2e",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Got Questions?
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 700,
                color: "#1a1a1a",
              }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div>
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 9: FINAL CTA ───────────────────────────────────── */}
      <section
        style={{
          background: "#1a1a1a",
          padding: "100px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            left: "50%",
            transform: "translateX(-50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "rgba(232,106,46,0.06)",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 680,
            margin: "0 auto",
          }}
        >
          <p
            style={{
              color: "#e86a2e",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Your journey starts here
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: 24,
            }}
          >
            Ready for your next
            <br />
            <em style={{ color: "#e86a2e" }}>7-day adventure?</em>
          </h2>
          <p
            style={{
              color: "#888",
              fontSize: 17,
              lineHeight: 1.7,
              marginBottom: 40,
            }}
          >
            Join 50,000+ travelers who've let Wanderly handle every detail while
            they soaked in every moment.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/signup"
              className="wand-btn-primary"
              style={{ fontSize: 16 }}
            >
              Book Your Trip
            </Link>
            <Link
              to="/packages"
              className="wand-btn-outline"
              style={{ borderColor: "#555", color: "#ccc", fontSize: 16 }}
            >
              Explore Packages
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────────────── */}
      <footer
        style={{ background: "#111", padding: "60px 24px 40px", color: "#666" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 24,
              paddingBottom: 32,
              borderBottom: "1px solid #222",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 28,
                  fontWeight: 900,
                  color: "#fff",
                }}
              >
                Wanderly
              </div>
              <div style={{ fontSize: 13, color: "#555", marginTop: 6 }}>
                All-inclusive 7-day journeys across India
              </div>
            </div>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {["About", "Destinations", "Packages", "Contact"].map((l) => (
                <Link
                  key={l}
                  to={`/${l.toLowerCase()}`}
                  style={{
                    color: "#555",
                    textDecoration: "none",
                    fontSize: 14,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#e86a2e")}
                  onMouseLeave={(e) => (e.target.style.color = "#555")}
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>
          <div
            style={{
              marginTop: 28,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <p style={{ fontSize: 13 }}>
              © 2025 Wanderly. All rights reserved.
            </p>
            <p style={{ fontSize: 13 }}>Made with ❤️ for India's explorers</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
