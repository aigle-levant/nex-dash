import { Navigate, Outlet } from "react-router-dom";
import SideNavbar from "@/components/common/SideNavbar";

export default function Protected() {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <SideNavbar />
      <main className="flex-1 mt-30 md:mt-0 lg:mt-0 p-4 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
