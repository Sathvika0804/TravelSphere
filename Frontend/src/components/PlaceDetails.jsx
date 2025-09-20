import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceDetails = () => {
  const { destination, placeName } = useParams();
  const [place, setPlace] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  fetch(`http://localhost:8080/places/destination/${destination}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch place details");
      }
      return res.json();
    })
    .then((data) => {
      const found = data.find(
        (p) =>
          p.name.toLowerCase() === decodeURIComponent(placeName).toLowerCase()
      );
      if (!found) throw new Error("Place not found");
      setPlace(found);
    })
    .catch(() => {
      toast.error("❌ Place not found");
      navigate(-1);
    });
}, [destination, placeName, navigate]);


  if (!place) {
    return (
      <p className="text-center mt-20 text-gray-600 text-lg animate-pulse">
        Loading place details...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 p-6 relative overflow-hidden">
      {/* Animated emojis */}
      <div className="absolute top-20 left-5 text-5xl animate-bounce">🌎</div>
      <div className="absolute top-40 right-10 text-6xl animate-pulse">📸</div>
      <div className="absolute bottom-20 left-10 text-6xl animate-spin">✨</div>

      {/* Back & Home Buttons */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition transform hover:scale-105"
        >
          ⬅️ Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition transform hover:scale-105"
        >
          🏠 Home
        </button>
      </div>

      {/* Place Details */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-500 ease-in-out">
        <img
          src={place.imageUrl}
          alt={place.name}
          className="w-full h-96 object-cover transition-transform duration-700 ease-in-out hover:scale-110 hover:brightness-90"
        />
        <div className="p-6">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-800">
            {place.name}
          </h2>
          <p className="text-gray-700 text-lg mb-4">{place.description}</p>
          <p className="text-sm text-gray-500 mb-4">
            Destination:{" "}
            <span className="font-semibold">{place.destination}</span>
          </p>

          {/* Fun Engagement Section */}
          <div className="bg-yellow-100 rounded-xl p-4 mb-4 shadow-lg animate-fadeIn">
            <h3 className="text-2xl font-bold mb-2 text-yellow-800">
              🌟 Travel Tip
            </h3>
            <p className="text-gray-700 text-sm">
              Try visiting early morning to enjoy less crowd and amazing sunrise
              views! 📸 Don't forget your camera and a water bottle.
            </p>
          </div>

          <div className="bg-purple-100 rounded-xl p-4 mb-4 shadow-lg animate-pulse">
            <h3 className="text-2xl font-bold mb-2 text-purple-800">
              🎯 Must Do
            </h3>
            <p className="text-gray-700 text-sm">
              Explore local cafes nearby ☕, taste the signature dish 🍽️, and
              take a stroll around the hidden lanes for an unforgettable
              experience.
            </p>
          </div>

          <div className="bg-green-100 rounded-xl p-4 mb-4 shadow-lg animate-pulse">
            <h3 className="text-2xl font-bold mb-2 text-green-800">
              📌 Fun Fact
            </h3>
            <p className="text-gray-700 text-sm">
              This place attracts thousands of tourists every year and is
              featured in popular movies and travel blogs! 🌍
            </p>
          </div>
          <div className="bg-pink-100 rounded-xl p-4 shadow-lg animate-pulse">
            <h3 className="text-2xl font-bold mb-2 text-pink-800">
                🏃‍♂️ Traveler's Challenge
            </h3>
            <p className="text-gray-700 text-sm">
                Can you take a photo of this place from the most unique angle? 📸 Tag it on social media and share your adventure with friends! 🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
