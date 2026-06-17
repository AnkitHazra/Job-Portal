import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getRecruiterJobs, deleteJob } from "../../api/jobApi";
import {
  Briefcase,
  Building2,
  MapPin,
  IndianRupee,
  Clock,
  Plus,
  Pencil,
  Trash2,
  Users,
  Search,
  Filter,
  ChevronDown,
  ArrowUpDown,
  Eye,
  MoreHorizontal,
  Loader2,
  Sparkles,
  TrendingUp,
  Calendar,
  Tag,
} from "lucide-react";

function JobsPage() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const fetchJobs = async () => {
    try {
      const data = await getRecruiterJobs();
      setJobs(data.jobs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDeleteJob = async (jobId) => {
    setDeletingId(jobId);
    try {
      await deleteJob(jobId);
      setJobs(jobs.filter((job) => job._id !== jobId));
      setShowDeleteConfirm(null);
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !typeFilter || job.jobType === typeFilter;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "salary") return (b.salary || 0) - (a.salary || 0);
      return 0;
    });

  const jobTypes = [...new Set(jobs.map((job) => job.jobType).filter(Boolean))];

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
      x: 5,
      transition: { duration: 0.2 },
    },
  };

  const mobileCardVariants = {
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
                  Job Listings
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-2 text-slate-400 flex items-center gap-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  Manage and monitor your job postings
                </motion.p>
              </div>
            </div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/recruiter/job/create")}
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-indigo-700 transition-all"
            >
              <Plus className="h-4 w-4" />
              Create Job
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Search and Filters */}
          {!loading && jobs.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mb-6 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search jobs by title, company, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="relative">
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="appearance-none rounded-xl border border-slate-700/80 bg-slate-800/50 pl-4 pr-10 py-3 text-sm text-white transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                    >
                      <option value="">All Types</option>
                      {jobTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none rounded-xl border border-slate-700/80 bg-slate-800/50 pl-4 pr-10 py-3 text-sm text-white transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="title">Job Title</option>
                      <option value="salary">Salary (High-Low)</option>
                    </select>
                    <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              {(searchTerm || typeFilter) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 pt-3 border-t border-slate-800/50"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">
                      {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSearchTerm("");
                        setTypeFilter("");
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
              {[1, 2, 3, 4, 5].map((i) => (
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
          ) : jobs.length === 0 ? (
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
                <Briefcase className="h-16 w-16 text-slate-600" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2">No Jobs Posted Yet</h3>
              <p className="text-slate-400 text-center max-w-md mb-6">
                Start hiring by creating your first job posting. Reach out to talented candidates and build your team.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/recruiter/job/create")}
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/25"
              >
                <Plus className="h-4 w-4" />
                Create Your First Job
              </motion.button>
            </motion.div>
          ) : filteredJobs.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center justify-center py-20"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="rounded-2xl bg-slate-800/50 p-8 mb-6"
              >
                <Search className="h-16 w-16 text-slate-600" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2">No Results Found</h3>
              <p className="text-slate-400 text-center max-w-md mb-6">
                No jobs match your current filters. Try adjusting your search criteria.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm("");
                  setTypeFilter("");
                }}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Clear all filters
              </motion.button>
            </motion.div>
          ) : (
            <>
              {/* Desktop Table */}
              <motion.div
                variants={itemVariants}
                className="hidden md:block overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm shadow-xl"
              >
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800/80 bg-slate-900/80">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          Job Title
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          Company
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Location
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <IndianRupee className="h-4 w-4" />
                          Salary
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4" />
                          Type
                        </div>
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence mode="popLayout">
                      {filteredJobs.map((job, index) => (
                        <motion.tr
                          key={job._id}
                          custom={index}
                          variants={rowVariants}
                          initial="hidden"
                          animate="visible"
                          exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                          whileHover="hover"
                          className="border-b border-slate-800/50 transition-colors group"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-xl bg-linear-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                                <Briefcase className="h-5 w-5 text-blue-400" />
                              </div>
                              <div>
                                <p className="font-semibold text-white">{job.title}</p>
                                <p className="text-xs text-slate-500 mt-0.5">
                                  {new Date(job.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center">
                                <Building2 className="h-4 w-4 text-slate-400" />
                              </div>
                              <p className="text-slate-300">{job.company?.name || "N/A"}</p>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-slate-500" />
                              <p className="text-slate-300">{job.location}</p>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                              <IndianRupee className="h-4 w-4 text-slate-500" />
                              <p className="text-slate-300 font-mono">₹{job.salary?.toLocaleString() || "N/A"}</p>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 text-xs font-medium text-blue-400"
                            >
                              <Clock className="h-3 w-3" />
                              {job.jobType || "N/A"}
                            </motion.span>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Link
                                  to={`/recruiter/jobs/${job._id}/applicants`}
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-2 text-xs font-medium text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition-all"
                                >
                                  <Users className="h-3.5 w-3.5" />
                                  Applicants
                                </Link>
                              </motion.div>
                              
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Link
                                  to={`/recruiter/job/edit/${job._id}`}
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2 text-xs font-medium text-amber-400 hover:bg-amber-500/20 hover:text-amber-300 transition-all"
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                  Edit
                                </Link>
                              </motion.div>
                              
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <button
                                  onClick={() => setShowDeleteConfirm(job._id)}
                                  disabled={deletingId === job._id}
                                  className="inline-flex items-center gap-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {deletingId === job._id ? (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-3.5 w-3.5" />
                                  )}
                                  Delete
                                </button>
                              </motion.div>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </motion.div>

              {/* Mobile Cards */}
              <motion.div
                variants={itemVariants}
                className="space-y-4 md:hidden"
              >
                <AnimatePresence mode="popLayout">
                  {filteredJobs.map((job, index) => (
                    <motion.div
                      key={job._id}
                      custom={index}
                      variants={mobileCardVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                      whileHover="hover"
                      className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-5 shadow-lg"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-xl bg-linear-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                            <Briefcase className="h-6 w-6 text-blue-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Building2 className="h-4 w-4 text-slate-500" />
                              <p className="text-sm text-slate-400">{job.company?.name || "N/A"}</p>
                            </div>
                          </div>
                        </div>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 text-xs font-medium text-blue-400"
                        >
                          {job.jobType || "N/A"}
                        </motion.span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-slate-500" />
                          <span className="text-slate-300">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <IndianRupee className="h-4 w-4 text-slate-500" />
                          <span className="text-slate-300 font-mono">₹{job.salary?.toLocaleString() || "N/A"}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-4 border-t border-slate-800/50">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                          <Link
                            to={`/recruiter/jobs/${job._id}/applicants`}
                            className="flex items-center justify-center gap-2 rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-2.5 text-xs font-medium text-blue-400 hover:bg-blue-500/20 transition-all"
                          >
                            <Users className="h-3.5 w-3.5" />
                            Applicants
                          </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                          <Link
                            to={`/recruiter/job/edit/${job._id}`}
                            className="flex items-center justify-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2.5 text-xs font-medium text-amber-400 hover:bg-amber-500/20 transition-all"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                          <button
                            onClick={() => setShowDeleteConfirm(job._id)}
                            disabled={deletingId === job._id}
                            className="w-full flex items-center justify-center gap-2 rounded-lg bg-rose-500/10 border border-rose-500/20 px-3 py-2.5 text-xs font-medium text-rose-400 hover:bg-rose-500/20 transition-all disabled:opacity-50"
                          >
                            {deletingId === job._id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}
                            Delete
                          </button>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowDeleteConfirm(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="rounded-2xl border border-slate-800/80 bg-slate-900/95 backdrop-blur-xl p-6 sm:p-8 shadow-2xl max-w-md w-full"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mx-auto mb-4 rounded-2xl bg-rose-500/10 p-4 w-fit"
                  >
                    <Trash2 className="h-8 w-8 text-rose-400" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">Delete Job Posting?</h3>
                  <p className="text-slate-400 text-sm mb-6">
                    This action cannot be undone. This will permanently delete the job posting and all associated data.
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowDeleteConfirm(null)}
                      className="flex-1 rounded-xl border border-slate-700/80 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 transition-all"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteJob(showDeleteConfirm)}
                      disabled={deletingId === showDeleteConfirm}
                      className="flex-1 rounded-xl bg-linear-to-r from-rose-500 to-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-rose-500/25 hover:from-rose-600 hover:to-red-700 transition-all disabled:opacity-50"
                    >
                      {deletingId === showDeleteConfirm ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Deleting...
                        </span>
                      ) : (
                        "Delete Job"
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </DashboardLayout>
  );
}

export default JobsPage;