import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  Edit,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/Authcontext";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition
     ${
       isActive
         ? "bg-purple-600 text-white"
         : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
     }`;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col">
      {/* TOP */}
      <div>
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-xl font-semibold text-purple-400">
            Admin Panel
          </h1>
          <p className="text-xs text-zinc-500">Property Management</p>
        </div>

        <nav className="p-4 space-y-2">
          
          <NavLink to="/admin/FormData" className={linkClass}>
            <ClipboardList size={18} />
            Form Responses
          </NavLink>

          <NavLink to="/admin/addproperties" className={linkClass}>
            <PlusCircle size={18} />
            Add Properties
          </NavLink>

          <NavLink to="/admin/updateproperties" className={linkClass}>
            <Edit size={18} />
            Update Properties
          </NavLink>
        </nav>
      </div>

      {/* BOTTOM LOGOUT */}
      <div className="p-4 mt-auto border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-red-400 hover:bg-red-500/10"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
