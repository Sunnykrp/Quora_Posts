import React, { useState } from "react";
import { toast ,ToastContainer} from "react-toastify";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle signup logic here
    const res = await fetch(`${API_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if(res.status === 200) {
      toast.success("Signup successful!");
      navigate("/login");
      // Redirect or perform other actions
    }
  };

  return (
    <>
    <ToastContainer />
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Signup Page
        </h1>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
        >
          Sign Up
        </button>
      </form>
    </div>
    </>
  );
};
export default Signup;
