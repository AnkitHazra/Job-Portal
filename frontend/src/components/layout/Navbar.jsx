import { BriefcaseBusiness } from "lucide-react";
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
            <BriefcaseBusiness size={20} className="text-white" />
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

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">

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
        <div className="flex items-center gap-4">

          <Link  to="/login" className="hidden text-slate-300 transition hover:text-white md:block" >
            Login
          </Link>

          <Link to="/register" className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700" >
            Get Started
          </Link>

        </div>

      </div>

    </header>
  );
}

export default Navbar;