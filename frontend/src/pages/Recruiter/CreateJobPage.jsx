import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { createJob } from "../../api/jobApi";
import { getMyCompanies } from "../../api/companyApi";
import {
  Briefcase,
  IndianRupee,
  MapPin,
  Award,
  Users,
  Clock,
  Building2,
  FileText,
  ListChecks,
  ArrowLeft,
  Plus,
  Loader2,
  Sparkles,
  Tag,
  Target,
  ChevronDown,
  Send,
  Zap,
  CheckCircle2,
} from "lucide-react";

function CreateJobPage() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [activeSection, setActiveSection] = useState("basic");
  const [formProgress, setFormProgress] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    experienceLevel: "",
    jobType: "Full-Time",
    position: "",
    companyId: "",
  });

  useEffect(() => {
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
    fetchCompanies();
  }, []);

  // Calculate form completion progress
  useEffect(() => {
    const fields = [
      formData.title,
      formData.description,
      formData.requirements,
      formData.salary,
      formData.location,
      formData.experienceLevel,
      formData.position,
      formData.companyId,
    ];
    const filledFields = fields.filter(Boolean).length;
    setFormProgress(Math.round((filledFields / fields.length) * 100));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);

    try {
      await createJob({
        ...formData,
        requirements: formData.requirements
          .split(",")
          .map((item) => item.trim()),
      });

      navigate("/recruiter/jobs");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create job");
    } finally {
      setCreating(false);
    }
  };

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

  const formFieldVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.08,
        duration: 0.4,
      },
    }),
    focus: {
      scale: 1.01,
      borderColor: "#3b82f6",
    },
  };

  const sections = [
    { id: "basic", label: "Basic Info", icon: Briefcase, color: "blue" },
    { id: "details", label: "Description", icon: FileText, color: "purple" },
    { id: "requirements", label: "Requirements", icon: ListChecks, color: "emerald" },
  ];

  const getCompletionColor = (percentage) => {
    if (percentage === 100) return "from-emerald-400 to-green-500";
    if (percentage >= 66) return "from-blue-400 to-indigo-500";
    if (percentage >= 33) return "from-amber-400 to-orange-500";
    return "from-slate-400 to-slate-500";
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
              <motion.button
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/recruiter/jobs")}
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
                    Create Job
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-2 text-slate-400 flex items-center gap-2"
                  >
                    <Sparkles className="h-4 w-4 text-blue-400" />
                    Post a new job opening and find the perfect candidate
                  </motion.p>
                </div>
              </div>
            </div>

            {/* Form Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3"
            >
              <div className="text-right">
                <p className="text-xs text-slate-400">Form Progress</p>
                <p className={`text-sm font-bold bg-linear-to-r ${getCompletionColor(formProgress)} bg-clip-text text-transparent`}>
                  {formProgress}%
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center relative">
                <svg className="h-8 w-8 -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18" cy="18" r="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-slate-700"
                  />
                  <motion.circle
                    cx="18" cy="18" r="14"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    stroke="url(#progressGradient)"
                    strokeDasharray={`${(formProgress / 100) * 87.96} 87.96`}
                    className="text-blue-400"
                    initial={{ strokeDasharray: "0 87.96" }}
                    animate={{ strokeDasharray: `${(formProgress / 100) * 87.96} 87.96` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </svg>
                <span className="absolute text-xs font-bold text-white">{formProgress}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Section Tabs */}
          <motion.div variants={itemVariants} className="mb-6 flex gap-2 overflow-x-auto pb-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <motion.button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap ${
                    activeSection === section.id
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "bg-slate-800/30 text-slate-400 border border-slate-700/50 hover:text-white hover:border-slate-600"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {section.label}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 shadow-xl shadow-slate-900/50"
          >
            {/* Basic Information Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: activeSection === "basic" ? 1 : 0.4 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-xl bg-blue-500/10 p-2.5"
                >
                  <Briefcase className="h-5 w-5 text-blue-400" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Basic Information</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Essential details about the job position</p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <motion.div custom={0} variants={formFieldVariants} initial="hidden" animate="visible" whileFocus="focus">
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    <Briefcase className="inline h-3.5 w-3.5 mr-1.5" />
                    Job Title <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Senior React Developer"
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600"
                    required
                  />
                </motion.div>

                <motion.div custom={1} variants={formFieldVariants} initial="hidden" animate="visible" whileFocus="focus">
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    <Building2 className="inline h-3.5 w-3.5 mr-1.5" />
                    Company <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="companyId"
                      value={formData.companyId}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-xl border border-slate-700/80 bg-slate-800/50 pl-4 pr-10 py-3 text-sm text-white transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600 cursor-pointer"
                      required
                    >
                      <option value="">Select Company</option>
                      {companies.map((company) => (
                        <option key={company._id} value={company._id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </motion.div>

                <motion.div custom={2} variants={formFieldVariants} initial="hidden" animate="visible" whileFocus="focus">
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    <MapPin className="inline h-3.5 w-3.5 mr-1.5" />
                    Location <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Bangalore, India"
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600"
                    required
                  />
                </motion.div>

                <motion.div custom={3} variants={formFieldVariants} initial="hidden" animate="visible" whileFocus="focus">
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    <IndianRupee className="inline h-3.5 w-3.5 mr-1.5" />
                    Salary (Annual) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="e.g., 1200000"
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600"
                    required
                  />
                </motion.div>

                <motion.div custom={4} variants={formFieldVariants} initial="hidden" animate="visible" whileFocus="focus">
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    <Tag className="inline h-3.5 w-3.5 mr-1.5" />
                    Job Type <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-xl border border-slate-700/80 bg-slate-800/50 pl-4 pr-10 py-3 text-sm text-white transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600 cursor-pointer"
                    >
                      <option>Full-Time</option>
                      <option>Internship</option>
                      <option>Part-Time</option>
                      <option>Contract</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </motion.div>

                <motion.div custom={5} variants={formFieldVariants} initial="hidden" animate="visible" whileFocus="focus">
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    <Award className="inline h-3.5 w-3.5 mr-1.5" />
                    Experience Required (Years) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    placeholder="e.g., 3"
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600"
                    required
                  />
                </motion.div>

                <motion.div custom={6} variants={formFieldVariants} initial="hidden" animate="visible" whileFocus="focus">
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    <Users className="inline h-3.5 w-3.5 mr-1.5" />
                    Open Positions <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="number"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="e.g., 2"
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600"
                    required
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Description Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: activeSection === "details" ? 1 : 0.4 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-xl bg-purple-500/10 p-2.5"
                >
                  <FileText className="h-5 w-5 text-purple-400" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Job Description</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Detailed information about the role</p>
                </div>
              </div>

              <motion.div
                variants={formFieldVariants}
                initial="hidden"
                animate="visible"
                whileFocus="focus"
              >
                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Detailed Description <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows="6"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600 resize-none"
                  required
                />
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs text-slate-500">
                    Tip: Include key responsibilities, qualifications, and benefits to attract the best candidates.
                  </p>
                  <span className="text-xs text-slate-500">
                    {formData.description.length} characters
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Requirements Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: activeSection === "requirements" ? 1 : 0.4 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-xl bg-emerald-500/10 p-2.5"
                >
                  <ListChecks className="h-5 w-5 text-emerald-400" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Requirements</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Skills and qualifications needed</p>
                </div>
              </div>

              <motion.div
                variants={formFieldVariants}
                initial="hidden"
                animate="visible"
                whileFocus="focus"
              >
                <label className="mb-2 block text-xs font-medium text-slate-400">
                  Skills & Qualifications <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows="4"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="React, Node.js, TypeScript, MongoDB, AWS"
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600 resize-none"
                  required
                />
                <p className="mt-2 text-xs text-slate-500">
                  Separate each skill or requirement with a comma.
                </p>
              </motion.div>

              {/* Requirements Preview */}
              {formData.requirements && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4"
                >
                  <p className="text-xs font-medium text-slate-400 mb-3">Preview:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.requirements
                      .split(",")
                      .filter(Boolean)
                      .map((req, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-medium text-emerald-400"
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          {req.trim()}
                        </motion.span>
                      ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10"
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-blue-400" />
                <h3 className="text-sm font-medium text-blue-400">Tips for a Great Job Posting</h3>
              </div>
              <ul className="space-y-1.5">
                {[
                  "Be specific about required skills and experience",
                  "Include salary range to attract more qualified candidates",
                  "Highlight unique benefits and company culture",
                  "Use clear and inclusive language",
                ].map((tip, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start gap-2 text-xs text-slate-400"
                  >
                    <span className="text-blue-400 mt-0.5">•</span>
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-800/50"
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/recruiter/jobs")}
                className="flex-1 rounded-xl border border-slate-700/80 px-6 py-3.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={creating || formProgress < 100}
                whileHover={formProgress === 100 ? { scale: 1.02 } : {}}
                whileTap={formProgress === 100 ? { scale: 0.98 } : {}}
                className={`flex-1 rounded-xl px-6 py-3.5 text-sm font-medium text-white shadow-lg transition-all inline-flex items-center justify-center gap-2 ${
                  formProgress === 100
                    ? "bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-blue-500/25"
                    : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {creating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating Job...
                  </>
                ) : (
                  <>
                    {formProgress === 100 ? (
                      <>
                        <Send className="h-4 w-4" />
                        Post Job
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
                        Complete All Fields
                      </>
                    )}
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}

export default CreateJobPage;