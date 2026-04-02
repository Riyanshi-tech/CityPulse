import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MyFavorites() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await api.get("/favorites");
        // Backend returns: { message: "...", favorites: [...] }
        setFavorites(res.data.favorites || []);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="min-h-screen text-white p-6 md:p-10 bg-gradient-to-br from-gray-900 to-black">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-10">
          <span className="text-4xl">❤️</span>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            My Favorites
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav, index) => (
              <motion.div
                key={fav.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => navigate(`/events/${fav.event.id}`)}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl cursor-pointer hover:bg-white/10 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-pink-500 text-xl">❤️</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-pink-400 transition-colors">
                  {fav.event.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {fav.event.description}
                </p>
                
                <div className="flex flex-col gap-1 text-xs text-gray-500">
                  <p>📍 {fav.event.city}</p>
                  <p>🗓 {new Date(fav.event.startDateTime).toLocaleDateString()}</p>
                </div>

                <div className="mt-4 flex justify-end">
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    View Details <span>→</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/20"
          >
            <p className="text-2xl text-gray-400 mb-6 font-light">
              You haven't added any favorites yet.
            </p>
            <button
              onClick={() => navigate("/events")}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-pink-500/20"
            >
              Explore Events 🚀
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}