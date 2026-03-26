/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth(); //  important

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        emailOrUsername: identifier,
        password,
      });
      localStorage.setItem("token", res.data.accessToken);
      //  store user globally
      setUser(res.data.user);

      //  redirect
      navigate("/");

    } catch (err: any) {
      console.log(err.response);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-purple-900">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-[350px]"
      >

        <h2 className="text-white text-2xl mb-6 text-center">
          Login 🎟️
        </h2>

        <input
          type="text"
          placeholder="Email or Username"
          className="w-full mb-4 px-4 py-2 rounded bg-white/10 text-white"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 rounded bg-white/10 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded text-white"
        >
          Login
        </button>

      </motion.div>
    </div>
  );
}