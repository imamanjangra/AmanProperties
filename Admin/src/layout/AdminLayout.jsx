// import AdminSidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../Components/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      <AdminSidebar />

      {/* Right side content */}
      <main className="ml-64 flex-1 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
