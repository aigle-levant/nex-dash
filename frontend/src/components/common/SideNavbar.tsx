import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-800 text-white p-4">
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/customers"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          Customers
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "font-bold" : "")}
        >
          Profile
        </NavLink>
      </nav>
    </aside>
  );
}
