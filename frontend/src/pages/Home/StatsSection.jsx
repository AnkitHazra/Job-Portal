import { motion } from "framer-motion";
import {
  Users,
  Building2,
  BriefcaseBusiness,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Star,
  Zap,
  Target,
  Award,
  Clock,
  CheckCircle2,
} from "lucide-react";

function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "10K+",
      label: "Candidates",
      description: "Actively searching for opportunities",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      linear: "from-blue-500/20 to-cyan-500/20",
      progress: 85,
    },
    {
      icon: Building2,
      value: "500+",
      label: "Companies",
      description: "Hiring through our platform",
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/20",
      linear: "from-violet-500/20 to-purple-500/20",
      progress: 72,
    },
    {
      icon: BriefcaseBusiness,
      value: "25K+",
      label: "Applications",
      description: "Successfully submitted",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      linear: "from-emerald-500/20 to-green-500/20",
      progress: 90,
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Match Accuracy",
      description: "AI-powered recommendation score",
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      linear: "from-amber-500/20 to-orange-500/20",
      progress: 95,
    },
  ];

  const milestones = [
    { icon: Target, text: "99.9% Uptime" },
    { icon: Zap, text: "Real-time Processing" },
    { icon: Award, text: "Top Rated Platform" },
    { icon: Clock, text: "24/7 Support" },
  ];

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
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.5 + i * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -8,
      scale: 1.03,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="stats" className="relative bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 py-24 overflow-hidden">
      {/* Top Border linear */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-0 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-emerald-600/5 blur-3xl"
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

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.div variants={itemVariants}>
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={16} />
              </motion.div>
              Trusted By Recruiters
            </motion.span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mt-8 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          >
            Growing Faster
            <br />
            <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Every Day
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Helping recruiters discover talent and candidates land better 
            opportunities with AI-powered matching and insights.
          </motion.p>

          {/* Milestones */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm px-4 py-2.5 text-sm text-slate-300"
                >
                  <Icon size={16} className="text-blue-400" />
                  <span>{milestone.text}</span>
                  <CheckCircle2 size={14} className="text-emerald-400" />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                custom={index}
                variants={cardVariants}
                whileHover="hover"
                className="group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-8 transition-all"
              >
                {/* Card Background Glow */}
                <div className={`absolute inset-0 bg-linear-to-br ${stat.linear} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Top Border linear */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r ${stat.linear.replace('/20', '')} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.bgColor} ${stat.color} shadow-lg`}
                  >
                    <Icon size={28} />
                  </motion.div>

                  {/* Value with Counter Animation */}
                  <motion.h3
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.15, type: "spring", stiffness: 200 }}
                    className="mt-8 text-5xl font-bold text-white"
                  >
                    <span className={stat.color}>{stat.value}</span>
                  </motion.h3>

                  {/* Label */}
                  <p className="mt-3 text-lg font-semibold text-white">
                    {stat.label}
                  </p>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {stat.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-500">Growth</span>
                      <span className={`text-xs font-medium ${stat.color}`}>
                        {stat.progress}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-800/80 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 + index * 0.2, duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full bg-linear-to-r ${stat.linear.replace('/20', '')}`}
                      />
                    </div>
                  </div>

                  {/* Trend Indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="mt-6 flex items-center gap-2 text-xs"
                  >
                    <ArrowUpRight className={`h-3 w-3 ${stat.color}`} />
                    <span className={stat.color}>+12% this month</span>
                  </motion.div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-linear-to-tl from-blue-500/5 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Star Decoration */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4"
                >
                  <Star size={16} className={`${stat.color} opacity-30`} />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-20 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm px-6 py-4"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20"
            >
              <Award className="h-4 w-4 text-emerald-400" />
            </motion.div>
            <div className="text-left">
              <p className="text-sm font-medium text-white">Trusted by 500+ Companies Worldwide</p>
              <p className="text-xs text-slate-400">Join the leading AI recruitment platform</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default StatsSection;