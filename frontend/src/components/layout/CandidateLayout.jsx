import { useAuth } from "../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  FileText,
  User,
  LogOut,
  Sparkles,
  ChevronRight,
  Bell,
  Search,
} from "lucide-react";

function CandidateLayout({ children }) {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      path: "/candidate/dashboard",
      icon: LayoutDashboard,
      description: "Overview & Analytics",
    },
    {
      name: "Jobs",
      path: "/jobs",
      icon: BriefcaseBusiness,
      description: "Browse Opportunities",
    },
    {
      name: "Applications",
      path: "/candidate/applications",
      icon: FileText,
      description: "Track Applications",
    },
    {
      name: "Profile",
      path: "/candidate/profile",
      icon: User,
      description: "Manage Profile",
    },
    {
      name: "ATS Score",
      path: "/candidate/ats-score",
      icon: FileText,
      description: "Resume Analysis",
    },
  ];

  // Animation variants
  const sidebarVariants = {
    hidden: {
      x: "-100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.08,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const mobileHeaderVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Mobile Header */}
      <motion.div
        variants={mobileHeaderVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-60 flex items-center justify-between border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl p-4 md:hidden"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="h-8 w-8 rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center"
          >
            <Sparkles className="h-4 w-4 text-white" />
          </motion.div>
          <h1 className="text-xl font-bold text-white">Hirevity</h1>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative text-slate-400 hover:text-white transition-colors"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-blue-500" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block fixed left-0 top-0 z-50 h-screen w-72 border-r border-slate-800/80 bg-slate-900/80 backdrop-blur-xl">
          <div className="flex flex-col h-full">
            {/* Logo Section */}
            <div className="border-b border-slate-800/50 p-6">
              <div className="flex items-center gap-3 mb-1">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="h-10 w-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25"
                >
                  <Sparkles className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold text-white">Hirevity</h1>
                  <p className="text-xs text-slate-400">Ai-Powered Candidate Portal</p>
                </div>
              </div>
            </div>

            {/* User Info */}
            {user && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mx-4 mt-4 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.profilePicture || "https://placehold.net/avatar-4.png"}
                    alt={user.fullName}
                    className="h-10 w-10 rounded-xl object-cover ring-2 ring-blue-500/30"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {user.fullName || "Candidate"}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <nav className="flex-1 p-4 mt-2">
              <p className="px-4 mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Main Menu
              </p>
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <motion.div
                    key={item.path}
                    custom={index}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`group relative mb-1.5 flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${isActive
                          ? "bg-linear-to-r from-blue-500/20 to-indigo-500/20 text-white border border-blue-500/30"
                          : "text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent"
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-linear-to-b from-blue-400 to-indigo-500"
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                      <div
                        className={`p-1.5 rounded-lg transition-all ${isActive
                            ? "bg-blue-500/20"
                            : "bg-slate-800/50 group-hover:bg-slate-700/50"
                          }`}
                      >
                        <Icon
                          size={18}
                          className={isActive ? "text-blue-400" : "text-slate-400 group-hover:text-white"}
                        />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-medium">{item.name}</span>
                        <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                      </div>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <ChevronRight className="h-4 w-4 text-blue-400" />
                        </motion.div>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-slate-800/50">
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={logout}
                className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400 hover:text-red-400 transition-all group"
              >
                <div className="p-1.5 rounded-lg bg-slate-800/50 group-hover:bg-red-500/10 transition-all">
                  <LogOut size={18} />
                </div>
                <span className="text-sm font-medium">Logout</span>
              </motion.button>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Overlay */}
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              />

              {/* Sidebar */}
              <motion.aside
                variants={sidebarVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="fixed left-0 top-0 z-50 h-screen w-72 border-r border-slate-800/80 bg-slate-900/95 backdrop-blur-xl md:hidden"
              >
                <div className="flex flex-col h-full">
                  {/* Logo Section */}
                  <div className="border-b border-slate-800/50 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="h-10 w-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25"
                        >
                          <Sparkles className="h-5 w-5 text-white" />
                        </motion.div>
                        <div>
                          <h1 className="text-xl font-bold text-white">AI Recruitment</h1>
                          <p className="text-xs text-slate-400">Candidate Portal</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSidebarOpen(false)}
                        className="text-slate-400 hover:text-white"
                      >
                        <X size={20} />
                      </motion.button>
                    </div>
                  </div>

                  {/* User Info */}
                  {user && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mx-4 mt-4 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={user.profilePicture || "https://placehold.net/avatar-4.png"}
                          alt={user.fullName}
                          className="h-10 w-10 rounded-xl object-cover ring-2 ring-blue-500/30"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {user.fullName || "Candidate"}
                          </p>
                          <p className="text-xs text-slate-400 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation */}
                  <nav className="flex-1 p-4 mt-2">
                    <p className="px-4 mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Main Menu
                    </p>
                    {navItems.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;

                      return (
                        <motion.div
                          key={item.path}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + index * 0.08 }}
                        >
                          <Link
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className={`group relative mb-1.5 flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${isActive
                                ? "bg-linear-to-r from-blue-500/20 to-indigo-500/20 text-white border border-blue-500/30"
                                : "text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent"
                              }`}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="activeTabMobile"
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-linear-to-b from-blue-400 to-indigo-500"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            )}
                            <div
                              className={`p-1.5 rounded-lg transition-all ${isActive
                                  ? "bg-blue-500/20"
                                  : "bg-slate-800/50 group-hover:bg-slate-700/50"
                                }`}
                            >
                              <Icon
                                size={18}
                                className={isActive ? "text-blue-400" : "text-slate-400 group-hover:text-white"}
                              />
                            </div>
                            <div className="flex-1">
                              <span className="text-sm font-medium">{item.name}</span>
                              <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                            </div>
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                              >
                                <ChevronRight className="h-4 w-4 text-blue-400" />
                              </motion.div>
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>

                  {/* Logout Button */}
                  <div className="p-4 border-t border-slate-800/50">
                    <motion.button
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSidebarOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400 hover:text-red-400 transition-all group"
                    >
                      <div className="p-1.5 rounded-lg bg-slate-800/50 group-hover:bg-red-500/10 transition-all">
                        <LogOut size={18} />
                      </div>
                      <span className="text-sm font-medium">Logout</span>
                    </motion.button>
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden md:ml-72 pt-16 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default CandidateLayout;