import React, { useEffect, useState } from "react";  
import { useNavigate } from "react-router-dom"; 

function PilgrimagePackage() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/packages/category/Pilgrimage")
      .then((res) => res.json())
      .then((data) => {
        const pilgrimageOnly = data.filter(
          (pkg) => pkg.category.toLowerCase() === "pilgrimage"
        );
        setPackages(pilgrimageOnly);
      })
      .catch(() => console.error("❌ Failed to load pilgrimage packages"));
  }, []);

  // ✅ Proper login check
  const handleViewMore = (pid) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userProfile = localStorage.getItem("userProfile");

    if (isLoggedIn !== "true" || !userProfile) {
      alert("⚠ Please login to view and book packages!");
      navigate("/signin");
    } else {
      navigate(`/packages/${pid}`);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-green-100 via-teal-100 to-blue-100 min-h-screen relative overflow-hidden">
      {/* Back Buttons */}
      <div className="flex justify-end gap-4 mb-6">
        <button
          onClick={() => navigate("/category/adventure")}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md"
        >
          ⬅️ Back
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          ⬅ Back to Home
        </button>
      </div>

      {/* Subtle emojis */}
      <div className="absolute top-10 left-5 text-4xl animate-bounce">🛕</div>
      <div className="absolute bottom-20 right-10 text-5xl animate-pulse">🙏</div>

      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        Spiritual Pilgrimage Journeys ✨
      </h2>

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
              onError={(e) => { e.target.src = "/images/fallback.jpg"; }}
            />
            <div className="p-5 flex flex-col items-center">
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                {pkg.name}
              </h3>
              <button
                onClick={() => handleViewMore(pkg.pid)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full mt-3 inline-block transition-colors duration-300 ease-in-out"
              >
                Start Your Journey
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PilgrimagePackage;
