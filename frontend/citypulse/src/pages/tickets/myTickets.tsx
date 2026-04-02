import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/axios";

export default function MyTickets() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get("/tickets/my");
        setTickets(res.data);
      } catch (err) {
        setError("Failed to load your tickets. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-white">
        <div className="animate-pulse text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
          Loading your ticket vault...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-[80vh] items-center justify-center text-white space-y-4">
        <div className="text-3xl text-red-500 font-semibold">{error}</div>
        <Link to="/" className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-all">Back to Events</Link>
      </div>
    );
  }

  return (
    <div className="text-white p-10 max-w-6xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <h1 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 tracking-tight drop-shadow-sm">
          🎫 My Upcoming Events
        </h1>
        <div className="mt-4 md:mt-0 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
          <span className="font-semibold text-purple-300">{tickets.length}</span> Total Tickets
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
          <p className="text-2xl text-gray-400 mb-6">Looks like your vault is empty</p>
          <Link to="/" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-8 py-3 rounded-full font-bold shadow-lg shadow-purple-500/30 transition-all duration-300">
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="group relative bg-[#1c1c28]/60 backdrop-blur-xl border border-white/10 p-1 flex flex-col sm:flex-row shadow-2xl hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 rounded-3xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="flex-1 p-6 relative z-10 space-y-4 border-b sm:border-b-0 sm:border-r border-white/10 border-dashed">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-white mb-1 leading-tight line-clamp-2">
                    {ticket.event?.title || `Event ID: ${ticket.eventId}`}
                  </h2>
                  {ticket.status === "ISSUED" && (
                     <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-green-500/30">Valid</span>
                  )}
                </div>

                <div className="text-sm font-medium text-gray-300 space-y-1">
                  <p className="flex items-center gap-2">
                    <span className="text-xl">📍</span> 
                    <span className="truncate">{ticket.event?.city || "City TBA"} {ticket.event?.address ? `- ${ticket.event.address}` : ""}</span>
                  </p>
                  <p className="flex items-center gap-2 text-purple-300">
                    <span className="text-xl">📅</span> 
                    {ticket.event?.startDateTime ? new Date(ticket.event.startDateTime).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : "Date TBA"}
                  </p>
                </div>
                
                <div className="pt-2 flex items-center justify-between">
                   <div className="bg-black/40 rounded-xl px-4 py-2 border border-white/5 inline-block">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Seat Assignment</p>
                    <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                      {ticket.eventSeat?.seat?.seatType || "GENERAL"} - {ticket.eventSeat?.seatNumber || ticket.eventSeatId?.slice(-4)}
                    </p>
                  </div>
                </div>
                
                <Link to={`/tickets/${ticket.bookingId}`} className="text-[10px] text-gray-400 hover:text-purple-400 font-mono tracking-widest uppercase mt-4 block transition-colors">
                  TICKET ID: {ticket.ticketCode} ↗
                </Link>
              </div>

              <div className="flex flex-col items-center justify-center bg-white p-6 relative z-10 min-w-[200px]">
                 <img
                  src={ticket.qrCodeData}
                  alt="Scan to enter"
                  className="w-36 h-36 object-contain mix-blend-multiply"
                />
                <p className="text-black font-bold text-xs mt-3 uppercase tracking-widest text-center">Scan at Venue</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}