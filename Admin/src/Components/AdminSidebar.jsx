import { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { PlusCircle, Edit, ClipboardList, LogOut, PanelLeftOpen, PanelLeftClose, CircleX } from "lucide-react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function AdminSidebar({ children }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Collapse state
  const [isHide, setIsHide] = useState(() => localStorage.getItem("admin-sidebar-hide") === "true");
 

  const toggleSidebar = () => {
    setIsHide(prev => {
      localStorage.setItem("admin-sidebar-hide", !prev);
      return !prev;
    });
  };

  useEffect(() => {
    if (window.innerWidth < 768) setIsHide(false); // auto-expand on mobile
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;


  const handleLinkClick = () => {
    if (window.innerWidth < 768) setIsHide(false);
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition
     ${isActive ? "bg-purple-600 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`;

  return (
    <div className="flex  bg-zinc-950 min-h-0 text-zinc-100">
      {/* Sidebar */}
      {isHide ? (
        <div className="w-64 h-screen   flex flex-col fixed md:static top-0 left-0 z-50 border-r border-zinc-800 bg-zinc-950">
          <div className="h-14 flex items-center justify-between px-6 border-b border-zinc-800">
            <h2 className="text-lg font-semibold text-purple-400">Admin Panel</h2>
            <button onClick={toggleSidebar}>
              <PanelLeftClose className="text-white" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-3">
            <NavLink to="/admin/FormData" onClick={handleLinkClick} className={linkClass}>
              <ClipboardList size={18} /> Form Responses
            </NavLink>
            <NavLink to="/admin/addproperties" onClick={handleLinkClick} className={linkClass}>
              <PlusCircle size={18} /> Add Properties
            </NavLink>
            <NavLink to="/admin/updateproperties" onClick={handleLinkClick} className={linkClass}>
              <Edit size={18} /> Update Properties
            </NavLink>
          </nav>

          {/* Admin Info */}
           {/* Logout Button */}
        <div className="p-4 border-t border-zinc-800 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 transition"
          >
            <LogOut size={16} />
            
          </button>
        </div>
        </div>
      ) : (
        <div className="w-16 lg:w-20  flex flex-col border-r border-zinc-800 bg-zinc-950">
          <div className="h-14 flex items-center justify-center border-b border-zinc-800">
            <button onClick={toggleSidebar} className="text-white">
              <PanelLeftOpen />
            </button>
          </div>

          <nav className="flex-1 px-1 py-2 space-y-1 lg:px-4 lg:py-6 lg:space-y-3">
            <NavLink to="/admin/FormData" onClick={handleLinkClick} className={linkClass}>
              <ClipboardList size={18} />
            </NavLink>
            <NavLink to="/admin/addproperties" onClick={handleLinkClick} className={linkClass}>
              <PlusCircle size={18} />
            </NavLink>
            <NavLink to="/admin/updateproperties" onClick={handleLinkClick} className={linkClass}>
              <Edit size={18} />
            </NavLink>
          </nav>

          {/* Admin Info */}
         
             {/* Logout Button */}
        <div className="p-4 border-t border-zinc-800 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md bg-red-600 hover:bg-red-700 transition"
          >
            <LogOut size={16} />
            
          </button>
        </div>
          </div>
       
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6 ">{children}</main>
    </div>
  );
}
