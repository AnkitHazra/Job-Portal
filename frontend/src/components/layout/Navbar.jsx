import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BriefcaseBusiness,
  Sparkles,
  Menu,
  X,
  ChevronDown,
  Zap,
  Star,
  Building2,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Features", href: "#features", icon: Zap },
    { name: "Statistics", href: "#stats", icon: TrendingUp },
    { name: "Companies", href: "#companies", icon: Building2 },
  ];

  // Animation variants
  const navbarVariants = {
    top: {
      backgroundColor: "rgba(15, 23, 42, 0.6)",
      borderColor: "rgba(71, 85, 105, 0.2)",
      boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
    },
    scrolled: {
      backgroundColor: "rgba(15, 23, 42, 0.85)",
      borderColor: "rgba(71, 85, 105, 0.3)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.header
      variants={navbarVariants}
      animate={isScrolled ? "scrolled" : "top"}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl"
    >
      {/* Subtle linear Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25"
            >
              {/* Logo Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-blue-500 blur-md opacity-30 group-hover:opacity-50 transition-opacity" />
              <BriefcaseBusiness size={20} className="text-white relative z-10" />
            </motion.div>

            <div>
              <h1 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                AI Recruitment
              </h1>
              <p className="text-xs text-slate-400">
                Smart Hiring Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5 group"
                >
                  <span className="flex items-center gap-1.5">
                    <Icon size={14} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                    {link.name}
                  </span>
                  {/* Active/Hover Indicator */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full group-hover:w-3/4 transition-all duration-300"
                    layoutId="navIndicator"
                  />
                </motion.a>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                Login
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-indigo-700 transition-all relative overflow-hidden group"
              >
                {/* Button Shine Effect */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Sparkles size={16} className="relative z-10" />
                <span className="relative z-10">Get Started</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-slate-700/50 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden border-t border-slate-700/30 overflow-hidden"
            >
              <div className="py-4 space-y-1 bg-slate-900/80 backdrop-blur-xl rounded-b-2xl">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={index}
                      href={link.href}
                      variants={mobileItemVariants}
                      whileHover={{ x: 5 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                        <Icon size={16} className="text-slate-400" />
                      </div>
                      {link.name}
                    </motion.a>
                  );
                })}

                {/* Mobile Actions */}
                <div className="mt-4 px-4 space-y-2">
                  <motion.div variants={mobileItemVariants}>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full rounded-xl border border-slate-700/50 bg-white/5 px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                    >
                      Login
                    </Link>
                  </motion.div>

                  <motion.div variants={mobileItemVariants}>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 w-full rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-indigo-700 transition-all relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <Sparkles size={16} className="relative z-10" />
                      <span className="relative z-10">Get Started</span>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

export default Navbar;