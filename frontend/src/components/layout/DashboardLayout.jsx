import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  BriefcaseBusiness,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const { logout } = useAuth();

  const navItems = [
    {
      name: "Dashboard",
      path: "/recruiter/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Companies",
      path: "/recruiter/companies",
      icon: Building2,
    },
    {
      name: "Jobs",
      path: "/recruiter/jobs",
      icon: BriefcaseBusiness,
    },
    {
      name: "Applicants",
      path: "/recruiter/applications",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950">

      {/* Mobile Header */}

      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 p-4 md:hidden">

        <h1 className="text-xl font-bold text-white">
          Recruiter Panel
        </h1>

        <button
          onClick={() =>
            setSidebarOpen(
              !sidebarOpen
            )
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

      <div className="flex">

        {/* Sidebar */}

        <aside
          className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-slate-800 bg-slate-900 transition-transform duration-300 md:static md:translate-x-0 ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >

          <div  className="border-b border-slate-800 p-6">

            <h1 className="text-2xl font-bold text-white">
              Recruiter Panel
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Manage hiring operations
            </p>

          </div>

          <nav className="p-4">

            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() =>
                    setSidebarOpen(
                      false
                    )
                  }
                  className={({
                    isActive,
                  }) =>
                    `mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-800"
                    }`
                  }
                >
                  <Icon size={20} />

                  {item.name}
                </NavLink>
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

        {/* Mobile Overlay */}

        {sidebarOpen && (
          <div
            onClick={() =>
              setSidebarOpen(
                false
              )
            }
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
          />
        )}

        {/* Main Content */}

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;