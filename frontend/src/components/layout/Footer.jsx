import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Sparkles,
  GitFork,
  CircleFadingPlus,
  Cloud,
  Mail,
  ArrowUpRight,
  Heart,
  Zap,
  Shield,
  BookOpen,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

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
        ease: "easeOut",
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.3,
      },
    }),
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.4 },
    },
    tap: { scale: 0.9 },
  };

  const productLinks = [
    { name: "Features", href: "#features", icon: Zap },
    { name: "Pricing", href: "upi://pay?pa=hazraankit668@oksbi&pn=Ankit%20Hazra&cu=INR", icon: Sparkles },
    { name: "Integrations", href: "https://ankithazra.online/", icon: ArrowUpRight },
  ];

  const resourceLinks = [
    { name: "Blog", href: "https://github.com/AnkitHazra/Job-Portal", icon: BookOpen },
    { name: "Career Guide", href: "https://www.linkedin.com/in/hazraankit2005/", icon: BriefcaseBusiness },
    { name: "Documentation", href: "https://github.com/AnkitHazra/Job-Portal", icon: MessageCircle },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/AnkitHazra", icon: GitFork },
    { name: "Twitter", href: "https://x.com/hazraAnkit790", icon: CircleFadingPlus },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/hazraankit2005/", icon: Cloud },
    { name: "Email", href: "mailto:hazraankit668@gmail.com", icon: Mail },
  ];

  return (
    <footer className="relative border-t border-slate-800/80 bg-linear-to-b from-slate-950 to-slate-900">
      {/* Top linear Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25"
              >
                <BriefcaseBusiness size={22} className="text-white" />
              </motion.div>

              <div>
                <h3 className="text-lg font-bold text-white">
                  Hirevity
                </h3>
                <p className="text-sm text-slate-400">
                  Smart Hiring Platform
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-slate-400">
              Transforming recruitment through AI-powered resume analysis, 
              intelligent job matching, and automated interview preparation.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    variants={socialIconVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-600 hover:bg-slate-700/50 transition-all"
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Product
            </h4>
            <ul className="mt-6 space-y-3">
              {productLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.li
                    key={index}
                    custom={index}
                    variants={linkVariants}
                  >
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 5 }}
                      className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      <Icon size={14} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
                      {link.name}
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -ml-1 text-blue-400 transition-all" />
                    </motion.a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Resources
            </h4>
            <ul className="mt-6 space-y-3">
              {resourceLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.li
                    key={index}
                    custom={index}
                    variants={linkVariants}
                  >
                    <motion.a
                      href={link.href}
                      whileHover={{ x: 5 }}
                      className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      <Icon size={14} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
                      {link.name}
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -ml-1 text-blue-400 transition-all" />
                    </motion.a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* Connect Section */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Connect
            </h4>
            <p className="mt-6 text-sm text-slate-400 leading-relaxed">
              Have questions or need support? We're here to help you find the best talent.
            </p>

            <motion.a
              href="mailto:hazraankit668@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-800/50 px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:border-slate-600 transition-all"
            >
              <Mail size={16} />
              Contact Support
              <ArrowUpRight size={14} />
            </motion.a>

            {/* Quick Stats */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-800/30 border border-slate-700/30 p-3 text-center">
                <p className="text-lg font-bold text-white">10K+</p>
                <p className="text-xs text-slate-500">Users</p>
              </div>
              <div className="rounded-xl bg-slate-800/30 border border-slate-700/30 p-3 text-center">
                <p className="text-lg font-bold text-white">500+</p>
                <p className="text-xs text-slate-500">Companies</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 border-t border-slate-800/50 pt-8"
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>© {currentYear} AI Recruitment Platform.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">All rights reserved.</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-flex items-center gap-1 text-rose-400"
              >
                <Heart size={14} className="fill-current" />
              </motion.span>
            </div>

            <div className="flex items-center gap-6">
              <motion.a
                href="https://www.linkedin.com/in/hazraankit2005/"
                whileHover={{ x: -2 }}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors"
              >
                <Shield size={14} />
                Privacy Policy
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/hazraankit2005/"
                whileHover={{ x: -2 }}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors"
              >
                <MessageCircle size={14} />
                Terms of Service
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;