import {
  Brain,
  BriefcaseBusiness,
  FileText,
  Sparkles,
  Zap,
  ArrowRight,
  Star,
  TrendingUp,
  Shield,
  Users,
  CheckCircle2,
  Building2
} from "lucide-react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function HeroSection() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
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

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5 + i * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.02,
      y: -5,
      transition: { duration: 0.3 },
    },
  };

  const featureCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -8,
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const features = [
    { 
      name: "AI Resume Analysis",
      icon: FileText,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    { 
      name: "Smart Job Matching",
      icon: Brain,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    { 
      name: "Interview Preparation",
      icon: Sparkles,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    { 
      name: "Verified Companies",
      icon: Shield,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
  ];

  const statsData = [
    { value: "10K+", label: "Active Users", icon: Users },
    { value: "500+", label: "Companies", icon: Building2 },
    { value: "92%", label: "Success Rate", icon: TrendingUp },
    { value: "24h", label: "Avg. Response", icon: Zap },
  ];

  return (
    <section className="relative pt-8 md:pt-12 bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Main linear */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-slate-950/50" />
        
        {/* Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [45, 0, 45],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-20 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
        />

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-linear(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-16 lg:grid-cols-2"
        >
          {/* LEFT SIDE */}
          <div>
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={16} />
              </motion.div>
              <span>AI Powered Recruitment Platform</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="mt-8 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl"
            >
              <span className="bg-linear-to-r from-white via-white to-slate-300 bg-clip-text text-transparent">
                Hire Smarter.
              </span>
              <br />
              <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Match Faster.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-8 max-w-xl text-lg leading-relaxed text-slate-400"
            >
              AI-powered hiring platform that helps recruiters discover top talent 
              and candidates find the right opportunities with intelligent matching.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-indigo-700 transition-all"
                >
                  Get Started
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={20} />
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-800/50 backdrop-blur-sm px-8 py-4 font-semibold text-slate-300 hover:text-white hover:border-slate-600 transition-all"
                >
                  <BriefcaseBusiness size={20} />
                  Hire Talent
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {statsData.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -3 }}
                    className="text-center p-3 rounded-xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-sm"
                  >
                    <Icon className="h-4 w-4 text-slate-400 mx-auto mb-1" />
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-500">{stat.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT SIDE */}
          <motion.div variants={itemVariants}>
            <motion.div
              animate={floatingAnimation}
              className="rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-8 shadow-2xl shadow-slate-900/50"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="rounded-xl bg-blue-500/10 p-2"
                  >
                    <Brain className="h-5 w-5 text-blue-400" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white">
                    AI Candidate Insights
                  </h3>
                </div>
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs font-medium text-emerald-400"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </motion.span>
              </div>

              {/* Score Cards */}
              <div className="space-y-4">
                {/* ATS Score */}
                <motion.div
                  custom={0}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="rounded-2xl bg-slate-800/50 border border-slate-700/50 p-5 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-blue-500/10 p-2">
                        <FileText size={18} className="text-blue-400" />
                      </div>
                      <p className="text-sm font-medium text-slate-300">ATS Score</p>
                    </div>
                    <Star size={16} className="text-amber-400" />
                  </div>

                  <div className="flex items-end justify-between">
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-4xl font-bold text-blue-400"
                    >
                      92%
                    </motion.h3>
                    <span className="text-xs text-emerald-400">Excellent</span>
                  </div>

                  <div className="mt-3 h-2 rounded-full bg-slate-700/50 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-linear-to-r from-blue-500 to-blue-400"
                    />
                  </div>
                </motion.div>

                {/* Job Match */}
                <motion.div
                  custom={1}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="rounded-2xl bg-slate-800/50 border border-slate-700/50 p-5 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-purple-500/10 p-2">
                        <BriefcaseBusiness size={18} className="text-purple-400" />
                      </div>
                      <p className="text-sm font-medium text-slate-300">Job Match Score</p>
                    </div>
                    <TrendingUp size={16} className="text-emerald-400" />
                  </div>

                  <div className="flex items-end justify-between">
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="text-4xl font-bold text-purple-400"
                    >
                      89%
                    </motion.h3>
                    <span className="text-xs text-emerald-400">Great Match</span>
                  </div>

                  <div className="mt-3 h-2 rounded-full bg-slate-700/50 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "89%" }}
                      transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-linear-to-r from-purple-500 to-purple-400"
                    />
                  </div>
                </motion.div>

                {/* Interview Readiness */}
                <motion.div
                  custom={2}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="rounded-2xl bg-slate-800/50 border border-slate-700/50 p-5 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="rounded-lg bg-emerald-500/10 p-2">
                      <Brain size={18} className="text-emerald-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-300">Interview Readiness</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <motion.h3
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="text-3xl font-bold bg-linear-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent"
                    >
                      Strong
                    </motion.h3>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex items-center gap-1 text-emerald-400"
                    >
                      <CheckCircle2 size={20} />
                      <span className="text-sm font-medium">Ready</span>
                    </motion.div>
                  </div>

                  {/* Skill Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Communication", "Technical", "Behavioral"].map((skill, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.6 + i * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-medium text-emerald-400"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                custom={index}
                variants={featureCardVariants}
                whileHover="hover"
                className={`group relative rounded-2xl border ${feature.borderColor} ${feature.bgColor} backdrop-blur-sm p-6 transition-all cursor-pointer`}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`rounded-xl p-3 w-fit mb-4 ${feature.bgColor}`}
                  >
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </motion.div>
                  
                  <h3 className="font-semibold text-white mb-2">{feature.name}</h3>
                  <p className="text-sm text-slate-400">
                    Advanced AI technology for better hiring decisions
                  </p>
                  
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    className="mt-4 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;