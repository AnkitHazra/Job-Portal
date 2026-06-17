import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowRight,
  Star,
  Zap,
  Users,
  Building2,
  CheckCircle2,
  Globe,
  Shield,
  TrendingUp,
} from 'lucide-react';

function CTASection() {
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

  const floatingElements = [
    { icon: Users, position: "top-10 left-10", delay: 0 },
    { icon: Building2, position: "top-10 right-10", delay: 0.2 },
    { icon: Zap, position: "bottom-10 left-20", delay: 0.4 },
    { icon: Globe, position: "bottom-10 right-20", delay: 0.6 },
  ];

  const benefits = [
    { icon: CheckCircle2, text: "AI-Powered Matching" },
    { icon: Shield, text: "Secure Platform" },
    { icon: TrendingUp, text: "95% Success Rate" },
  ];

  return (
    <section className="relative bg-linear-to-b from-slate-950 to-slate-900 px-6 pb-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* Main CTA Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden rounded-[40px] border border-slate-700/50 bg-linear-to-br from-blue-950 via-indigo-950 to-violet-900 p-12 md:p-16 text-center text-white shadow-2xl shadow-blue-500/10"
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-linear(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '30px 30px',
              }}
            />
          </div>

          {/* Floating Elements */}
          {floatingElements.map((element, index) => {
            const Icon = element.icon;
            return (
              <motion.div
                key={index}
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: element.delay,
                  ease: "easeInOut",
                }}
                className={`absolute ${element.position} hidden md:block`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <Icon size={20} className="text-blue-300" />
                </div>
              </motion.div>
            );
          })}

          {/* Content */}
          <div className="relative z-10">
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-sm text-blue-200"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={16} />
                </motion.div>
                Join 10,000+ Users
              </motion.span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="mt-8 text-4xl font-bold md:text-5xl lg:text-6xl"
            >
              Ready To Transform
              <br />
              <span className="bg-linear-to-r from-blue-300 via-white to-violet-300 bg-clip-text text-transparent">
                Your Hiring Process?
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg text-blue-100/80 max-w-2xl mx-auto leading-relaxed"
            >
              Join thousands of recruiters and candidates already using AI-powered 
              tools to improve hiring outcomes and find the perfect match.
            </motion.p>

            {/* Benefits */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap justify-center gap-6"
            >
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.15 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-sm text-blue-200"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                      <Icon size={14} className="text-emerald-300" />
                    </div>
                    {benefit.text}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-wrap justify-center gap-4"
            >
              {/* Primary CTA */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 shadow-lg shadow-white/10 hover:shadow-white/20 transition-all"
                >
                  Get Started Free
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <ArrowRight size={20} />
                  </motion.span>
                </Link>
              </motion.div>

              {/* Secondary CTA */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 backdrop-blur-sm px-8 py-4 font-semibold text-white hover:bg-white/10 hover:border-white/40 transition-all"
                >
                  <Star size={20} />
                  View Demo
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-200/60"
            >
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>10,000+ Users</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-blue-200/30" />
              <div className="flex items-center gap-2">
                <Building2 size={16} />
                <span>500+ Companies</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-blue-200/30" />
              <div className="flex items-center gap-2">
                <Globe size={16} />
                <span>30+ Countries</span>
              </div>
            </motion.div>
          </div>

          {/* Decorative linear Lines */}
          <div className="absolute top-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-blue-400/50 to-transparent" />
          <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-linear-to-r from-transparent via-violet-400/50 to-transparent" />

          {/* Corner Glows */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;