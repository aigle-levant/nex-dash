import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 border-t border-slate-300 dark:border-slate-800">
      <div className="text-center py-8 px-4 border-b border-slate-300 dark:border-slate-700">
        <p className="font-main font-medium text-2xl md:text-3xl">
          (if coffee) productivity += 400;
        </p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between px-6 py-10 gap-8">
        <div className="flex flex-col items-start gap-4">
          <p className="font-main font-bold text-3xl">Nex-Dash | Aigle</p>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href="https://www.linkedin.com/in/prajanya-subramanian"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/aigle-levant"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://x.com/aiglelevant"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              X (Twitter)
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-col sm:flex-row gap-10 md:gap-16">
          {/* Resources */}
          <div>
            <p className="font-heading font-bold mb-3 text-xl">Resources</p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#" className="hover:underline">
                How it works
              </a>
              <a
                href="https://github.com/aigle-levant/nex-dash"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                View Repository
              </a>
              <a href="#" className="hover:underline">
                View Demo
              </a>
            </div>
          </div>

          {/* Get Started */}
          <div>
            <p className="font-heading font-bold mb-3 text-xl">Get Started</p>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/signup" className="hover:underline">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-300 dark:border-slate-800 py-4 text-center text-sm font-body">
        <p>
          © {new Date().getFullYear()} Prajanya Subramanian. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
