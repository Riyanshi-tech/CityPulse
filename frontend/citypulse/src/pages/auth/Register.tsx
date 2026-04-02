import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
   const [role, setRole] = useState<"USER" | "ORGANIZER" |"ADMIN">("USER");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({

    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      // 1. Register the user
      await api.post("/users", { ...form, role });

      // 2. Automatically log them in
      const loginRes = await api.post("/auth/login", {
        emailOrUsername: form.username,
        password: form.password,
      });

      // 3. Store token and user state
      localStorage.setItem("token", loginRes.data.accessToken);
      setUser(loginRes.data.user);

      alert("Registered successfully! Redirecting... 🚀");

      // 4. Redirect based on role
      if (role === "ORGANIZER") {
        navigate("/organizer");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      console.error("Registration Error details:", err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || "Registration failed";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-purple-900">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-[380px]"
      >
        <div className="flex mb-4 bg-white/10 rounded p-1">
  <button
  type="button" 
    onClick={() => setRole("USER")}
    className={`flex-1 py-2 rounded ${
      role === "USER"
        ? "bg-purple-600 text-white"
        : "text-gray-300"
    }`}
  >
    User 
  </button>

  <button
  type="button" 
    onClick={() => setRole("ORGANIZER")}
    className={`flex-1 py-2 rounded ${
      role === "ORGANIZER"
        ? "bg-purple-600 text-white"
        : "text-gray-300"
    }`}
  >
    Organizer 
  </button>
</div>
        
        <h2 className="text-white text-2xl mb-6 text-center">
          Register here
        </h2>

        {/* Name */}
        <div className="flex gap-2 mb-4">
          <input
            name="firstName"
            placeholder="First Name"
            className="w-1/2 px-3 py-2 rounded bg-white/10 text-white"
            value={form.firstName}
            onChange={handleChange}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            className="w-1/2 px-3 py-2 rounded bg-white/10 text-white"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

        {/* Username */}
        <input
          name="username"
          placeholder="Username"
          className="w-full mb-4 px-4 py-2 rounded bg-white/10 text-white"
          value={form.username}
          onChange={handleChange}
        />

        {/* Email */}
        <input
          name="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 rounded bg-white/10 text-white"
          value={form.email}
          onChange={handleChange}
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 rounded bg-white/10 text-white"
          value={form.password}
          onChange={handleChange}
        />

        <button
        type="button" 
        disabled={loading}
          onClick={() => {
    handleRegister();
  }}

          className={`w-full py-2 rounded text-white ${loading ? 'bg-purple-800 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
        >
          {loading ? "Registering..." : "Register"}
        </button>


        {/* Footer */}
        <p className="text-gray-300 text-sm mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-purple-400 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </motion.div>
    </div>
  );
}