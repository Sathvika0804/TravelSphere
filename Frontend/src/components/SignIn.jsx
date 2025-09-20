import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        if (!data.uid) {
          toast.error("❌ Login response missing UID", { position: "top-center" });
          return;
        }

        // ✅ Clear old storage
        localStorage.clear();

        // ✅ Save new login state
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userProfile", JSON.stringify(data));
        localStorage.setItem("uid", String(data.uid));

        toast.success(`🎉 Welcome ${data.name}!`, { position: "top-center" });

        setTimeout(() => {
          navigate("/");
          window.location.reload(); // refresh Navbar / state
        }, 1000);
      } else if (response.status === 401) {
        toast.error("❌ Invalid email or password.", { position: "top-center" });
      } else {
        toast.error("❌ Something went wrong.", { position: "top-center" });
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("❌ Error connecting to server.", { position: "top-center" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-96 transform transition-all duration-300 hover:scale-105"
      >
        <h2 className="text-2xl font-extrabold mb-6 text-center text-gray-800">
          🔐 Sign In
        </h2>

        <input
          type="email"
          placeholder="📧 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          required
        />
        <input
          type="password"
          placeholder="🔑 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          🚀 Login
        </button>

        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default SignIn;
