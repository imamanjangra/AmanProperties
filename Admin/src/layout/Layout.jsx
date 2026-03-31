import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      
      {/* SIDEBAR (fixed already in your Sidebar.jsx) */}
      <Sidebar isOpen={isOpen} toggle={toggle} />

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1 w-full ">
        
        {/* TOPBAR (fixed height) */}
        <Topbar toggle={toggle} />

        {/* 🔥 SCROLLABLE CONTENT ONLY */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>

      </div>
    </div>
  );
}