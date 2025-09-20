import React from "react";

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* Animated floating circles */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-white/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/20 rounded-full animate-bounce"></div>
      <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white/25 rounded-full animate-spin-slow"></div>

      {/* Main Title */}
      <h1 className="text-6xl font-extrabold text-gray-900 mb-6 text-center animate-fadeIn">
        🌍 Explore the World with TravelMaster
      </h1>

      {/* Subtitle */}
      <p className="text-xl text-gray-800 mb-12 max-w-3xl text-center animate-fadeIn delay-200">
        Embark on journeys that inspire, thrill, and refresh your soul!  
        From snow-kissed hills 🏔️ to global wonders 🗺️, mystical temples 🛕 to adrenaline adventures 🚀 – we have it all!
      </p>

      {/* Hero Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl animate-fadeIn delay-400">
        
        <div className="bg-white/90 rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
          <h2 className="text-2xl font-bold mb-2">Hill Stations 🏔️</h2>
          <p className="text-gray-700">
            Chill, relax, and breathe the crisp mountain air. Perfect for your soul’s getaway! ❄️🍃
          </p>
        </div>

        <div className="bg-white/90 rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
          <h2 className="text-2xl font-bold mb-2">International Destinations ✈️</h2>
          <p className="text-gray-700">
            Wander across iconic cities and hidden gems around the world. Eiffel Tower, anyone? 🗼🍕
          </p>
        </div>

        <div className="bg-white/90 rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
          <h2 className="text-2xl font-bold mb-2">Adventures 🚀</h2>
          <p className="text-gray-700">
            Skydiving, rafting, trekking – feel the rush and make every heartbeat count! 🏄‍♂️🪂
          </p>
        </div>

        <div className="bg-white/90 rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
          <h2 className="text-2xl font-bold mb-2">Pilgrimages 🛕</h2>
          <p className="text-gray-700">
            Explore sacred temples, spiritual journeys, and timeless rituals. Peace awaits 🙏🕉️
          </p>
        </div>

        <div className="bg-white/90 rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 cursor-pointer">
          <h2 className="text-2xl font-bold mb-2">Islands 🏝️</h2>
          <p className="text-gray-700">
            Discover pristine beaches, tropical escapes, and hidden paradises. Relax and unwind 🌊☀️
          </p>
        </div>

      </div>
    </div>
  );
};

export default Home;
