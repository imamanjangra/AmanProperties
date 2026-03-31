import {
  Menu,
  LayoutDashboard,
  ClipboardList,
  Users,
  Home,
  LogOut,
  BadgeCheck,
  FileEdit,
  Building2,
} from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: ClipboardList, label: "Form Responses", path: "/admin/formdata" },
  { icon: Home, label: "Properties", path: "/admin/properties" },
  { icon: BadgeCheck, label: "Properties Verification", path: "/admin/verify-properties" },
  { icon: Building2, label: "Manage Properties", path: "/admin/ManageProperties" },
  { icon: FileEdit, label: "Update Requests", path: "/admin/update-requests" },
  { icon: Users, label: "Users", path: "/admin/users" },
];

export default function Sidebar({ isOpen, toggle }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 🔥 Auto close on mobile after route change
  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      toggle();
    }
  };

  return (
    <>
      {/* 🔥 BACKDROP (mobile only) */}
      {isOpen && (
        <div
          onClick={toggle}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* 🔥 SIDEBAR */}
      <div
        className={`
          fixed top-0 left-0 h-screen z-50 bg-gray-950 border-r border-gray-800 text-gray-300 flex flex-col justify-between transition-all duration-300
          
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
          
          w-64
          md:relative
        `}
      >
        {/* TOP */}
        <div>
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h1 className="text-lg font-semibold text-white">
              Aman Admin
            </h1>

            <button
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-gray-800 md:hidden"
            >
              <Menu size={20} />
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-2 px-2">
            {menuItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={<item.icon size={20} />}
                label={item.label}
                path={item.path}
                onClick={handleNavClick}
              />
            ))}
          </nav>
        </div>

        {/* LOGOUT */}
        <div className="p-3 border-t border-gray-800">
          <div
            onClick={handleLogout}
            className="flex items-center gap-4 px-3 py-3 rounded-xl hover:bg-red-900/30 cursor-pointer transition text-red-400"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </div>
        </div>
      </div>
    </>
  );
}

function SidebarItem({ icon, label, path, onClick }) {
  return (
    <NavLink
      to={path}
      end={path === "/admin"}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-4 px-3 py-3 rounded-xl transition ${
          isActive
            ? "bg-gray-800 text-white"
            : "hover:bg-gray-800 text-gray-400"
        }`
      }
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </NavLink>
  );
}