import { useNavigate } from "react-router-dom";

export default function OrganizerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl mb-6">🎤 Organizer Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">

        <div
          onClick={() => navigate("/organizer/create-venue")}
          className="bg-purple-600 p-6 rounded-xl cursor-pointer hover:scale-105 transition"
        >
          🏟 Create Venue
        </div>

        <div
          onClick={() => navigate("/organizer/create-event")}
          className="bg-green-600 p-6 rounded-xl cursor-pointer hover:scale-105 transition"
        >
          🎉 Create Event
        </div>

        <div
          onClick={() => navigate("/organizer/my-events")}
          className="bg-blue-600 p-6 rounded-xl cursor-pointer hover:scale-105 transition"
        >
          📅 My Events
        </div>

      </div>
    </div>
  );
}