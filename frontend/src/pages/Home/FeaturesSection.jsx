import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  FileText,
  BriefcaseBusiness,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  Star,
  CheckCircle2,
  Target,
  ChevronDown,
  X,
} from "lucide-react";

function FeaturesSection() {
  const [expandedCard, setExpandedCard] = useState(null);

  const features = [
    {
      title: "AI Resume Analysis",
      description:
        "Upload resumes and instantly receive ATS scores, skill gap analysis, and actionable improvement suggestions.",
      icon: FileText,
      linear: "from-blue-500/20 to-cyan-500/20",
      borderGradient: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      stats: [
        { label: "ATS Score", value: "92%" },
        { label: "Accuracy", value: "98%" },
      ],
      detailedDescription: {
        overview: "Our AI-powered resume analysis tool uses advanced machine learning algorithms to evaluate resumes against job descriptions and industry standards.",
        features: [
          "Instant ATS compatibility scoring",
          "Keyword optimization suggestions",
          "Format and structure analysis",
          "Industry-specific recommendations",
          "Skill gap identification",
          "Custom improvement roadmap"
        ],
        benefits: "Increase your interview chances by up to 75% with optimized resumes that pass through ATS systems and catch recruiter attention."
      }
    },
    {
      title: "Smart Job Matching",
      description:
        "Match candidates with the most relevant jobs using AI-powered compatibility scoring and skill analysis.",
      icon: BriefcaseBusiness,
      linear: "from-violet-500/20 to-purple-500/20",
      borderGradient: "from-violet-500 to-purple-500",
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
      stats: [
        { label: "Match Rate", value: "95%" },
        { label: "Speed", value: "2x" },
      ],
      detailedDescription: {
        overview: "Our intelligent matching engine analyzes hundreds of data points to connect the right candidates with the perfect job opportunities.",
        features: [
          "AI-powered compatibility scoring",
          "Real-time skill matching",
          "Cultural fit assessment",
          "Salary expectation alignment",
          "Location preference mapping",
          "Career growth potential analysis"
        ],
        benefits: "Reduce time-to-hire by 60% while improving candidate quality and satisfaction with precise job matching."
      }
    },
    {
      title: "Interview Preparation",
      description:
        "Generate personalized technical and HR interview questions based on skills and job roles.",
      icon: Brain,
      linear: "from-emerald-500/20 to-green-500/20",
      borderGradient: "from-emerald-500 to-green-500",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      stats: [
        { label: "Success", value: "85%" },
        { label: "Questions", value: "500+" },
      ],
      detailedDescription: {
        overview: "Get personalized interview preparation with AI-generated questions, real-time feedback, and comprehensive performance analytics.",
        features: [
          "Role-specific technical questions",
          "Behavioral interview scenarios",
          "Real-time answer evaluation",
          "Confidence scoring system",
          "Mock interview simulations",
          "Performance tracking dashboard"
        ],
        benefits: "Boost interview confidence and success rate with tailored preparation that simulates real interview conditions."
      }
    },
  ];

  const additionalFeatures = [
    { icon: Zap, text: "Real-time Analysis" },
    { icon: Shield, text: "Data Security" },
    { icon: TrendingUp, text: "Advanced Analytics" },
    { icon: Target, text: "Precision Matching" },
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
        delay: 0.4 + i * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const expandedContentVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      marginTop: 0,
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      marginTop: 24,
      transition: {
        height: {
          duration: 0.4,
          ease: "easeOut",
        },
        opacity: {
          duration: 0.3,
          delay: 0.1,
        },
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      transition: {
        height: {
          duration: 0.3,
          ease: "easeIn",
        },
        opacity: {
          duration: 0.2,
        },
      },
    },
  };

  const handleCardClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section id="features" className="relative bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 py-32 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-0 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-0 bottom-20 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl"
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
        {/* Heading */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-3xl text-center"
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
              Core Features
            </motion.span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mt-8 text-4xl font-bold md:text-5xl lg:text-6xl"
          >
            Everything Needed For
            <br />
            <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Modern Hiring
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg leading-relaxed text-slate-400 max-w-2xl mx-auto"
          >
            Recruiters and candidates get powerful AI tools that streamline 
            hiring, improve matching, and increase interview success.
          </motion.p>

          {/* Additional Feature Pills */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {additionalFeatures.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm px-4 py-2 text-sm text-slate-300"
                >
                  <Icon size={16} className="text-blue-400" />
                  {item.text}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20 grid gap-8 lg:grid-cols-3"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isExpanded = expandedCard === index;

            return (
              <motion.div
                key={feature.title}
                custom={index}
                variants={cardVariants}
                whileHover={!isExpanded ? "hover" : undefined}
                className={`group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-8 transition-all ${
                  isExpanded ? 'lg:col-span-3 lg:row-span-1' : ''
                }`}
              >
                {/* Card Glow Background */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${feature.linear} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Top Border linear */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r ${feature.borderGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.iconBg} ${feature.iconColor} shadow-lg`}
                  >
                    <Icon size={28} />
                  </motion.div>

                  {/* Title & Description */}
                  <h3 className="mt-8 text-2xl font-semibold text-white group-hover:text-transparent group-hover:bg-linear-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-blue-200 transition-all">
                    {feature.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-slate-400">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    {feature.stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + index * 0.2 + i * 0.1 }}
                        className="rounded-xl bg-slate-800/50 border border-slate-700/50 p-3 text-center"
                      >
                        <p className={`text-lg font-bold ${feature.iconColor}`}>
                          {stat.value}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => handleCardClick(index)}
                    className={`mt-8 flex items-center gap-2 ${feature.iconColor} transition-all group-hover:gap-4 font-medium`}
                  >
                    {isExpanded ? 'Show Less' : 'Learn More'}
                    <motion.span
                      animate={{ 
                        x: isExpanded ? 0 : [0, 3, 0],
                        rotate: isExpanded ? 180 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={18} />
                    </motion.span>
                  </motion.button>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      variants={expandedContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="relative z-10 overflow-hidden"
                    >
                      <div className="border-t border-slate-700/50 pt-6">
                        <div className="grid lg:grid-cols-2 gap-8">
                          {/* Overview & Benefits */}
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Overview</h4>
                            <p className="text-slate-400 leading-relaxed">
                              {feature.detailedDescription.overview}
                            </p>
                            
                            <div className="mt-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                              <div className="flex items-center gap-2 mb-3">
                                <Star className="h-4 w-4 text-amber-400" />
                                <h4 className="text-sm font-semibold text-white">Key Benefit</h4>
                              </div>
                              <p className="text-sm text-slate-400 leading-relaxed">
                                {feature.detailedDescription.benefits}
                              </p>
                            </div>
                          </div>

                          {/* Feature List */}
                          <div>
                            <h4 className="text-lg font-semibold text-white mb-4">Key Features</h4>
                            <div className="space-y-3">
                              {feature.detailedDescription.features.map((item, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.2 + i * 0.1 }}
                                  className="flex items-center gap-3"
                                >
                                  <div className={`shrink-0 h-5 w-5 rounded-full ${feature.iconBg} flex items-center justify-center`}>
                                    <CheckCircle2 className={`h-3 w-3 ${feature.iconColor}`} />
                                  </div>
                                  <span className="text-sm text-slate-300">{item}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Corner Decoration */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-linear-to-tl from-blue-500/5 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Decorative Dots */}
                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                  <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-indigo-700 transition-all"
          >
            <Star size={20} />
            Explore All Features
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default FeaturesSection;