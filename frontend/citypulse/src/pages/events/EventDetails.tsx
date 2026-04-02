import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import { motion } from "framer-motion";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvent();
  }, [id]);
  const handleFavorite = async () => {
    try {
      await api.post(`/events/${event.id}/favorites`);
      alert("Added to favorites ❤️");
    } catch (err) {
      console.error(err);
    }
  };

  if (!event) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="text-white">
      
      {/* 🎨 HERO CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl"
      >
        <h1 className="text-4xl font-bold mb-4">
          {event.title}
        </h1>

        <p className="text-gray-300 mb-4">
          {event.description}
        </p>

        <div className="flex gap-6 text-sm text-gray-400 mb-6">
          <p>📍 {event.city}</p>
          <p>🗓 {new Date(event.startDateTime).toLocaleString()}</p>
        </div>

        <div className="flex gap-4 items-center">
          <button
            onClick={() => navigate(`/booking/${event.id}`)}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl text-white font-semibold transition-all shadow-lg shadow-purple-600/20"
          >
            Book Seats 🎟
          </button>
          
          <button
            onClick={handleFavorite}
            className="bg-white/5 hover:bg-pink-500/10 border border-white/10 text-white hover:text-pink-400 px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 group shadow-lg"
          >
            <span className="group-hover:scale-110 transition-transform duration-300">❤️</span>
            <span>Favorite</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}