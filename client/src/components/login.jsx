import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // <-- ADD THIS LINE
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        toast.success("Login successful!");
        // Force reload to update Navbar login state
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        toast.error(
          data.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong.");
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
            Login
          </h1>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <span className="text-gray-600 text-sm">
              Don't have an account?
            </span>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="ml-2 text-blue-500 hover:underline text-sm font-medium"
            >
              Signup
            </button>
           
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
