import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  BriefcaseBusiness,
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  UserPlus,
  AlertCircle,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  XCircle,
} from "lucide-react";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "candidate",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please try again.");
      setIsLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registrationData } = formData;
      await register(registrationData);
      navigate("/login");
    } catch (error) {
      setError(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const getRoleDescription = (role) => {
    return role === "candidate"
      ? "Find your dream job and get hired by top companies"
      : "Post jobs and find the best talent for your organization";
  };

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength: 25, label: "Weak", color: "bg-rose-400" };
    if (strength <= 3) return { strength: 50, label: "Medium", color: "bg-amber-400" };
    if (strength <= 4) return { strength: 75, label: "Strong", color: "bg-emerald-400" };
    return { strength: 100, label: "Very Strong", color: "bg-emerald-500" };
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-12 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 w-60 h-60 bg-emerald-500/5 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md"
      >
        {/* Logo Section */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="inline-flex mx-auto mb-6"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
              <BriefcaseBusiness size={28} className="text-white" />
            </div>
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold text-white"
          >
            Create Account
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-3 text-slate-400"
          >
            Join the smart hiring platform today
          </motion.p>
        </motion.div>

        {/* Registration Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-8 shadow-xl shadow-slate-900/50"
        >
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3"
            >
              <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
              <p className="text-sm text-rose-400">{error}</p>
            </motion.div>
          )}

          <div className="space-y-5">
            {/* Full Name Field */}
            <motion.div
              variants={itemVariants}
              whileFocus={{ scale: 1.01 }}
            >
              <label className="mb-2 block text-xs font-medium text-slate-400">
                <User className="inline h-3.5 w-3.5 mr-1.5" />
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 pl-4 pr-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600"
                  required
                />
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div
              variants={itemVariants}
              whileFocus={{ scale: 1.01 }}
            >
              <label className="mb-2 block text-xs font-medium text-slate-400">
                <Mail className="inline h-3.5 w-3.5 mr-1.5" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 pl-4 pr-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600"
                  required
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              variants={itemVariants}
              whileFocus={{ scale: 1.01 }}
            >
              <label className="mb-2 block text-xs font-medium text-slate-400">
                <Lock className="inline h-3.5 w-3.5 mr-1.5" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 pl-4 pr-12 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600"
                  required
                  minLength={6}
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </motion.button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-slate-500">Password strength:</p>
                    <p className={`text-xs font-medium ${
                      passwordStrength.label === "Weak" ? "text-rose-400" :
                      passwordStrength.label === "Medium" ? "text-amber-400" :
                      "text-emerald-400"
                    }`}>
                      {passwordStrength.label}
                    </p>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${passwordStrength.strength}%` }}
                      transition={{ duration: 0.3 }}
                      className={`h-full rounded-full ${passwordStrength.color}`}
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div
              variants={itemVariants}
              whileFocus={{ scale: 1.01 }}
            >
              <label className="mb-2 block text-xs font-medium text-slate-400">
                <Lock className="inline h-3.5 w-3.5 mr-1.5" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full rounded-xl border bg-slate-800/50 pl-4 pr-12 py-3 text-sm text-white placeholder-slate-500 transition-all focus:outline-none focus:ring-2 ${
                    formData.confirmPassword
                      ? passwordsMatch
                        ? "border-emerald-500/50 focus:border-emerald-500 focus:ring-emerald-500/20"
                        : "border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20"
                      : "border-slate-700/80 focus:border-blue-500 focus:ring-blue-500/20 hover:border-slate-600"
                  }`}
                  required
                  minLength={6}
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </motion.button>
                
                {/* Match Indicator */}
                {formData.confirmPassword && (
                  <div className="absolute right-12 top-1/2 -translate-y-1/2">
                    {passwordsMatch ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <XCircle className="h-5 w-5 text-rose-400" />
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Match Status Message */}
              {formData.confirmPassword && !passwordsMatch && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-rose-400"
                >
                  Passwords do not match
                </motion.p>
              )}
              {passwordsMatch && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1.5 text-xs text-emerald-400"
                >
                  Passwords match
                </motion.p>
              )}
            </motion.div>

            {/* Role Selection */}
            <motion.div
              variants={itemVariants}
              whileFocus={{ scale: 1.01 }}
            >
              <label className="mb-3 block text-xs font-medium text-slate-400">
                I want to...
              </label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setFormData({ ...formData, role: "candidate" })
                  }
                  className={`relative flex flex-col items-center gap-3 rounded-xl border p-4 transition-all ${
                    formData.role === "candidate"
                      ? "border-blue-500/50 bg-blue-500/10 text-blue-400 shadow-lg shadow-blue-500/10"
                      : "border-slate-700/80 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  <div
                    className={`rounded-xl p-2.5 ${
                      formData.role === "candidate"
                        ? "bg-blue-500/20"
                        : "bg-slate-700/50"
                    }`}
                  >
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">Find Jobs</span>
                  {formData.role === "candidate" && (
                    <motion.div
                      layoutId="roleIndicator"
                      className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-400"
                    />
                  )}
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setFormData({ ...formData, role: "recruiter" })
                  }
                  className={`relative flex flex-col items-center gap-3 rounded-xl border p-4 transition-all ${
                    formData.role === "recruiter"
                      ? "border-purple-500/50 bg-purple-500/10 text-purple-400 shadow-lg shadow-purple-500/10"
                      : "border-slate-700/80 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  <div
                    className={`rounded-xl p-2.5 ${
                      formData.role === "recruiter"
                        ? "bg-purple-500/20"
                        : "bg-slate-700/50"
                    }`}
                  >
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">Hire Talent</span>
                  {formData.role === "recruiter" && (
                    <motion.div
                      layoutId="roleIndicator"
                      className="absolute top-2 right-2 h-2 w-2 rounded-full bg-purple-400"
                    />
                  )}
                </motion.button>
              </div>
              
              {/* Role Description */}
              <motion.p
                key={formData.role}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 text-xs text-slate-500 text-center"
              >
                {getRoleDescription(formData.role)}
              </motion.p>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus size={18} />
                    Create Account
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>

          {/* Login Link */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-center text-sm text-slate-400"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Sign in
            </Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default RegisterPage;