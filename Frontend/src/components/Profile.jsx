import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import logo from "../assets/images/download.png"; // make sure this path is correct

const Profile = () => {
  const navigate = useNavigate();
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));

  if (!userProfile) {
    return (
      <p className="text-red-500 text-center mt-20 text-lg animate-fadeIn">
        Please log in to see your profile.
      </p>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm p-8 bg-gray-900 rounded-xl shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Logo"
            className="w-24 h-24 rounded-full border-4 border-gray-700 object-cover shadow-md"
          />
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-wide">
          User Profile
        </h2>

        {/* Info */}
        <div className="space-y-6">
          <div className="p-4 bg-gray-800 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-700">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Name</p>
            <p className="text-lg text-white">{userProfile.name}</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-700">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Email</p>
            <p className="text-lg text-white">{userProfile.email}</p>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            ⬅ Back to Home
          </button>
          <button
            onClick={() => navigate("/bookings")}
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
          >
            📖 My Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
