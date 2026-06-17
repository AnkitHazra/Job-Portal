import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import JobCard from "../../components/common/JobCard";
import { getJobs } from "../../api/jobApi";
import {
  Search,
  MapPin,
  Briefcase,
  Filter,
  X,
  Sparkles,
  SlidersHorizontal,
  Building2,
} from "lucide-react";

function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const data = await getJobs();
      setJobs(data.jobs);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
    const matchesJobType = !jobType || job.jobType === jobType;
    return matchesSearch && matchesLocation && matchesJobType;
  });

  const hasActiveFilters = search || location || jobType;

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
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.3,
      },
    },
  };

  const filterVariants = {
    hidden: { opacity: 0, height: 0, marginBottom: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      marginBottom: 24,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      marginBottom: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const jobTypes = ["Full-Time", "Internship", "Part-Time", "Contract"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 sm:px-6 lg:px-8 py-8 mt-10 sm:mt-0"
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
              className="w-1.5 rounded-full bg-linear-to-b from-blue-400 via-indigo-400 to-purple-500"
            />
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
              >
                Find Your Dream Job
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-2 text-slate-400 flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4 text-blue-400" />
                Explore opportunities from top companies worldwide
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Search Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 shadow-xl shadow-slate-900/50"
          >
            {/* Main Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search job titles, keywords..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3.5 text-sm font-medium transition-all ${
                  isFiltersVisible
                    ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                    : "border-slate-700/80 bg-slate-800/50 text-slate-300 hover:border-slate-600 hover:text-white"
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white"
                  >
                    {[search, location, jobType].filter(Boolean).length}
                  </motion.span>
                )}
              </motion.button>
            </div>

            {/* Expandable Filters */}
            <AnimatePresence>
              {isFiltersVisible && (
                <motion.div
                  variants={filterVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-slate-800/50">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <label className="mb-2 block text-xs font-medium text-slate-400">
                          <MapPin className="inline h-3.5 w-3.5 mr-1.5" />
                          Location
                        </label>
                        <input
                          type="text"
                          placeholder="Filter by location..."
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-xs font-medium text-slate-400">
                          <Briefcase className="inline h-3.5 w-3.5 mr-1.5" />
                          Job Type
                        </label>
                        <select
                          value={jobType}
                          onChange={(e) => setJobType(e.target.value)}
                          className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 px-4 py-3 text-sm text-white transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600 cursor-pointer"
                        >
                          <option value="">All Types</option>
                          {jobTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-end">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSearch("");
                            setLocation("");
                            setJobType("");
                          }}
                          className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-rose-500 to-red-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-rose-500/25 transition-all hover:from-rose-600 hover:to-red-700"
                        >
                          <X className="h-4 w-4" />
                          Clear All Filters
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Results Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="rounded-xl bg-blue-500/10 p-2.5"
              >
                <Building2 className="h-5 w-5 text-blue-400" />
              </motion.div>
              <div>
                <motion.p
                  key={filteredJobs.length}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-semibold text-white"
                >
                  {filteredJobs.length} {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
                </motion.p>
                {hasActiveFilters && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-slate-400"
                  >
                    Showing filtered results
                  </motion.p>
                )}
              </div>
            </div>

            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-wrap gap-2"
              >
                {search && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 text-xs font-medium text-blue-400"
                  >
                    <Search className="h-3 w-3" />
                    {search}
                    <button onClick={() => setSearch("")} className="ml-1 hover:text-blue-300">
                      <X className="h-3 w-3" />
                    </button>
                  </motion.span>
                )}
                {location && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-1.5 text-xs font-medium text-green-400"
                  >
                    <MapPin className="h-3 w-3" />
                    {location}
                    <button onClick={() => setLocation("")} className="ml-1 hover:text-green-300">
                      <X className="h-3 w-3" />
                    </button>
                  </motion.span>
                )}
                {jobType && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 text-xs font-medium text-purple-400"
                  >
                    <Briefcase className="h-3 w-3" />
                    {jobType}
                    <button onClick={() => setJobType("")} className="ml-1 hover:text-purple-300">
                      <X className="h-3 w-3" />
                    </button>
                  </motion.span>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Jobs Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {isLoading ? (
            <motion.div
              variants={itemVariants}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                  className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 h-48"
                >
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-slate-800 rounded-full w-3/4" />
                    <div className="h-3 bg-slate-800 rounded-full w-1/2" />
                    <div className="h-3 bg-slate-800 rounded-full w-2/3" />
                    <div className="h-8 bg-slate-800 rounded-lg w-full mt-4" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : filteredJobs.length === 0 ? (
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
                <Search className="h-16 w-16 text-slate-600" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
              <p className="text-slate-400 text-center max-w-md mb-6">
                We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearch("");
                  setLocation("");
                  setJobType("");
                }}
                className="rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/25"
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job._id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                    whileHover="hover"
                    layout
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>

        {/* Bottom CTA */}
        {filteredJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 backdrop-blur-sm px-6 py-3 text-sm font-medium text-slate-300 shadow-lg transition-all hover:border-slate-600 hover:text-white hover:bg-slate-800/50"
            >
              Load More Jobs
              <motion.span
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default JobsPage;