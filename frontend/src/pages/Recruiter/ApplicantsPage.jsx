import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  getJobApplicants,
  updateApplicationStatus,
} from "../../api/applicationApi";
import {
  Users,
  UserCheck,
  UserX,
  Clock3,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  FileText,
  Download,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Eye,
  Loader2,
  Sparkles,
  TrendingUp,
  ArrowLeft,
  Search,
  Filter,
  ChevronDown,
  Calendar,
  GraduationCap,
  Award,
  MoreHorizontal,
  MessageSquare,
  Star,
  Ban,
} from "lucide-react";

function ApplicantsPage() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const fetchApplicants = async () => {
    try {
      const data = await getJobApplicants(jobId);
      setApplications(data.applications);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleStatusChange = async (applicationId, status) => {
    setUpdatingId(applicationId);
    try {
      await updateApplicationStatus(applicationId, status);
      fetchApplicants();
    } catch (error) {
      console.log(error);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "shortlisted":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "rejected":
        return "bg-rose-500/20 text-rose-400 border-rose-500/30";
      case "reviewed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "shortlisted":
        return <CheckCircle2 className="h-3.5 w-3.5" />;
      case "rejected":
        return <XCircle className="h-3.5 w-3.5" />;
      case "reviewed":
        return <Eye className="h-3.5 w-3.5" />;
      default:
        return <Clock3 className="h-3.5 w-3.5" />;
    }
  };

  const filteredApplications = applications
    .filter((app) => {
      const matchesSearch =
        app.applicant?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.applicant?.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || app.status?.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });

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
        duration: 0.5,
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
        delay: 0.3 + i * 0.1,
        duration: 0.4,
      },
    }),
    hover: {
      y: -3,
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.08,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
    hover: {
      backgroundColor: "rgba(30, 41, 59, 0.8)",
      transition: { duration: 0.2 },
    },
  };

  const statsData = [
    {
      label: "Total Applicants",
      value: applications.length,
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Pending",
      value: applications.filter((a) => a.status === "pending").length,
      icon: Clock3,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
    },
    {
      label: "Shortlisted",
      value: applications.filter((a) => a.status === "shortlisted").length,
      icon: UserCheck,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Rejected",
      value: applications.filter((a) => a.status === "rejected").length,
      icon: UserX,
      color: "text-rose-400",
      bgColor: "bg-rose-500/10",
    },
  ];

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
              <motion.button
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.history.back()}
                className="rounded-xl border border-slate-700/80 bg-slate-900/60 backdrop-blur-sm p-2.5 text-slate-400 hover:text-white hover:border-slate-600 transition-all"
              >
                <ArrowLeft className="h-5 w-5" />
              </motion.button>
              <div className="flex items-center gap-3">
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
                    Applicants
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-2 text-slate-400 flex items-center gap-2"
                  >
                    <TrendingUp className="h-4 w-4" />
                    Review and manage candidates for this position
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Job Title Badge */}
            {applications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-800/50 border border-slate-700/50 px-4 py-2"
              >
                <Briefcase className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-slate-300">
                  {applications[0]?.job?.title || "Job Position"}
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Statistics Cards */}
          {!loading && applications.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {statsData.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="rounded-xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-4 shadow-lg"
                  >
                    <div className={`${stat.bgColor} w-fit rounded-lg p-2 mb-2`}>
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                    </div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Search and Filters */}
          {!loading && applications.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mb-6 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none rounded-xl border border-slate-700/80 bg-slate-800/50 pl-4 pr-10 py-3 text-sm text-white transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              {(searchTerm || statusFilter) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 pt-3 border-t border-slate-800/50"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">
                      {filteredApplications.length} applicant{filteredApplications.length !== 1 ? "s" : ""} found
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSearchTerm("");
                        setStatusFilter("");
                      }}
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Clear filters
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Content */}
          {loading ? (
            <motion.div variants={itemVariants} className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                  className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6"
                >
                  <div className="animate-pulse flex items-center gap-4">
                    <div className="h-12 w-12 bg-slate-800 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-800 rounded-full w-1/3" />
                      <div className="h-3 bg-slate-800 rounded-full w-1/4" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-8 w-20 bg-slate-800 rounded-lg" />
                      <div className="h-8 w-20 bg-slate-800 rounded-lg" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : applications.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center justify-center py-20"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="rounded-2xl bg-slate-800/50 p-8 mb-6"
              >
                <Users className="h-16 w-16 text-slate-600" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2">No Applicants Yet</h3>
              <p className="text-slate-400 text-center max-w-md">
                No one has applied to this job posting yet. Check back later.
              </p>
            </motion.div>
          ) : (
            <>
              {/* Mobile Cards */}
              <motion.div
                variants={itemVariants}
                className="space-y-4 md:hidden"
              >
                <AnimatePresence mode="popLayout">
                  {filteredApplications.map((application, index) => (
                    <motion.div
                      key={application._id}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      whileHover="hover"
                      className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-5 shadow-lg"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="relative"
                          >
                            <img
                              src={
                                application.applicant?.profilePicture ||
                                "https://placehold.net/avatar-5.svg"
                              }
                              alt={application.applicant?.fullName}
                              className="h-12 w-12 rounded-xl object-cover ring-2 ring-blue-500/20"
                            />
                            <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-slate-900 ${
                              application.status === "shortlisted" ? "bg-emerald-400" :
                              application.status === "rejected" ? "bg-rose-400" : "bg-amber-400"
                            }`} />
                          </motion.div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-white truncate">
                              {application.applicant?.fullName || "Unknown"}
                            </h3>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Mail className="h-3 w-3 text-slate-500 shrink-0" />
                              <p className="text-xs text-slate-400 truncate">
                                {application.applicant?.email || "No email"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border shrink-0 ${getStatusColor(
                            application.status
                          )}`}
                        >
                          {getStatusIcon(application.status)}
                          {application.status?.charAt(0).toUpperCase() + application.status?.slice(1) || "Pending"}
                        </motion.span>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/50">
                        {application.applicant?.resumeUrl ? (
                          <motion.a
                            href={application.applicant.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-2 text-xs font-medium text-blue-400 hover:bg-blue-500/20 transition-all"
                          >
                            <Download className="h-3.5 w-3.5" />
                            Resume
                          </motion.a>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/50 px-3 py-2 text-xs text-slate-500">
                            <FileText className="h-3.5 w-3.5" />
                            No Resume
                          </span>
                        )}

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleStatusChange(application._id, "shortlisted")}
                          disabled={updatingId === application._id || application.status === "shortlisted"}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {updatingId === application._id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Star className="h-3.5 w-3.5" />
                          )}
                          Shortlist
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleStatusChange(application._id, "rejected")}
                          disabled={updatingId === application._id || application.status === "rejected"}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {updatingId === application._id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Ban className="h-3.5 w-3.5" />
                          )}
                          Reject
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Desktop Table */}
              <motion.div
                variants={itemVariants}
                className="hidden md:block overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm shadow-xl"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800/80 bg-slate-900/80">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Candidate
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Contact Info
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Resume
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence mode="popLayout">
                        {filteredApplications.map((application, index) => (
                          <motion.tr
                            key={application._id}
                            custom={index}
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                            whileHover="hover"
                            className="border-b border-slate-800/50 transition-colors"
                          >
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-3">
                                <motion.div
                                  whileHover={{ scale: 1.1 }}
                                  className="relative"
                                >
                                  <img
                                    src={
                                      application.applicant?.profilePicture ||
                                      "https://placehold.net/avatar-5.svg"
                                    }
                                    alt={application.applicant?.fullName}
                                    className="h-10 w-10 rounded-xl object-cover ring-2 ring-blue-500/20"
                                  />
                                  <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-slate-900 ${
                                    application.status === "shortlisted" ? "bg-emerald-400" :
                                    application.status === "rejected" ? "bg-rose-400" : "bg-amber-400"
                                  }`} />
                                </motion.div>
                                <div>
                                  <p className="font-semibold text-white">
                                    {application.applicant?.fullName || "Unknown"}
                                  </p>
                                  <div className="flex items-center gap-1 mt-0.5">
                                    <Mail className="h-3 w-3 text-slate-500" />
                                    <p className="text-xs text-slate-400">
                                      {application.applicant?.email || "No email"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <div className="space-y-1">
                                {application.applicant?.phone && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-3.5 w-3.5 text-slate-500" />
                                    <span className="text-slate-300">
                                      {application.applicant.phone}
                                    </span>
                                  </div>
                                )}
                                {application.applicant?.location && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-3.5 w-3.5 text-slate-500" />
                                    <span className="text-slate-300">
                                      {application.applicant.location}
                                    </span>
                                  </div>
                                )}
                                {!application.applicant?.phone && !application.applicant?.location && (
                                  <span className="text-sm text-slate-500">No additional info</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <motion.span
                                whileHover={{ scale: 1.05 }}
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border ${getStatusColor(
                                  application.status
                                )}`}
                              >
                                {getStatusIcon(application.status)}
                                {application.status?.charAt(0).toUpperCase() + application.status?.slice(1) || "Pending"}
                              </motion.span>
                            </td>
                            <td className="px-6 py-5">
                              {application.applicant?.resumeUrl ? (
                                <motion.a
                                  href={application.applicant.resumeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-2 text-xs font-medium text-blue-400 hover:bg-blue-500/20 transition-all"
                                >
                                  <Download className="h-3.5 w-3.5" />
                                  View Resume
                                </motion.a>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                                  <FileText className="h-3.5 w-3.5" />
                                  No Resume
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-5 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleStatusChange(application._id, "shortlisted")}
                                  disabled={updatingId === application._id || application.status === "shortlisted"}
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 text-xs font-medium text-emerald-400 hover:bg-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {updatingId === application._id ? (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                  ) : (
                                    <Star className="h-3.5 w-3.5" />
                                  )}
                                  Shortlist
                                </motion.button>

                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleStatusChange(application._id, "rejected")}
                                  disabled={updatingId === application._id || application.status === "rejected"}
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {updatingId === application._id ? (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                  ) : (
                                    <Ban className="h-3.5 w-3.5" />
                                  )}
                                  Reject
                                </motion.button>
                              </div>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}

export default ApplicantsPage;