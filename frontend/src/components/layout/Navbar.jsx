import { BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/40 backdrop-blur-lg">

      <div className="mx-auto max-w-7xl px-4 md:px-6">

        <div className="flex items-center justify-between py-4">

          {/* Logo */}

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
              <BriefcaseBusiness
                size={20}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="text-lg font-bold text-white">
                AI Recruitment
              </h1>

              <p className="text-xs text-slate-400">
                Smart Hiring Platform
              </p>
            </div>

          </div>

          {/* Desktop Nav */}

          <nav className="hidden md:flex items-center gap-8">

            <a
              href="#features"
              className="text-slate-300 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#stats"
              className="text-slate-300 transition hover:text-white"
            >
              Statistics
            </a>

            <a
              href="#companies"
              className="text-slate-300 transition hover:text-white"
            >
              Companies
            </a>

          </nav>

          {/* Actions */}

          <div className="flex items-center gap-3">

            <Link
              to="/login"
              className="hidden md:block text-slate-300 transition hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
            >
              Get Started
            </Link>

          </div>

        </div>

        {/* Mobile Nav */}

        <div className="flex justify-center gap-6 border-t border-slate-800 py-3 md:hidden">

          <a
            href="#features"
            className="text-sm text-slate-300"
          >
            Features
          </a>

          <a
            href="#stats"
            className="text-sm text-slate-300"
          >
            Stats
          </a>

          <a
            href="#companies"
            className="text-sm text-slate-300"
          >
            Companies
          </a>

          <Link
            to="/login"
            className="text-sm text-slate-300"
          >
            Login
          </Link>

        </div>

      </div>

    </header>
  );
}

export default Navbar;