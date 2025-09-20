import { Link } from "react-router-dom";
import React from "react";

export default function Sidebar({ isOpen }) {
  const sidebarClasses = isOpen
    ? "transform translate-x-0"
    : "transform -translate-x-full";

  return (
    <div
      className={`w-64 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 text-gray-200 h-screen p-6 fixed md:relative transition-transform duration-300 ease-in-out z-20 shadow-xl ${sidebarClasses}`}
    >
      <h2 className="text-2xl font-bold mb-8 text-white animate-pulse">
        Categories 📌
      </h2>
      <ul className="space-y-4">
        <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
          <Link
            to="/category/hill-station"
            className="text-lg font-medium block"
          >
            Hill Stations 🏔️
          </Link>
        </li>
        <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
          <Link to="/category/adventure" className="text-lg font-medium block">
            Adventures 🌊
          </Link>
        </li>
        <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
          <Link to="/category/pilgrimage" className="text-lg font-medium block">
            Pilgrimages 🛕
          </Link>
        </li>
        <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
          <Link
            to="/category/international"
            className="text-lg font-medium block"
          >
            International Destinations ✈️
          </Link>
        </li>
        <li className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
          <Link
            to="/category/islands"
            className="text-lg font-medium block"
          >
             Islands 🏖️
          </Link>
        </li>
      </ul>
    </div>
  );
}
