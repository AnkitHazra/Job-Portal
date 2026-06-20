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
  LogIn,
  AlertCircle,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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

    try {
      const data = await login(formData);

      if (data.user.role === "candidate") {
        navigate("/candidate/dashboard");
      } else if (data.user.role === "recruiter") {
        navigate("/recruiter/dashboard");
      } else if (data.user.role === "admin") {
        navigate("/admin");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
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

  return (
    <>
      <Helmet>
        <title>Login | Hirevity</title>
        <meta
          name="description"
          content="Login in to Hirevity to track applications, manage jobs, and access AI-powered ATS insights."
        />
        <meta
          name="keywords"
          content="jobs, internships, remote jobs, software engineer jobs, AI job portal, ATS resume analyzer, Hirevity"
        />

        <link
          rel="canonical"
          href="https://job.ankithazra.online/login"
        />
      </Helmet>
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
              Welcome Back
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-3 text-slate-400"
            >
              Sign in to your account to continue
            </motion.p>
          </motion.div>

          {/* Login Form */}
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
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn size={18} />
                      Sign In
                    </>
                  )}
                </motion.button>
              </motion.div>
            </div>

            {/* Register Link */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-center text-sm text-slate-400"
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Create one
              </Link>
            </motion.p>
          </motion.form>
        </motion.div>
      </div>
    </>
  );
}

export default LoginPage;