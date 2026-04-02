import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MyEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await api.get("/events/organizer");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching my events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 bg-gradient-to-br from-black via-zinc-900 to-purple-900/10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              My Events 📅
            </h1>
            <p className="text-gray-400 mt-2">Manage all your hosted experiences</p>
          </div>
          <button
            onClick={() => navigate("/organizer/create-event")}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-600/20"
          >
            + Create New Event
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all group"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      event.isApproved ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {event.isApproved ? "Approved" : "Pending Review"}
                    </span>
                    <span className="text-purple-400 text-xs font-medium">#{event.category}</span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>📍</span>
                      <span>{event.venue?.name || event.city}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>🗓</span>
                      <span>{new Date(event.startDateTime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>🎟</span>
                      <span>{event.totalTickets} Total Seats</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-white/5">
                    <button
                      onClick={() => navigate(`/events/${event.id}`)}
                      className="flex-1 bg-white/5 hover:bg-white/10 py-2 rounded-lg text-xs font-semibold transition-all"
                    >
                      View Live
                    </button>
                    <button
                      onClick={() => navigate(`/organizer/edit-event/${event.id}`)}
                      className="flex-1 bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 py-2 rounded-lg text-xs font-semibold transition-all"
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white/5 rounded-3xl border border-dashed border-white/20">
            <div className="text-6xl mb-6">📅</div>
            <h2 className="text-2xl font-bold mb-4 text-white">No Events Yet</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              You haven't created any events yet. Start hosting and reach your audience!
            </p>
            <button
              onClick={() => navigate("/organizer/create-event")}
              className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl font-bold transition-all shadow-lg"
            >
              Create My First Event
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
