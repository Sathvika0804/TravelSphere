import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PackageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check login
  const uid = localStorage.getItem("uid");
  const isLoggedIn = uid !== null;

  // Fetch package details
  useEffect(() => {
    fetch(`http://localhost:8080/packages/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setPkg(data))
      .catch(() => toast.error("❌ Failed to load package details"))
      .finally(() => setLoading(false));
  }, [id]);

  // Handle booking
  const handleBookNow = () => {
    if (!isLoggedIn) {
      toast.error("❌ Please login before booking!");
      navigate("/signin");
      return;
    }

    const pid = pkg.pid;
    console.log("Booking with uid:", uid, "pid:", pid);

    fetch(`http://localhost:8080/bookings/save?uid=${uid}&pid=${pid}`, {
      method: "POST",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to book");
        return res.json();
      })
      .then(() => {
        toast.success("🎉 Package booked successfully!");
        navigate("/bookings");
      })
      .catch((error) => {
        console.error("Booking error:", error);
        toast.error("❌ Failed to book package");
      });
  };

  // Loading / error states
  if (loading) return <h3 className="text-center text-xl">⏳ Loading package details...</h3>;
  if (!pkg) return <h3 className="text-center text-xl text-red-600">⚠️ Package not found</h3>;

  const instructionList = pkg.instructions
    ? pkg.instructions.split(",").map((item) => item.trim())
    : [];

  return (
    <div className="p-8 max-w-3xl mx-auto bg-gradient-to-tr from-purple-50 via-purple-100 to-purple-200 rounded-3xl shadow-2xl transition-all duration-500 animate-fadeIn">
      {/* Image */}
      <div className="relative mb-6 overflow-hidden rounded-xl shadow-lg">
        <img
          src={pkg.imageUrl || "/placeholder.jpg"}
          alt={pkg.name}
          className="w-full h-96 object-cover rounded-xl transform transition-transform duration-500 hover:scale-105 hover:brightness-110"
        />
        <div className="absolute top-4 left-4 bg-purple-900 text-white text-sm font-semibold px-4 py-2 rounded-full opacity-90 animate-pulse">
          ✨ {pkg.category} ✨
        </div>
      </div>

      {/* Title */}
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4 animate-fadeInUp">
        {pkg.name} 🌏
      </h2>

      {/* Price & Duration */}
      <div className="flex gap-4 mb-6">
        <span className="px-4 py-2 bg-green-200 text-green-800 font-bold rounded-full animate-pulse">
          💰 ₹{pkg.price.toLocaleString()}
        </span>
        <span className="px-4 py-2 bg-yellow-200 text-yellow-800 font-bold rounded-full animate-pulse">
          🕒 {pkg.duration}
        </span>
      </div>

      {/* Instructions */}
      <div className="text-lg text-gray-700 space-y-3">
        <strong className="text-gray-900 block mb-2">📌 Instructions:</strong>
        <ul className="list-disc list-inside space-y-2">
          {instructionList.length > 0 ? (
            instructionList.map((item, index) => (
              <li
                key={index}
                className="leading-relaxed animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                ✈️ {item}
              </li>
            ))
          ) : (
            <p>❗ No instructions available.</p>
          )}
        </ul>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300"
        >
          🔙 Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 animate-pulse"
        >
          🏠 Back Home
        </button>
        <button
          onClick={handleBookNow}
          disabled={!isLoggedIn} // ✅ disable if not logged in
          className={`px-6 py-3 font-bold rounded-full shadow-lg transform transition-all duration-300 flex items-center gap-2
            ${isLoggedIn 
              ? "bg-purple-600 text-white hover:bg-purple-700 hover:scale-110 animate-pulse" 
              : "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
        >
          🎟️ Book Now
        </button>
        
      </div>
    </div>
  );
}

export default PackageDetails;
