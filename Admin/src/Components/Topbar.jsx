import { Bell, Search, Menu } from "lucide-react";

export default function Topbar({ toggle }) {
  return (
    <div className="flex items-center justify-between bg-gray-950 border-b border-gray-800 px-4 md:px-6 py-4 sticky top-0 z-10">
      
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* 🔥 Mobile Menu Button */}
        <button
          onClick={toggle}
          className="p-2 rounded-lg hover:bg-gray-800 md:hidden"
        >
          <Menu size={20} />
        </button>

        {/* 🔍 Search */}
        
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* <button className="p-2 rounded-lg hover:bg-gray-800">
          <Bell size={18} />
        </button> */}

        <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-sm">
          A
        </div>
      </div>
    </div>
  );
}