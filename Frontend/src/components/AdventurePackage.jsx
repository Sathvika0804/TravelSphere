import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";

function AdventurePackage() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/packages/category/Adventure")
      .then((res) => res.json())
      .then((data) => {
        const adventuresOnly = data.filter(
          (pkg) => pkg.category.toLowerCase() === "adventure"
        );
        setPackages(adventuresOnly);
      })
      .catch(() => console.error("❌ Failed to load adventure packages"));
  }, []);

  // ✅ check login helper
  const handleViewMore = (pid) => {
    const user = localStorage.getItem("user"); // must match your login storage key
    if (!user) {
      alert("⚠ Please login to view and book packages!");
      navigate("/signin");
    } else {
      navigate(`/packages/${pid}`);
    }
  };

  const handleAddPackage = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("⚠ Please login to add packages!");
      navigate("/login");
    } else {
      navigate("/add-package");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-yellow-100 via-orange-100 to-red-100 min-h-screen relative overflow-hidden">
      {/* Back to Home Buttons */}
      <div className="flex justify-end gap-4 mb-6">
        <button
          onClick={() => navigate("/category/hill-station")}
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

        {/* Add Package only for logged-in users */}
        <button
          onClick={handleAddPackage}
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
        >
          ➕ Add Package
        </button>
      </div>

      {/* Animated emojis */}
      <div className="absolute top-10 left-5 text-4xl animate-bounce">🚀</div>
      <div className="absolute bottom-20 right-10 text-5xl animate-pulse">🏄‍♂️</div>

      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        Thrilling Adventure Escapes ⚡
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
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full mt-3 inline-block transition-colors duration-300 ease-in-out"
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

export default AdventurePackage;
