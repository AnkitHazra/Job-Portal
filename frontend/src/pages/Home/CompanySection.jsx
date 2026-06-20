import { motion } from "framer-motion";
import {
  Building2,
  ArrowRight,
  Sparkles,
  Star,
  Users,
  TrendingUp,
  MapPin,
  Briefcase,
  ExternalLink,
} from "lucide-react";
import { Link } from 'react-router-dom';

function CompanySection() {
  const companies = [
    {
      name: "Google",
      hiring: "120+ Open Roles",
      logo: "G",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      textColor: "text-blue-400",
      location: "Multiple Locations",
      industry: "Technology",
    },
    {
      name: "Microsoft",
      hiring: "85+ Open Roles",
      logo: "M",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/20",
      textColor: "text-violet-400",
      location: "Remote & On-site",
      industry: "Software",
    },
    {
      name: "Amazon",
      hiring: "150+ Open Roles",
      logo: "A",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      textColor: "text-amber-400",
      location: "Worldwide",
      industry: "E-commerce",
    },
    {
      name: "Netflix",
      hiring: "40+ Open Roles",
      logo: "N",
      color: "from-rose-500 to-red-500",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-500/20",
      textColor: "text-rose-400",
      location: "Los Gatos, CA",
      industry: "Entertainment",
    },
    {
      name: "Adobe",
      hiring: "60+ Open Roles",
      logo: "A",
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      textColor: "text-emerald-400",
      location: "San Jose, CA",
      industry: "Creative Software",
    },
    {
      name: "Spotify",
      hiring: "30+ Open Roles",
      logo: "S",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      textColor: "text-green-400",
      location: "Stockholm, Sweden",
      industry: "Music Streaming",
    },
  ];

  const statsData = [
    { value: "500+", label: "Partner Companies", icon: Building2 },
    { value: "10K+", label: "Active Jobs", icon: Briefcase },
    { value: "50K+", label: "Hired Candidates", icon: Users },
    { value: "95%", label: "Satisfaction Rate", icon: TrendingUp },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        delay: 0.4 + i * 0.1,
        duration: 0.5,
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
    <section id="companies" className="relative bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 py-24 overflow-hidden">
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
          className="absolute -top-40 left-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"
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
          className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl"
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
              Trusted Companies
            </motion.span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mt-8 text-4xl font-bold text-white md:text-5xl lg:text-6xl"
          >
            Top Companies
            <br />
            <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Hiring Now
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Discover opportunities from industry leaders and innovative startups 
            looking for talented professionals like you.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className="rounded-xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-sm p-4 text-center"
                >
                  <Icon className="h-5 w-5 text-blue-400 mx-auto mb-2" />
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Company Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              custom={index}
              variants={cardVariants}
              whileHover="hover"
              className="group relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-8 transition-all cursor-pointer"
            >
              {/* Card Background Glow */}
              <div className={`absolute inset-0 bg-linear-to-br ${company.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Top Border linear */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r ${company.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative z-10">
                {/* Company Logo */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br ${company.color} text-2xl font-bold text-white shadow-lg`}
                >
                  {company.logo}
                </motion.div>

                {/* Company Info */}
                <div className="mt-6">
                  <h3 className="text-2xl font-semibold text-white group-hover:text-transparent group-hover:bg-linear-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-blue-200 transition-all">
                    {company.name}
                  </h3>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className={`h-4 w-4 ${company.textColor}`} />
                      <span className="text-slate-400">{company.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className={`h-4 w-4 ${company.textColor}`} />
                      <span className="text-slate-400">{company.industry}</span>
                    </div>
                  </div>
                </div>

                {/* Hiring Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                  className={`mt-4 inline-flex items-center gap-1.5 rounded-full ${company.bgColor} ${company.borderColor} border px-3 py-1.5`}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`h-1.5 w-1.5 rounded-full ${company.textColor}`}
                  />
                  <span className={`text-xs font-medium ${company.textColor}`}>
                    {company.hiring}
                  </span>
                </motion.div>

                {/* View Jobs Button */}
                <motion.button
                  whileHover={{ x: 5 }}
                  className={`mt-6 flex items-center gap-2 ${company.textColor} font-medium transition-all group-hover:gap-3`}
                >
                  View Open Positions
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </motion.button>
              </div>

              {/* Decorative Element */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-linear-to-tl from-blue-500/5 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Corner Stars */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute top-4 right-4"
              >
                <Star size={16} className={`${company.textColor} opacity-50`} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.Link
          to="/jobs"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }} 
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-800/50 backdrop-blur-sm px-8 py-4 font-semibold text-slate-300 hover:text-white hover:border-slate-600 transition-all"
          >
            <Building2 size={20} /> 
            <Link to="/jobs">View All Companies</Link>
            <ExternalLink size={16} />
          </motion.Link>
        </motion.div>
      </div>
    </section>
  );
}

export default CompanySection;