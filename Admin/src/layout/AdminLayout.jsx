// import AdminSidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Components/AdminSidebar.jsx";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <AdminSidebar />
      <main className=" flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
