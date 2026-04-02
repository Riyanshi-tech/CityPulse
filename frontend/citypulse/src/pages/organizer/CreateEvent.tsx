import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const navigate = useNavigate();
  const [venues, setVenues] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "TECH",
    startDateTime: "",
    endDateTime: "",
    city: "",
    address: "",
    totalTickets: "",
    venueId: "",
  });

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await api.get("/venues");
        setVenues(res.data);
      } catch (err) {
        console.error("Error fetching venues:", err);
      }
    };
    fetchVenues();
  }, []);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        totalTickets: Number(form.totalTickets),
        venueId: Number(form.venueId),
      };
      
      await api.post("/events", payload);
      alert("Event created successfully! 🎉");
      navigate("/organizer");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create event. Please check all fields.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 bg-gradient-to-br from-black via-zinc-900 to-purple-900/20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-xl border border-white/10 p-8 rounded-3xl w-full max-w-2xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Create Event 🚀</h1>
          <p className="text-gray-400">Launch your next big experience</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Event Title</label>
            <input
              required
              name="title"
              placeholder="e.g. Web3 Innovation Summit"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Description</label>
            <textarea
              required
              name="description"
              rows={3}
              placeholder="Tell people what your event is about..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Category</label>
            <select
              name="category"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              onChange={handleChange}
            >
              <option value="TECH">Technology</option>
              <option value="MUSIC">Music</option>
              <option value="SPORTS">Sports</option>
              <option value="ART">Art</option>
              <option value="BUSINESS">Business</option>
              <option value="EDUCATION">Education</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Tickets Available</label>
            <input
              required
              type="number"
              name="totalTickets"
              placeholder="e.g. 500"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Start Date & Time</label>
            <input
              required
              type="datetime-local"
              name="startDateTime"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">End Date & Time</label>
            <input
              required
              type="datetime-local"
              name="endDateTime"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">City</label>
            <input
              required
              name="city"
              placeholder="e.g. New Delhi"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Venue</label>
            <select
              required
              name="venueId"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              onChange={handleChange}
            >
              <option value="">Select a venue</option>
              {venues.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Experience..." : "Launch Event 🎉"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}