import { Navigate, Outlet } from "react-router-dom";

export default function Protected() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
