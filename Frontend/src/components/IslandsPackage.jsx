import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const IslandsPackage = () => {
  const [packages, setPackages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPackage, setNewPackage] = useState({
    name: "",
    category: "Islands",
    price: "",
    duration: "",
    imageUrl: "",
    instructions: "",
  });

  const navigate = useNavigate();

  // Fetch packages from backend
  const fetchPackages = () => {
    fetch("http://localhost:8080/packages/category/Islands")
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((err) => console.error("❌ Error fetching packages:", err));
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleChange = (e) => {
    setNewPackage({ ...newPackage, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/packages/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPackage),
      });

      if (res.ok) {
        setShowModal(false);
        setNewPackage({
          name: "",
          category: "Islands",
          price: "",
          duration: "",
          imageUrl: "",
          instructions: "",
        });
        fetchPackages();
        alert("🎉 Island package added successfully!");
      } else {
        alert("❌ Failed to add package.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewMore = (destination) => {
    navigate(`/category/islands/${destination.toLowerCase()}`);
  };

  const handleBookNow = (pid, name) => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      alert("⚠️ Please log in to book this package!");
      navigate("/signin");
      return;
    }

    if (!pid) {
      alert("❌ Package ID missing!");
      return;
    }

    fetch(`http://localhost:8080/bookings/save?uid=${uid}&pid=${pid}`, {
      method: "POST",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Booking failed");
        const text = await res.text();
        return text ? JSON.parse(text) : null;
      })
      .then((data) => {
        if (!data) throw new Error("Booking failed");
        alert(`🎉 ${name} booked successfully!`);
      })
      .catch(() => alert("❌ Failed to book package"));
  };

  return (
    <div className="p-6 bg-gradient-to-r from-cyan-100 to-blue-200 min-h-screen">
      {/* Back & Add Buttons */}
      <div className="flex justify-between mb-6">
        <button
          onClick={() => navigate("/category/international")}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md"
        >
          ⬅️ Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg transform hover:scale-110"
        >
          🏠 Back to Home
        </button>
        {/* <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md animate-pulse"
        >
          ✨ + Add Package
        </button> */}
        <button
          onClick={() => {
            const uid = localStorage.getItem("uid");
            if (!uid) {
              alert("⚠️ You must log in to add a package!");
              navigate("/signin");
              return;
            }
            setShowModal(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md animate-pulse"
        >
          ✨ + Add Package
        </button>
      </div>

      <h2 className="text-4xl font-extrabold mb-6 text-gray-800 text-center">
        🏝️ Exotic Island Destinations
      </h2>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.pid} // ✅ FIX: use pid
            className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer"
          >
            <div className="overflow-hidden h-64 relative">
              <img
                src={pkg.imageUrl}
                alt={pkg.name}
                className="w-full h-full object-cover rounded-t-2xl transition-transform duration-700 ease-in-out hover:scale-110 hover:brightness-90"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                <p className="text-white font-semibold mt-1">
                  💰 ₹{pkg.price.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="p-4 flex flex-col items-center gap-2">
              <button
                onClick={() => handleViewMore(pkg.name)}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg"
              >
                🔍 View More
              </button>

              <button
                onClick={() => handleBookNow(pkg.pid, pkg.name)} // ✅ FIX here
                className="px-6 py-2 bg-teal-600 text-white rounded-full shadow-md hover:bg-teal-700 transition"
              >
                🎟️ Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Package Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl animate-fadeIn">
            <h3 className="text-2xl font-bold mb-4 text-center">
              ✨ Add New Island Package ✨
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Package Name"
                value={newPackage.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={newPackage.price}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration (e.g., 5 Days / 4 Nights)"
                value={newPackage.duration}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={newPackage.imageUrl}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
              <textarea
                name="instructions"
                placeholder="Instructions"
                value={newPackage.instructions}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-300 animate-pulse"
                >
                  Add Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IslandsPackage;
