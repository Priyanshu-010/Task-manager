import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/signup", form);
      navigate("/");
    } catch (error) {
      alert("Signup failed");
      console.log("Error in handleSubmit Signup",error)
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Task Manager - Signup</h2>
        <input name="name" type="text" placeholder="Name" onChange={handleChange} required className="w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full p-2 mb-6 rounded bg-gray-700 focus:outline-none" />
        <button className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded">Signup</button>
        <p className="text-sm text-center mt-4">
          Already have an account? <a href="/" className="text-blue-400 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
}