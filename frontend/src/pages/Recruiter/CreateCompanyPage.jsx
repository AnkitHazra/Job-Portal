import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { createCompany } from "../../api/companyApi";
import {
  Building2,
  Globe,
  MapPin,
  FileText,
  ArrowLeft,
  Plus,
  Loader2,
  Sparkles,
  Send,
  Zap,
  CheckCircle2,
  Briefcase,
  Image,
  Link,
  Info,
} from "lucide-react";

function CreateCompanyPage() {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const [formProgress, setFormProgress] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
  });

  // Calculate form completion progress
  useEffect(() => {
    const fields = [
      formData.name,
      formData.description,
      formData.website,
      formData.location,
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
      await createCompany(formData);
      navigate("/recruiter/companies");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create company");
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
        delay: 0.3 + i * 0.1,
        duration: 0.4,
      },
    }),
    focus: {
      scale: 1.01,
      borderColor: "#3b82f6",
    },
  };

  const getCompletionColor = (percentage) => {
    if (percentage === 100) return "from-emerald-400 to-green-500";
    if (percentage >= 66) return "from-blue-400 to-indigo-500";
    if (percentage >= 33) return "from-amber-400 to-orange-500";
    return "from-slate-400 to-slate-500";
  };

  const formFields = [
    {
      name: "name",
      label: "Company Name",
      icon: Building2,
      type: "text",
      placeholder: "e.g., TechCorp Solutions",
      required: true,
      description: "The official name of your company",
    },
    {
      name: "website",
      label: "Website",
      icon: Globe,
      type: "text",
      placeholder: "e.g., https://techcorp.com",
      required: false,
      description: "Your company's website URL",
    },
    {
      name: "location",
      label: "Location",
      icon: MapPin,
      type: "text",
      placeholder: "e.g., Bangalore, India",
      required: true,
      description: "Primary location of your company",
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
                onClick={() => navigate("/recruiter/companies")}
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
                    Create Company
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-2 text-slate-400 flex items-center gap-2"
                  >
                    <Sparkles className="h-4 w-4 text-blue-400" />
                    Register a new company to start posting jobs
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
                <p className="text-xs text-slate-400">Completion</p>
                <p className={`text-sm font-bold bg-linear-to-r ${getCompletionColor(formProgress)} bg-clip-text text-transparent`}>
                  {formProgress}%
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center relative">
                <svg className="h-9 w-9 -rotate-90" viewBox="0 0 36 36">
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
                    stroke="currentColor"
                    className="text-blue-400"
                    strokeDasharray={`${(formProgress / 100) * 87.96} 87.96`}
                    initial={{ strokeDasharray: "0 87.96" }}
                    animate={{ strokeDasharray: `${(formProgress / 100) * 87.96} 87.96` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </svg>
                <span className="absolute text-[10px] font-bold text-white">{formProgress}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Company Preview Card */}
          <motion.div
            variants={itemVariants}
            className="mb-6 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 shadow-xl"
          >
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="h-16 w-16 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg"
              >
                {formData.name ? formData.name.charAt(0).toUpperCase() : "?"}
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {formData.name || "Company Name"}
                </h3>
                <div className="flex flex-wrap gap-3 mt-2">
                  {formData.location && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="h-3.5 w-3.5" />
                      {formData.location}
                    </span>
                  )}
                  {formData.website && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                      <Globe className="h-3.5 w-3.5" />
                      {formData.website}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {formData.description && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 text-sm text-slate-400 leading-relaxed pl-20"
              >
                {formData.description}
              </motion.p>
            )}
          </motion.div>

          {/* Form */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 shadow-xl shadow-slate-900/50"
          >
            {/* Company Information */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-xl bg-blue-500/10 p-2.5"
                >
                  <Building2 className="h-5 w-5 text-blue-400" />
                </motion.div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Company Information</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Fill in the details about your company</p>
                </div>
              </div>

              <div className="space-y-5">
                {formFields.map((field, index) => {
                  const Icon = field.icon;
                  return (
                    <motion.div
                      key={field.name}
                      custom={index}
                      variants={formFieldVariants}
                      initial="hidden"
                      animate="visible"
                      whileFocus="focus"
                    >
                      <label className="mb-2 block text-xs font-medium text-slate-400">
                        <Icon className="inline h-3.5 w-3.5 mr-1.5" />
                        {field.label}
                        {field.required && <span className="text-rose-400 ml-1">*</span>}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600"
                        required={field.required}
                      />
                      <p className="mt-1.5 text-xs text-slate-500">{field.description}</p>
                    </motion.div>
                  );
                })}

                {/* Description Field */}
                <motion.div
                  custom={3}
                  variants={formFieldVariants}
                  initial="hidden"
                  animate="visible"
                  whileFocus="focus"
                >
                  <label className="mb-2 block text-xs font-medium text-slate-400">
                    <FileText className="inline h-3.5 w-3.5 mr-1.5" />
                    Description <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows="5"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us about your company, its mission, culture, and what makes it a great place to work..."
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600 resize-none"
                    required
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-xs text-slate-500">
                      A compelling description helps attract better candidates.
                    </p>
                    <span className="text-xs text-slate-500">
                      {formData.description.length} characters
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Quick Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-8 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10"
            >
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-blue-400" />
                <h3 className="text-sm font-medium text-blue-400">Tips for Company Registration</h3>
              </div>
              <ul className="space-y-1.5">
                {[
                  "Use your official registered company name",
                  "Include your complete website URL (https://)",
                  "Provide a detailed description to build trust with candidates",
                  "Keep your company information up to date",
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
                onClick={() => navigate("/recruiter/companies")}
                className="flex-1 rounded-xl border border-slate-700/80 px-6 py-3.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={creating || formProgress < 75}
                whileHover={formProgress >= 75 ? { scale: 1.02 } : {}}
                whileTap={formProgress >= 75 ? { scale: 0.98 } : {}}
                className={`flex-2 rounded-xl px-6 py-3.5 text-sm font-medium text-white shadow-lg transition-all inline-flex items-center justify-center gap-2 ${
                  formProgress >= 75
                    ? "bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-blue-500/25"
                    : "bg-slate-700/50 text-slate-500 cursor-not-allowed"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {creating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating Company...
                  </>
                ) : (
                  <>
                    {formProgress >= 75 ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Create Company
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
                        Fill Required Fields ({formProgress}%)
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

export default CreateCompanyPage;