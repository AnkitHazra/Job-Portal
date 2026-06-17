import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getRecruiterAnalytics } from "../../api/applicationApi";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  Briefcase,
  FileText,
  Clock3,
  BadgeCheck,
  XCircle,
  TrendingUp,
  Users,
  Building2,
  ArrowUpRight,
  Calendar,
  Mail,
  Eye,
  Loader2,
  Sparkles,
  Target,
  Award,
} from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

function RecruiterDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getRecruiterAnalytics();
        setAnalytics(data.analytics);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -8,
      scale: 1.03,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
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
        delay: 0.4 + i * 0.1,
        duration: 0.4,
      },
    }),
    hover: {
      x: 5,
      borderColor: "#3b82f6",
      backgroundColor: "rgba(30, 41, 59, 0.8)",
      transition: { duration: 0.2 },
    },
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mx-auto mb-6"
            >
              <Loader2 className="h-16 w-16 text-blue-400" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-slate-400"
            >
              Loading Dashboard...
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-slate-500 mt-2"
            >
              Fetching your analytics data
            </motion.p>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  if (!analytics) {
    return (
      <DashboardLayout>
        <div className="flex h-[80vh] items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              📊
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">No Data Available</h2>
            <p className="text-slate-400">Unable to load analytics data at this time.</p>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  const chartData = {
    labels: ["Pending", "Shortlisted", "Rejected"],
    datasets: [
      {
        data: [analytics.pending, analytics.shortlisted, analytics.rejected],
        backgroundColor: ["#facc15", "#22c55e", "#ef4444"],
        borderWidth: 0,
        hoverBorderWidth: 3,
        hoverBorderColor: "#1e293b",
      },
    ],
  };

  const statsCards = [
    {
      title: "Total Jobs",
      value: analytics.totalJobs,
      icon: Briefcase,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      linear: "from-blue-500/20 to-blue-600/20",
      trend: "+12%",
    },
    {
      title: "Applications",
      value: analytics.totalApplications,
      icon: FileText,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      linear: "from-purple-500/20 to-purple-600/20",
      trend: "+8%",
    },
    {
      title: "Pending",
      value: analytics.pending,
      icon: Clock3,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      linear: "from-amber-500/20 to-amber-600/20",
      trend: null,
    },
    {
      title: "Shortlisted",
      value: analytics.shortlisted,
      icon: BadgeCheck,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      linear: "from-emerald-500/20 to-emerald-600/20",
      trend: "+15%",
    },
    {
      title: "Rejected",
      value: analytics.rejected,
      icon: XCircle,
      color: "text-rose-400",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-500/20",
      linear: "from-rose-500/20 to-rose-600/20",
      trend: null,
    },
  ];

  const successRate = analytics.totalApplications > 0
    ? Math.round((analytics.shortlisted / analytics.totalApplications) * 100)
    : 0;

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="py-8 px-4 sm:px-6 lg:px-8 mt-15 sm:mt-0"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 48 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-1.5 rounded-full bg-linear-to-b from-blue-400 via-indigo-400 to-purple-500"
              />
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
                >
                  Recruiter Dashboard
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-2 text-slate-400 flex items-center gap-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  Monitor your hiring activity and manage applications
                </motion.p>
              </div>
            </div>

            {/* Quick Action */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/recruiter/job/create")}
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/25"
            >
              <Sparkles className="h-4 w-4" />
              Post New Job
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Analytics Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5"
          >
            {statsCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  custom={index}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`rounded-2xl border ${card.borderColor} bg-slate-900/60 backdrop-blur-sm p-6 shadow-lg relative overflow-hidden`}
                >
                  {/* Background linear */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-bl ${card.linear} rounded-bl-full opacity-20`} />
                  
                  <div className="relative">
                    <motion.div
                      className={`${card.bgColor} w-fit rounded-xl p-3 mb-4`}
                      whileHover={{ rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className={`h-5 w-5 ${card.color}`} />
                    </motion.div>
                    
                    <h3 className="text-sm font-medium text-slate-400 mb-1">{card.title}</h3>
                    
                    <div className="flex items-end justify-between">
                      <motion.p
                        className={`text-3xl font-bold ${card.color}`}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                      >
                        {card.value}
                      </motion.p>
                      
                      {card.trend && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          className="flex items-center gap-1 text-xs font-medium text-emerald-400"
                        >
                          <ArrowUpRight className="h-3 w-3" />
                          {card.trend}
                        </motion.span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Charts Section */}
          <motion.div variants={itemVariants} className="mt-8 grid gap-8 lg:grid-cols-2">
            {/* Doughnut Chart */}
            <motion.div
              whileHover={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Application Status</h2>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="rounded-full bg-slate-800/50 p-2"
                >
                  <Target className="h-4 w-4 text-blue-400" />
                </motion.div>
              </div>

              <div className="mx-auto h-64 w-full max-w-xs sm:max-w-sm">
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

              {analytics.totalApplications === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center"
                >
                  <p className="text-sm text-slate-500">No applications received yet</p>
                </motion.div>
              )}
            </motion.div>

            {/* Hiring Overview */}
            <motion.div
              whileHover={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Hiring Overview</h2>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="rounded-full bg-slate-800/50 p-2"
                >
                  <Award className="h-4 w-4 text-emerald-400" />
                </motion.div>
              </div>

              <div className="space-y-6">
                {[
                  { label: "Pending", value: analytics.pending, color: "from-amber-400 to-yellow-500", textColor: "text-amber-400", icon: Clock3 },
                  { label: "Shortlisted", value: analytics.shortlisted, color: "from-emerald-400 to-green-500", textColor: "text-emerald-400", icon: BadgeCheck },
                  { label: "Rejected", value: analytics.rejected, color: "from-rose-400 to-red-500", textColor: "text-rose-400", icon: XCircle },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.2 }}
                    >
                      <div className="mb-3 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Icon className={`h-4 w-4 ${item.textColor}`} />
                          <span className="text-sm font-medium text-slate-400">{item.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-semibold ${item.textColor}`}>
                            {item.value}
                          </span>
                          <span className="text-xs text-slate-500">
                            {analytics.totalApplications > 0
                              ? `${Math.round((item.value / analytics.totalApplications) * 100)}%`
                              : "0%"}
                          </span>
                        </div>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-800/80">
                        <motion.div
                          custom={analytics.totalApplications ? (item.value / analytics.totalApplications) * 100 : 0}
                          variants={progressBarVariants}
                          initial="hidden"
                          animate="visible"
                          className={`h-full rounded-full bg-linear-to-r ${item.color} shadow-lg`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Success Rate */}
              {analytics.totalApplications > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-6 pt-6 border-t border-slate-800/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-emerald-500/10 p-2">
                        <Target className="h-4 w-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Success Rate</p>
                        <p className="text-xs text-slate-500">Shortlisted vs Total</p>
                      </div>
                    </div>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.4, type: "spring" }}
                      className="text-2xl font-bold text-emerald-400"
                    >
                      {successRate}%
                    </motion.span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Recent Applications */}
          <motion.div
            variants={itemVariants}
            className="mt-8"
          >
            <motion.div
              whileHover={{ boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-500/10 p-2.5">
                    <Users className="h-5 w-5 text-blue-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">Recent Applications</h2>
                </div>
                {analytics.recentApplications?.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View All
                  </motion.button>
                )}
              </div>

              {analytics.recentApplications?.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="rounded-2xl bg-slate-800/50 p-6 mb-4"
                  >
                    <FileText className="h-12 w-12 text-slate-600" />
                  </motion.div>
                  <h3 className="text-lg font-medium text-slate-300">No applications yet</h3>
                  <p className="mt-2 text-sm text-slate-500 text-center max-w-sm">
                    Applications will appear here once candidates start applying to your job postings.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3"
                >
                  {analytics.recentApplications.map((application, index) => (
                    <motion.div
                      key={application._id}
                      custom={index}
                      variants={applicationItemVariants}
                      whileHover="hover"
                      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-800/80 bg-slate-800/30 p-4 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="relative"
                        >
                          <img
                            src={application.applicant?.profilePicture || "https://placehold.net/avatar-5.svg"}
                            alt={application.applicant?.fullName}
                            className="h-12 w-12 rounded-xl object-cover ring-2 ring-blue-500/20"
                          />
                          <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-slate-900 ${
                            application.status === "Shortlisted" ? "bg-emerald-400" :
                            application.status === "Rejected" ? "bg-rose-400" : "bg-amber-400"
                          }`} />
                        </motion.div>

                        <div>
                          <h3 className="font-semibold text-white">
                            {application.applicant?.fullName || "Unknown Applicant"}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Briefcase className="h-3.5 w-3.5 text-slate-500" />
                            <p className="text-sm text-slate-400">
                              {application.job?.title || "Untitled Position"}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="h-3.5 w-3.5 text-slate-500" />
                            <p className="text-xs text-slate-500">
                              {new Date(application.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border ${
                            application.status === "Shortlisted"
                              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                              : application.status === "Rejected"
                              ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
                              : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                          }`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            application.status === "Shortlisted" ? "bg-emerald-400" :
                            application.status === "Rejected" ? "bg-rose-400" : "bg-amber-400"
                          }`} />
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1).toLowerCase()}
                        </motion.span>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="rounded-lg bg-slate-800 p-2 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}

export default RecruiterDashboard;