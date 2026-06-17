import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  BriefcaseBusiness,
  IndianRupee,
  Clock,
  Calendar,
  Building2,
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle2,
  Loader2,
  GraduationCap,
  Target,
  Award,
  Users,
  Zap,
  Star,
} from "lucide-react";
import { getJobById } from "../../api/jobApi";
import { applyJob } from "../../api/applicationApi";

function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const fetchJob = async () => {
    try {
      const data = await getJobById(id);
      setJob(data.job);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
    window.scrollTo(0, 0);
  }, [id]);

  const handleApply = async () => {
    try {
      setApplying(true);
      const data = await applyJob(job._id);
      alert(data.message);
      setIsApplied(true);
    } catch (error) {
      alert(
        error.response?.data?.message || "Application failed"
      );
    } finally {
      setApplying(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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

  const requirementVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.6 + i * 0.08,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(59, 130, 246, 0.15)",
      borderColor: "rgba(59, 130, 246, 0.3)",
      transition: { duration: 0.2 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center">
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
            <Loader2 className="h-12 w-12 text-blue-400" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-lg"
          >
            Loading job details...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center">
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
            🔍
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">Job Not Found</h2>
          <p className="text-slate-400 mb-6">This job posting may have been removed or doesn't exist.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/jobs")}
            className="rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/25"
          >
            Back to Jobs
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 sm:px-6 lg:px-8 py-8 mt-1 sm:mt-0"
    >
      <div className="mx-auto max-w-5xl">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 backdrop-blur-sm px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:border-slate-600 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </motion.button>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Job Card */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-900/50"
          >
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                {/* Company Info */}
                <motion.div
                  variants={fadeInUp}
                  className="flex items-center gap-4 mb-6"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="h-16 w-16 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                  >
                    {job.company?.name?.charAt(0) || "C"}
                  </motion.div>
                  <div>
                    <motion.p
                      variants={fadeInUp}
                      className="text-slate-400 flex items-center gap-2"
                    >
                      <Building2 className="h-4 w-4" />
                      {job.company?.name}
                    </motion.p>
                    <motion.h1
                      variants={fadeInUp}
                      className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-1"
                    >
                      {job.title}
                    </motion.h1>
                  </div>
                </motion.div>

                {/* Job Meta Info */}
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-wrap gap-3 mb-6"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-500/10 border border-blue-500/20 px-4 py-2 text-sm font-medium text-blue-400"
                  >
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </motion.span>

                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-2 rounded-xl bg-purple-500/10 border border-purple-500/20 px-4 py-2 text-sm font-medium text-purple-400"
                  >
                    <BriefcaseBusiness className="h-4 w-4" />
                    {job.jobType || "Full-Time"}
                  </motion.span>

                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400"
                  >
                    <Target className="h-4 w-4" />
                    {job.experienceLevel} Years Exp.
                  </motion.span>

                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-2 text-sm font-medium text-amber-400"
                  >
                    <IndianRupee className="h-4 w-4" />
                    ₹{job.salary?.toLocaleString()}
                  </motion.span>
                </motion.div>

                {/* Additional Meta */}
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-wrap gap-4 text-sm text-slate-400"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Posted {new Date(job.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {job.applicants?.length || 0} Applicant{(job.applicants?.length || 0) !== 1 ? "s" : ""}
                  </div>
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-row lg:flex-col gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleApply}
                  disabled={applying || isApplied}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold shadow-lg transition-all ${
                    isApplied
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-not-allowed"
                      : "bg-linear-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-blue-500/25"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {applying ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Applying...
                    </>
                  ) : isApplied ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Applied
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      Apply Now
                    </>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSaved(!isSaved)}
                  className={`inline-flex items-center justify-center gap-2 rounded-xl border px-8 py-3.5 text-sm font-semibold transition-all ${
                    isSaved
                      ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                      : "border-slate-700/80 bg-slate-800/50 text-slate-300 hover:text-white hover:border-slate-600"
                  }`}
                >
                  {isSaved ? (
                    <>
                      <Bookmark className="h-4 w-4 fill-current" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4" />
                      Save Job
                    </>
                  )}
                </motion.button>

                
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div
              variants={fadeInUp}
              className="my-8 h-px bg-linear-to-r from-transparent via-slate-700/50 to-transparent"
            />

            {/* Job Description */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-xl bg-blue-500/10 p-2.5"
                >
                  <Award className="h-5 w-5 text-blue-400" />
                </motion.div>
                <h2 className="text-2xl font-semibold text-white">Job Description</h2>
              </div>

              <motion.div
                variants={fadeInUp}
                className="prose prose-invert max-w-none"
              >
                <div className="rounded-xl bg-slate-800/30 border border-slate-700/50 p-6">
                  <p className="text-slate-300 leading-8 text-base">
                    {job.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <motion.div variants={itemVariants} className="mt-10">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-xl bg-purple-500/10 p-2.5"
                  >
                    <Star className="h-5 w-5 text-purple-400" />
                  </motion.div>
                  <h2 className="text-2xl font-semibold text-white">Requirements</h2>
                </div>

                <motion.div
                  variants={containerVariants}
                  className="flex flex-wrap gap-3"
                >
                  {job.requirements.map((req, index) => (
                    <motion.span
                      key={index}
                      custom={index}
                      variants={requirementVariants}
                      whileHover="hover"
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-800/50 border border-slate-700/50 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      {req}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* Bottom CTA */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 pt-8 border-t border-slate-800/50"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Interested in this position?</h3>
                  <p className="text-sm text-slate-400 mt-1">Apply now and take the next step in your career</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleApply}
                  disabled={applying || isApplied}
                  className={`inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold shadow-lg transition-all ${
                    isApplied
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-not-allowed"
                      : "bg-linear-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-blue-500/25"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Application Submitted
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5" />
                      Apply for this Position
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { icon: Clock, label: "Job Type", value: job.jobType || "Full-Time", color: "text-blue-400" },
                { icon: GraduationCap, label: "Experience", value: `${job.experienceLevel} Years`, color: "text-purple-400" },
                { icon: MapPin, label: "Location", value: job.location, color: "text-emerald-400" },
                { icon: IndianRupee, label: "Salary", value: `₹${job.salary?.toLocaleString()}`, color: "text-amber-400" },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="rounded-xl bg-slate-800/30 border border-slate-700/50 p-4 text-center"
                  >
                    <Icon className={`h-5 w-5 ${stat.color} mx-auto mb-2`} />
                    <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
                    <p className="text-sm font-semibold text-white">{stat.value}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default JobDetailsPage;