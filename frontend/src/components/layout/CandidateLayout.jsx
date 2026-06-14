import { useAuth } from "../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  FileText,
  User,
  LogOut
} from "lucide-react";


function CandidateLayout({ children }) {
  const location = useLocation();

  const { logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const navItems = [
    {
      name: "Dashboard",
      path: "/candidate/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Jobs",
      path: "/jobs",
      icon: BriefcaseBusiness,
    },
    {
      name: "Applications",
      path: "/candidate/applications",
      icon: FileText,
    },
    {
      name: "Profile",
      path: "/candidate/profile",
      icon: User,
    },
  ];




  return (
  <div className="min-h-screen overflow-x-hidden bg-slate-950">

    {/* Mobile Header */}

   <div className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between border-b border-slate-800/50 bg-slate-950/60 backdrop-blur-xl p-4 md:hidden">

      <h1 className="text-xl font-bold text-white">
        AI Recruitment
      </h1>

      <button
        onClick={() =>
          setSidebarOpen(!sidebarOpen)
        }
        className="text-white"
      >
        {sidebarOpen ? (
          <X size={24} />
        ) : (
          <Menu size={24} />
        )}
      </button>

    </div>

    <div className="flex ">

      {/* Sidebar */}

      <aside
  className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-slate-800 bg-slate-900 transition-transform duration-300 md:static  md:translate-x-0 ${
    sidebarOpen
      ? "translate-x-0"
      : "-translate-x-full"
  }`}
>

        <div className="border-b border-slate-800 p-6">

          <h1 className="text-2xl font-bold text-white">
            AI Recruitment
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Candidate Portal
          </p>

        </div>

        <nav className="p-4">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() =>
                  setSidebarOpen(false)
                }
                className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  location.pathname ===
                  item.path
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}

        </nav>

        <div className="absolute bottom-6 left-4">

          <button
            onClick={logout}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-300 hover:bg-slate-800"
          >
            <LogOut size={20} />
            Logout
          </button>

        </div>

      </aside>

      {/* Overlay */}

      {sidebarOpen && (
        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/50 md:hidden "
        />
      )}

      {/* Content */}

      <main className="flex-1 overflow-hidden ">
        {children}
      </main>

    </div>

  </div>
);
}

export default CandidateLayout;