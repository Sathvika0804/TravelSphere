import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const IslandPlaces = () => {
  const { island } = useParams();
  const [places, setPlaces] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlace, setNewPlace] = useState({
    name: "",
    imageUrl: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/places/destination/${island}`)
      .then((res) => res.json())
      .then((data) => setPlaces(data))
      .catch(() => toast.error("❌ Failed to load places"));
  }, [island]);

  const handleAddChange = (e) => {
    setNewPlace({ ...newPlace, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:8080/places/save?destination=${island}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPlace),
        }
      );
      if (res.ok) {
        toast.success("✅ Place added successfully!");
        setShowAddModal(false);
        setNewPlace({ name: "", imageUrl: "", description: "" });
        // Refresh places
        fetch(`http://localhost:8080/places/destination/${island}`)
          .then((res) => res.json())
          .then((data) => setPlaces(data));
      } else {
        toast.error("❌ Failed to add place.");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Error adding place.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-6 relative overflow-hidden">
      <div className="absolute bottom-20 right-10 text-6xl animate-pulse">🏝️</div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Famous Places in {island}</h1>
        <div className="space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600 transition transform hover:scale-105"
          >
            ⬅️ Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition transform hover:scale-105"
          >
            🏠 Home
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition transform hover:scale-110 animate-pulse"
          >
            ➕ Add Place
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {places.map((place, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer relative"
          >
            <img
              src={place.imageUrl}
              alt={place.name}
              className="w-full h-48 object-cover rounded-lg mb-3 transition-transform duration-700 ease-in-out hover:scale-110 hover:brightness-90"
            />
            <h2 className="text-xl font-semibold">{place.name}</h2>
            <p className="text-gray-600 text-sm mt-2">{place.description}</p>
            {/* <div className="flex justify-center mt-4">
              <button
                onClick={() =>
                  navigate(
                    `/destination/${island}/${encodeURIComponent(place.name)}`
                  )
                }
                className="px-4 py-2 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 transition transform hover:scale-105"
              >
                🔍 View Details
              </button>
            </div> */}
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl animate-fadeIn">
            <h3 className="text-2xl font-bold mb-4 text-center">✨ Add New Place ✨</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <input
                type="text"
                name="destination"
                placeholder="Destination"
                value={newPlace.destination}
                onChange={handleAddChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Place Name"
                value={newPlace.name}
                onChange={handleAddChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={newPlace.imageUrl}
                onChange={handleAddChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={newPlace.description}
                onChange={handleAddChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-300 animate-pulse"
                >
                  Add Place
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IslandPlaces;
