import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import React, { useState } from "react";

let App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ Add login state here
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userProfile, setUserProfile] = useState(
    JSON.parse(localStorage.getItem("userProfile")) || null
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-100">
      <NavBar
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isLoggedIn={isLoggedIn}
        userProfile={userProfile}
      />

      <div className="flex flex-1 overflow-hidden">
        <SideBar isOpen={isSidebarOpen} />

        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet context={{ setIsLoggedIn, setUserProfile }} />
        </main>
      </div>
    </div>
  );
};

export default App;
