import { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/axios";

export default function CreateSeats() {
  const { venueId } = useParams();

  const [count, setCount] = useState("");
  const [type, setType] = useState("VIP");

  const handleCreateSeats = async () => {
    try {
      const seats = [];

      for (let i = 1; i <= Number(count); i++) {
        seats.push({
          seatNumber: `${type}-${i}`,
          seatType: type,
        });
      }

      console.log("Seats Payload:", seats);

      await api.post(`/venues/${venueId}/seats`, seats);

      alert("Seats created successfully 🎉");

    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create seats");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="bg-white/10 p-8 rounded-xl w-[400px]">

        <h2 className="text-2xl mb-6 text-center">
          Create Seats 🪑
        </h2>

        {/* Seat Count */}
        <input
          type="number"
          placeholder="Number of seats"
          className="w-full mb-4 px-4 py-2 rounded bg-white/10"
          onChange={(e) => setCount(e.target.value)}
        />

        {/* Seat Type */}
        <select
          className="w-full mb-6 px-4 py-2 rounded bg-white/10"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="VIP">VIP</option>
          <option value="REGULAR">Regular</option>
          <option value="BALCONY">Balcony</option>
        </select>

        {/* Button */}
        <button
          onClick={handleCreateSeats}
          className="w-full bg-purple-600 py-2 rounded"
        >
          Create Seats
        </button>

      </div>
    </div>
  );
}