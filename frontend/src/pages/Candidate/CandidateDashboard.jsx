import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  FileText,
  Clock3,
  BadgeCheck,
  XCircle,
  TrendingUp,
  Briefcase,
  MapPin,
  Mail,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getMyApplications } from "../../api/applicationApi";

ChartJS.register(ArcElement, Tooltip, Legend);

function CandidateDashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getMyApplications();
        setApplications(data.applications);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const total = applications.length;
  const pending = applications.filter((app) => app.status === "pending").length;
  const shortlisted = applications.filter((app) => app.status === "shortlisted").length;
  const rejected = applications.filter((app) => app.status === "rejected").length;

  const chartData = {
    labels: ["Pending", "Shortlisted", "Rejected"],
    datasets: [
      {
        data: [pending, shortlisted, rejected],
        backgroundColor: ["#facc15", "#22c55e", "#ef4444"],
        borderWidth: 0,
        hoverBorderWidth: 3,
        hoverBorderColor: "#1e293b",
      },
    ],
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const statCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -8,
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: (width) => ({
      width: `${width}%`,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.5,
      },
    }),
  };

  const applicationItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.6 + i * 0.1,
        duration: 0.4,
      },
    }),
    hover: {
      x: 8,
      borderColor: "#3b82f6",
      backgroundColor: "rgba(30, 41, 59, 0.8)",
      transition: { duration: 0.3 },
    },
  };

  const statsCards = [
    {
      icon: FileText,
      label: "Total Applications",
      value: total,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      glowColor: "shadow-blue-500/20",
    },
    {
      icon: Clock3,
      label: "Pending Review",
      value: pending,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      glowColor: "shadow-amber-500/20",
    },
    {
      icon: BadgeCheck,
      label: "Shortlisted",
      value: shortlisted,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      glowColor: "shadow-emerald-500/20",
    },
    {
      icon: XCircle,
      label: "Rejected",
      value: rejected,
      color: "text-rose-400",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-500/20",
      glowColor: "shadow-rose-500/20",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 py-8 px-4 sm:px-6 lg:px-8 mt-10 sm:mt-0"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 48 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-1.5 rounded-full bg-gradient-to-b from-blue-400 via-indigo-400 to-purple-500"
            />
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
              >
                Dashboard
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-2 text-slate-400 flex items-center gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Track your applications and discover new opportunities
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Profile Card */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 shadow-xl shadow-slate-900/50"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={user?.profilePicture || "https://placehold.net/avatar-4.png"}
                    alt="Profile"
                    className="h-24 w-24 rounded-2xl border-2 border-blue-500/30 object-cover shadow-lg ring-4 ring-blue-500/10"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 500 }}
                    className="absolute -bottom-2 -right-2 rounded-full bg-emerald-500 p-1.5 shadow-lg ring-2 ring-slate-900"
                  >
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                </motion.div>

                <div className="flex-1">
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl font-bold text-white sm:text-3xl"
                  >
                    {user?.fullName || "Welcome back!"}
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-3 flex flex-wrap gap-4"
                  >
                    <div className="flex items-center gap-2 text-slate-400">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{user?.email}</span>
                    </div>
                    {user?.location && (
                      <div className="flex items-center gap-2 text-slate-400">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{user.location}</span>
                      </div>
                    )}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-4 flex items-center gap-3"
                  >
                    <div className="flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1.5">
                      <Briefcase className="h-4 w-4 text-blue-400" />
                      <span className="text-sm font-medium text-blue-400">
                        {total} Application{total !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Statistics Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {statsCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={statCardVariants}
                  whileHover="hover"
                  className={`rounded-2xl border ${stat.borderColor} bg-slate-900/60 backdrop-blur-sm p-6 shadow-lg ${stat.glowColor} transition-shadow`}
                >
                  <motion.div
                    className={`${stat.bgColor} w-fit rounded-xl p-3 mb-4`}
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </motion.div>
                  <h3 className="text-sm font-medium text-slate-400">{stat.label}</h3>
                  <motion.p
                    className={`mt-2 text-4xl font-bold ${stat.color}`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.15, type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Charts Section */}
          <motion.div variants={itemVariants} className="grid gap-6 lg:grid-cols-2">
            {/* Doughnut Chart */}
            <motion.div
              whileHover={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 shadow-xl shadow-slate-900/50"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Application Status</h2>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="rounded-full bg-slate-800/50 p-2"
                >
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                </motion.div>
              </div>
              <div className="mx-auto h-64 w-full max-w-xs">
                <Doughnut
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: "70%",
                    animation: {
                      animateScale: true,
                      animateRotate: true,
                      duration: 2000,
                    },
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          color: "#94a3b8",
                          padding: 20,
                          usePointStyle: true,
                          pointStyleWidth: 10,
                          font: {
                            size: 12,
                          },
                        },
                      },
                      tooltip: {
                        backgroundColor: "#1e293b",
                        borderColor: "#334155",
                        borderWidth: 1,
                        titleColor: "#f1f5f9",
                        bodyColor: "#cbd5e1",
                        padding: 12,
                        cornerRadius: 12,
                      },
                    },
                  }}
                />
              </div>
              {total === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center"
                >
                  <p className="text-sm text-slate-500">No data to display yet</p>
                  <p className="text-xs text-slate-600 mt-1">Start applying to jobs to see your statistics</p>
                </motion.div>
              )}
            </motion.div>

            {/* Progress Bars */}
            <motion.div
              whileHover={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 shadow-xl shadow-slate-900/50"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Application Progress</h2>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="rounded-full bg-slate-800/50 p-2"
                >
                  <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                </motion.div>
              </div>
              <div className="space-y-6">
                {[
                  { label: "Pending", value: pending, color: "bg-amber-400", textColor: "text-amber-400", gradient: "from-amber-400 to-yellow-500" },
                  { label: "Shortlisted", value: shortlisted, color: "bg-emerald-500", textColor: "text-emerald-400", gradient: "from-emerald-400 to-green-500" },
                  { label: "Rejected", value: rejected, color: "bg-rose-500", textColor: "text-rose-400", gradient: "from-rose-400 to-red-500" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                  >
                    <div className="mb-3 flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-400">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${item.textColor}`}>
                          {item.value}
                        </span>
                        <span className="text-xs text-slate-500">
                          {total > 0 ? `${Math.round((item.value / total) * 100)}%` : "0%"}
                        </span>
                      </div>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-800/80">
                      <motion.div
                        custom={total ? (item.value / total) * 100 : 0}
                        variants={progressBarVariants}
                        initial="hidden"
                        animate="visible"
                        className={`h-full rounded-full bg-gradient-to-r ${item.gradient} shadow-lg`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              {total > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-6 pt-6 border-t border-slate-800/50"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Success Rate</span>
                    <span className="font-semibold text-emerald-400">
                      {total > 0 ? `${Math.round((shortlisted / total) * 100)}%` : "0%"}
                    </span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Recent Applications */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 shadow-xl shadow-slate-900/50"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Applications</h2>
                {applications.length > 5 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View All
                  </motion.button>
                )}
              </div>

              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="h-8 w-8 text-blue-400" />
                  </motion.div>
                  <p className="mt-4 text-sm text-slate-400">Loading your applications...</p>
                </motion.div>
              ) : applications.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="rounded-2xl bg-slate-800/50 p-6 mb-4"
                  >
                    <Briefcase className="h-12 w-12 text-slate-600" />
                  </motion.div>
                  <h3 className="text-lg font-medium text-slate-300">No applications yet</h3>
                  <p className="mt-2 text-sm text-slate-500 text-center max-w-sm">
                    Start exploring job opportunities and submit your first application to get started.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/25"
                  >
                    Browse Jobs
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3"
                >
                  {applications.slice(0, 5).map((app, index) => (
                    <motion.div
                      key={app._id}
                      custom={index}
                      variants={applicationItemVariants}
                      whileHover="hover"
                      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-800/80 bg-slate-800/30 p-4 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          className={`rounded-xl p-3 ${
                            app.status === "shortlisted"
                              ? "bg-emerald-500/10"
                              : app.status === "rejected"
                              ? "bg-rose-500/10"
                              : "bg-amber-500/10"
                          }`}
                        >
                          <Briefcase
                            className={`h-5 w-5 ${
                              app.status === "shortlisted"
                                ? "text-emerald-400"
                                : app.status === "rejected"
                                ? "text-rose-400"
                                : "text-amber-400"
                            }`}
                          />
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-white">{app.job?.title || "Untitled Position"}</h3>
                          <p className="text-sm text-slate-400">{app.job?.company?.name || "Unknown Company"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500">
                          {new Date(app.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                            app.status === "shortlisted"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : app.status === "rejected"
                              ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              app.status === "shortlisted"
                                ? "bg-emerald-400"
                                : app.status === "rejected"
                                ? "bg-rose-400"
                                : "bg-amber-400"
                            }`}
                          />
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </motion.span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CandidateDashboard;