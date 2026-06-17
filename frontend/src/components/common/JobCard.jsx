import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  BriefcaseBusiness,
  IndianRupee,
  Clock,
  Building2,
  ArrowUpRight,
  Bookmark,
  Zap,
} from "lucide-react";

function JobCard({ job }) {
  const navigate = useNavigate();

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const getJobTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "full-time":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "part-time":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "contract":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "internship":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const formatSalary = (salary) => {
    if (!salary) return "Not Disclosed";
    if (salary >= 10000000) {
      return `₹${(salary / 10000000).toFixed(1)} Cr`;
    } else if (salary >= 100000) {
      return `₹${(salary / 100000).toFixed(1)} LPA`;
    }
    return `₹${salary?.toLocaleString()}`;
  };

  const getDaysAgo = (date) => {
    if (!date) return "";
    const days = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 shadow-xl transition-all cursor-pointer relative overflow-hidden"
      onClick={() => navigate(`/jobs/${job._id}`)}
    >
      {/* Background linear Effect */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-bl from-blue-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top Border linear */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        {/* Header Section */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Company Logo/Avatar */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="h-12 w-12 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-blue-500/25 shrink-0"
            >
              {job.company?.name?.charAt(0)?.toUpperCase() || "C"}
            </motion.div>

            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
                {job.title || "Untitled Position"}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <Building2 className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                <p className="text-sm text-slate-400 truncate">
                  {job.company?.name || "Unknown Company"}
                </p>
              </div>
            </div>
          </div>

          {/* Job Type Badge */}
          <motion.span
            whileHover={{ scale: 1.05 }}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border shrink-0 ${getJobTypeColor(job.jobType)}`}
          >
            <Zap className="h-3 w-3" />
            {job.jobType || "Full-Time"}
          </motion.span>
        </div>

        {/* Meta Information */}
        <div className="mt-4 flex flex-wrap gap-3">
          {job.location && (
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-slate-300"
            >
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              {job.location}
            </motion.span>
          )}

          {job.experienceLevel && (
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-slate-300"
            >
              <BriefcaseBusiness className="h-3.5 w-3.5 text-slate-400" />
              {job.experienceLevel} {job.experienceLevel === 1 ? "Year" : "Years"} Exp.
            </motion.span>
          )}

          {job.createdAt && (
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-slate-300"
            >
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              {getDaysAgo(job.createdAt)}
            </motion.span>
          )}
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-linear-to-r from-transparent via-slate-700/50 to-transparent" />

        {/* Bottom Section */}
        <div className="flex items-center justify-between">
          {/* Salary */}
          <div>
            <p className="text-xs text-slate-500 mb-1">Salary</p>
            <div className="flex items-center gap-1.5">
              <IndianRupee className="h-4 w-4 text-emerald-400" />
              <h4 className="text-xl font-bold text-white">
                {formatSalary(job.salary)}
              </h4>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Save Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                // Add save functionality here
              }}
              className="rounded-lg bg-slate-800/50 p-2 text-slate-400 hover:text-amber-400 hover:bg-slate-700/50 transition-all opacity-0 group-hover:opacity-100"
            >
              <Bookmark className="h-4 w-4" />
            </motion.button>

            {/* View Details Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/jobs/${job._id}`);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-indigo-700 transition-all"
            >
              View Details
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </motion.span>
            </motion.button>
          </div>
        </div>

        {/* Skills/Requirements Preview */}
        {job.requirements && job.requirements.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-800/50">
            <div className="flex flex-wrap gap-1.5">
              {job.requirements.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-md bg-blue-500/5 border border-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-400"
                >
                  {skill}
                </span>
              ))}
              {job.requirements.length > 3 && (
                <span className="inline-flex items-center rounded-md bg-slate-800/50 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                  +{job.requirements.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default JobCard;