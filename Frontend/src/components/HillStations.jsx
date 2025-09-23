

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HillStations() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/packages/fetch")
      .then((res) => res.json())
      .then((data) => {
        const hillStationsOnly = data.filter(
          (pkg) => pkg.category.toLowerCase() === "hill station"
        );
        setPackages(hillStationsOnly);
      })
      .catch(() => console.error("❌ Failed to load packages"));
  }, []);

  // Login check
  const handleViewMore = (pid) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userProfile = localStorage.getItem("userProfile");

    if (isLoggedIn !== "true" || !userProfile) {
      alert("⚠ Please login to view and book packages!");
      navigate("/signin"); // redirect to login
    } else {
      navigate(`/packages/${pid}`); // redirect to package details
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-blue-100 via-blue-200 to-indigo-100 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        🌄 Popular Hill Stations
      </h2>

      {/* Back button */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          ⬅ Back to Home
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.pid}
            className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out cursor-pointer relative"
          >
            <img
              src={pkg.imageUrl}
              alt={pkg.name}
              className="w-full h-48 object-cover transition-opacity duration-300 ease-in-out hover:brightness-90"
            />
            <div className="p-5 flex flex-col items-center">
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                {pkg.name}
              </h3>
              <button
                onClick={() => handleViewMore(pkg.pid)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full mt-3 inline-block transition-colors duration-300 ease-in-out"
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HillStations;
