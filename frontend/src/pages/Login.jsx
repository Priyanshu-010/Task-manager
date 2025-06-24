import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios.js";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed");
      console.log("error in handleSubmit Login", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Task Manager - Login</h2>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 mb-6 rounded bg-gray-700 focus:outline-none" />
        <button className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded">Login</button>
        <p className="text-sm text-center mt-4">
          Don’t have an account? <a href="/signup" className="text-blue-400 hover:underline">Signup</a>
        </p>
      </form>
    </div>
  );
}
