import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <header className="w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-xl font-semibold font-main tracking-tight">
          Nex-Dash
        </div>

        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          <li>
            <a href="#" className="hover:underline">
              How it works
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              View demo
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              View repository
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="border-slate-300 dark:border-slate-700"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          <Button variant="outline" className="font-main">
            Get Started
          </Button>

          <button
            className="md:hidden ml-2 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-slate-100 dark:bg-slate-900 border-t border-slate-300 dark:border-slate-800 px-6 py-4">
          <ul className="flex flex-col gap-3 text-sm font-medium">
            <li>
              <a href="#" className="hover:underline">
                Working of Nex-Dash
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Demo Video
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Access Repository
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
