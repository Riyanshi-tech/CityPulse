import { useState } from "react";
import { api } from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateVenue() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
    type: "STADIUM",
    capacity: "",
  });

  // handle input change
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // submit form
  const handleSubmit = async () => {
    try {
      const res = await api.post("/venues", {
        ...form,
        capacity: Number(form.capacity),
      });

      alert("Venue created 🎉");

      // 👉 move to seat creation next
      navigate(`/organizer/create-seats/${res.data.id}`);

    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create venue");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">

      <div className="bg-white/10 p-8 rounded-xl w-[400px]">

        <h2 className="text-2xl mb-6 text-center">
          Create Venue 🏟
        </h2>

        {/* Name */}
        <input
          name="name"
          placeholder="Venue Name"
          className="w-full mb-3 px-4 py-2 rounded bg-white/10"
          onChange={handleChange}
        />

        {/* City */}
        <input
          name="city"
          placeholder="City"
          className="w-full mb-3 px-4 py-2 rounded bg-white/10"
          onChange={handleChange}
        />

        {/* Address */}
        <input
          name="address"
          placeholder="Address"
          className="w-full mb-3 px-4 py-2 rounded bg-white/10"
          onChange={handleChange}
        />

        {/* Type */}
        <select
          name="type"
          className="w-full mb-3 px-4 py-2 rounded bg-white/10"
          onChange={handleChange}
        >
          <option value="STADIUM">Stadium</option>
          <option value="THEATER">Theater</option>
          <option value="HALL">Hall</option>
        </select>

        {/* Capacity */}
        <input
          name="capacity"
          placeholder="Capacity"
          type="number"
          className="w-full mb-6 px-4 py-2 rounded bg-white/10"
          onChange={handleChange}
        />

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 py-2 rounded"
        >
          Create Venue
        </button>

      </div>
    </div>
  );
}