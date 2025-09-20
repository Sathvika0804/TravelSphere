import { NavLink } from "react-router-dom";
import React from "react";

const NavBar = ({ onToggleSidebar, isSidebarOpen }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userProfile = JSON.parse(localStorage.getItem("userProfile")) || null;

  const handleSignOut = () => {
  localStorage.setItem("isLoggedIn", "false");
  localStorage.removeItem("userProfile");
  localStorage.removeItem("uid"); // ✅ remove the correct key
  window.location.reload();
};

  return (
    <nav className="bg-gray-900 text-gray-100 px-8 py-4 flex justify-between items-center shadow-lg border-b border-gray-700 relative z-30">
      <div className="flex items-center space-x-4">
        {/* Hamburger */}
        <button
          onClick={onToggleSidebar}
          className="relative w-8 h-8 flex flex-col justify-between items-center group"
        >
          <span
            className={`block h-1 w-full bg-gray-200 rounded transform transition duration-300 ease-in-out 
              ${isSidebarOpen ? "rotate-45 translate-y-3" : ""}`}
          />
          <span
            className={`block h-1 w-full bg-gray-200 rounded transition-all duration-300 ease-in-out 
              ${isSidebarOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-1 w-full bg-gray-200 rounded transform transition duration-300 ease-in-out 
              ${isSidebarOpen ? "-rotate-45 -translate-y-3" : ""}`}
          />
        </button>
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          🌎 TravelSphere
        </h1>
      </div>

      <div className="space-x-6 font-medium flex items-center">
        {isLoggedIn ? (
          <>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `hover:text-cyan-400 transition-colors duration-300 ${
                  isActive ? "text-cyan-400 font-bold" : ""
                }`
              }
            >
              👤 {userProfile?.name || "Profile"}
            </NavLink>
            <button
              onClick={handleSignOut}
              className="text-red-400 hover:text-red-500 transition-colors duration-300"
            >
              🚪 Sign Out
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/signin"
              className={({ isActive }) =>
                `hover:text-cyan-400 transition-colors duration-300 ${
                  isActive ? "text-cyan-400 font-bold" : ""
                }`
              }
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `bg-cyan-500 px-4 py-2 rounded-full text-white hover:bg-cyan-600 transition-colors duration-300`
              }
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
