import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  User,
  Computer,
  Video,
  Wrench,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/dashboard",
    },
    { name: "Customers", icon: <Users size={18} />, path: "/customers" },
    { name: "Profile", icon: <User size={18} />, path: "/profile" },
  ];

  const resourceLinks = [
    {
      name: "Repository",
      icon: <Computer size={18} />,
      href: "https://github.com/aigle-levant/nex-dash",
    },
    {
      name: "Working",
      icon: <Wrench size={18} />,
      href: "https://your-live-working-url.com",
    },
    {
      name: "Demo Video",
      icon: <Video size={18} />,
      href: "https://drive.google.com/drive/folders/1zKqJ8jqRDMkyuxUgeUrTlrewhY-QS50X?usp=sharing",
    },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-4 py-3 bg-background border-b md:hidden font-body">
        <div className="font-bold text-xl font-main">NexDash</div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <Menu size={22} />
        </Button>
      </div>

      <div
        className={`fixed inset-0 z-50 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transform transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <div className="font-bold text-xl font-main">NexDash</div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X size={22} />
          </Button>
        </div>

        <div className="flex flex-col justify-between h-[calc(100vh-4rem)] p-4">
          <div>
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted hover:text-foreground"
                    }`
                  }
                >
                  {link.icon}
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className="mt-6 p-3 border-t">
              <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide">
                Resources
              </p>
              {resourceLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-muted"
                >
                  {link.icon}
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <ThemeToggle />
          </div>
        </div>
      </div>

      <aside className="hidden md:flex md:flex-col md:justify-between h-screen w-64 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-r p-4">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <span className="font-bold font-main text-xl">NexDash</span>
          </div>

          <nav className="space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted hover:text-foreground"
                  }`
                }
              >
                {link.icon}
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="mt-6 p-3 border-t">
            <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wide">
              Resources
            </p>
            {resourceLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-muted"
              >
                {link.icon}
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
