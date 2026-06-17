import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import CompanyCard from "../../components/common/CompanyCard";
import { getMyCompanies } from "../../api/companyApi";
import {
  Building2,
  Plus,
  Search,
  Loader2,
  Sparkles,
  TrendingUp,
  MapPin,
  Globe,
  Users,
  Briefcase,
  ArrowUpRight,
  Filter,
  Grid3X3,
  List,
  SlidersHorizontal,
  FileText,  // Added this import
} from "lucide-react";

function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const navigate = useNavigate();

  const fetchCompanies = async () => {
    try {
      const data = await getMyCompanies();
      setCompanies(data.companies);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter(
    (company) =>
      company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  Companies
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-2 text-slate-400 flex items-center gap-2"
                >
                  <TrendingUp className="h-4 w-4" />
                  Manage your registered companies
                </motion.p>
              </div>
            </div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/recruiter/company/create")}
              className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-indigo-700 transition-all"
            >
              <Plus className="h-4 w-4" />
              Add Company
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Search and Filters */}
          {!loading && companies.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mb-6 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search companies by name, location, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode("grid")}
                    className={`rounded-xl border p-3 transition-all ${viewMode === "grid"
                        ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                        : "border-slate-700/80 bg-slate-800/50 text-slate-400 hover:text-white"
                      }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setViewMode("list")}
                    className={`rounded-xl border p-3 transition-all ${viewMode === "list"
                        ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                        : "border-slate-700/80 bg-slate-800/50 text-slate-400 hover:text-white"
                      }`}
                  >
                    <List className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
              {searchTerm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-3 pt-3 border-t border-slate-800/50"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-slate-400">
                      {filteredCompanies.length} compan{filteredCompanies.length !== 1 ? "ies" : "y"} found
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSearchTerm("")}
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Clear search
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Content */}
          {loading ? (
            <motion.div
              variants={itemVariants}
              className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2" : "grid-cols-1"
                }`}
            >
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                  className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6"
                >
                  <div className="animate-pulse space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 bg-slate-800 rounded-2xl" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-slate-800 rounded-full w-1/3" />
                        <div className="h-3 bg-slate-800 rounded-full w-1/2" />
                      </div>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full w-full" />
                    <div className="h-3 bg-slate-800 rounded-full w-3/4" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : companies.length === 0 ? (
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
                <Building2 className="h-16 w-16 text-slate-600" />
              </motion.div>
              <h3 className="text-xl font-semibold text-white mb-2">No Companies Yet</h3>
              <p className="text-slate-400 text-center max-w-md mb-6">
                Register your first company to start posting jobs and finding talented candidates.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/recruiter/company/create")}
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/25"
              >
                <Plus className="h-4 w-4" />
                Register Your First Company
              </motion.button>
            </motion.div>
          ) : filteredCompanies.length === 0 ? (
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
                No companies match your search criteria. Try adjusting your search terms.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchTerm("")}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Clear search
              </motion.button>
            </motion.div>
          ) : (
            <>
              {/* Grid View */}
              {viewMode === "grid" && (
                <motion.div
                  variants={itemVariants}
                  className="grid gap-6 md:grid-cols-2"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredCompanies.map((company, index) => (
                      <motion.div
                        key={company._id}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                        whileHover="hover"
                        layout
                      >
                        <CompanyCard company={company} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* List View */}
              {viewMode === "list" && (
                <motion.div
                  variants={itemVariants}
                  className="space-y-4"
                >
                  <AnimatePresence mode="popLayout">
                    {filteredCompanies.map((company, index) => (
                      <motion.div
                        key={company._id}
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
                        whileHover="hover"
                        layout
                        className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 shadow-xl"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className="h-14 w-14 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl font-bold text-white shadow-lg"
                            >
                              {company.name?.charAt(0)?.toUpperCase() || "C"}
                            </motion.div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">
                                {company.name}
                              </h3>
                              <div className="flex flex-wrap gap-3 mt-1">
                                {company.location && (
                                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {company.location}
                                  </span>
                                )}
                                {company.website && (
                                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                                    <Globe className="h-3.5 w-3.5" />
                                    {company.website}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="rounded-xl bg-slate-800 p-2.5 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                          >
                            <ArrowUpRight className="h-5 w-5" />
                          </motion.button>
                        </div>
                        {company.description && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 text-sm text-slate-400 line-clamp-2 pl-18"
                          >
                            {company.description}
                          </motion.p>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </>
          )}

          {/* Stats Summary */}
          {!loading && companies.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              <motion.div
                whileHover={{ y: -3, scale: 1.03 }}
                className="rounded-xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-4 text-center"
              >
                <Building2 className="h-5 w-5 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{companies.length}</p>
                <p className="text-xs text-slate-400 mt-1">Total Companies</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -3, scale: 1.03 }}
                className="rounded-xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-4 text-center"
              >
                <MapPin className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">
                  {new Set(companies.map((c) => c.location).filter(Boolean)).size}
                </p>
                <p className="text-xs text-slate-400 mt-1">Locations</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -3, scale: 1.03 }}
                className="rounded-xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-4 text-center"
              >
                <Globe className="h-5 w-5 text-purple-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">
                  {companies.filter((c) => c.website).length}
                </p>
                <p className="text-xs text-slate-400 mt-1">With Website</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -3, scale: 1.03 }}
                className="rounded-xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-4 text-center"
              >
                <FileText className="h-5 w-5 text-amber-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">
                  {companies.filter((c) => c.description).length}
                </p>
                <p className="text-xs text-slate-400 mt-1">With Description</p>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}

export default CompaniesPage;