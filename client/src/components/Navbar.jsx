import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // 🟡 Add loading state
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          console.log("✅ Logged in: cookie is valid");
          setIsLoggedIn(true);
        } else {
          console.log("❌ Not logged in: no valid cookie");
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false); // ✅ Done checking
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Logout successful!");
        console.log("🔒 User logged out");
        setIsLoggedIn(false);
        navigate("/login");
      } else {
        toast.error(data.message || "Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Home */}
        <Link to="/" className="text-2xl font-semibold text-blue-600">
          QuoraClone
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="flex gap-6 text-lg items-center">
            {!loading && !isLoggedIn ? (
              <>
                <li>
                  <Link
                    to="/signup"
                    className="hover:text-blue-600 transition duration-200"
                  >
                    Signup
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-blue-600 transition duration-200"
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : !loading && isLoggedIn ? (
              <>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : null}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
