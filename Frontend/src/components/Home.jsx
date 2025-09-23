
import React from "react";

const Home = () => {
  return (
    // <div className="relative min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 overflow-hidden">
    <div className="relative min-h-[120vh] flex flex-col items-center justify-center p-6 overflow-hidden
                bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100">

      {/* Corner floating circles behind emojis */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-pink-200/40 rounded-full animate-pulse z-0"></div>
      <div className="absolute top-0 right-0 w-36 h-36 bg-purple-200/30 rounded-full animate-spin-slow z-0"></div>
      <div className="absolute bottom-0 right-0 w-44 h-44 bg-pink-300/20 rounded-full animate-pulse-slow z-0"></div>

      {/* Floating emojis in corners */}
      <div className="absolute top-10 left-10 text-3xl animate-pulse z-10 pointer-events-none">🌴</div>
      <div className="absolute top-12 right-12 text-3xl animate-bounce z-10 pointer-events-none">✈️</div>
      <div className="absolute bottom-10 right-10 text-3xl animate-pulse-slow z-10 pointer-events-none">🏝️</div>

      {/* Centered main content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-6xl font-extrabold mb-6 text-center text-gray-900 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)] animate-fadeIn">
          🌍 Explore the World with TravelMaster
        </h1>

        <p className="text-xl text-gray-800 mb-12 max-w-3xl text-center drop-shadow-[1px_1px_2px_rgba(0,0,0,0.2)] animate-fadeIn delay-200">
          Embark on journeys that inspire, thrill, and refresh your soul!  
          From snow-kissed hills 🏔️ to global wonders 🗺️, mystical temples 🛕 to adrenaline adventures 🚀 – we have it all!
        </p>

        {/* Hero Cards */}
        {/* Hero Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
  {[
    {
      title: "Hill Stations 🏔️",
      desc: "Chill, relax, and breathe the crisp mountain air. Perfect for your soul’s getaway! ❄️🍃",
      gradient: "from-blue-300 via-blue-200 to-white"
    },
    {
      title: "International Destinations ✈️",
      desc: "Wander across iconic cities and hidden gems around the world. Eiffel Tower, anyone? 🗼🍕",
      gradient: "from-pink-300 via-purple-200 to-indigo-200"
    },
    {
      title: "Adventures 🚀",
      desc: "Skydiving, rafting, trekking – feel the rush and make every heartbeat count! 🏄‍♂️🪂",
      gradient: "from-yellow-300 via-orange-200 to-red-200"
    },
    {
      title: "Pilgrimages 🛕",
      desc: "Explore sacred temples, spiritual journeys, and timeless rituals. Peace awaits 🙏🕉️",
      gradient: "from-green-300 via-teal-200 to-blue-100"
    },
    {
      title: "Islands 🏝️",
      desc: "Discover pristine beaches, tropical escapes, and hidden paradises. Relax and unwind 🌊☀️",
      gradient: "from-cyan-300 via-blue-200 to-indigo-100"
    }
  ].map((card, index) => (
    <div
      key={index}
      className={`bg-gradient-to-br ${card.gradient} rounded-3xl shadow-xl p-6 transform transition-all duration-500 cursor-pointer border border-white/20 backdrop-blur-sm
                 opacity-0 translate-y-10 animate-fadeInUp`}
      style={{ animationDelay: `${index * 200}ms`, animationFillMode: 'forwards' }}
    >
      <h2 className="text-2xl font-bold mb-2 text-gray-900 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.2)]">{card.title}</h2>
      <p className="text-gray-800">{card.desc}</p>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default Home;
