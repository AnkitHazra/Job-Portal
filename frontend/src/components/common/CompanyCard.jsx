import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  Globe,
  Users,
  Briefcase,
  ArrowUpRight,
  Calendar,
  Mail,
  Phone,
} from "lucide-react";

function CompanyCard({ company }) {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const iconAnimation = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="group rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 shadow-xl transition-all cursor-pointer relative overflow-hidden"
    >
      {/* Background linear Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-blue-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Decorative Line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        {/* Header Section */}
        <div className="flex items-start gap-4">
          <motion.div
            variants={iconAnimation}
            whileHover="hover"
            className="h-14 w-14 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-blue-500/25 shrink-0"
          >
            {company.name?.charAt(0)?.toUpperCase() || "C"}
          </motion.div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors truncate">
              {company.name || "Unnamed Company"}
            </h3>
            
            <div className="flex flex-wrap gap-3 mt-2">
              {company.location && (
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" />
                  {company.location}
                </span>
              )}
              
              {company.website && (
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                  <Globe className="h-3.5 w-3.5 text-slate-500" />
                  <span className="truncate max-w-37.5">
                    {company.website.replace(/^https?:\/\//, '')}
                  </span>
                </span>
              )}
            </div>
          </div>

          {/* Arrow Indicator */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="shrink-0 opacity-0 group-hover:opacity-100 transition-all"
          >
            <div className="rounded-lg bg-blue-500/10 p-2">
              <ArrowUpRight className="h-4 w-4 text-blue-400" />
            </div>
          </motion.div>
        </div>

        {/* Description */}
        {company.description && (
          <motion.div
            initial={{ opacity: 1 }}
            className="mt-4"
          >
            <div className="h-px bg-linear-to-r from-transparent via-slate-700/50 to-transparent mb-4" />
            <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
              {company.description}
            </p>
          </motion.div>
        )}

        {/* Additional Info */}
        {(company.industry || company.size || company.founded) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {company.industry && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-xs font-medium text-blue-400">
                <Briefcase className="h-3 w-3" />
                {company.industry}
              </span>
            )}
            
            {company.size && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 text-xs font-medium text-purple-400">
                <Users className="h-3 w-3" />
                {company.size}
              </span>
            )}
            
            {company.founded && (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-400">
                <Calendar className="h-3 w-3" />
                Est. {company.founded}
              </span>
            )}
          </div>
        )}

        {/* Contact Info */}
        {(company.email || company.phone) && (
          <div className="mt-4 pt-4 border-t border-slate-800/50 space-y-2">
            {company.email && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Mail className="h-3.5 w-3.5 text-slate-500" />
                <span className="truncate">{company.email}</span>
              </div>
            )}
            {company.phone && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Phone className="h-3.5 w-3.5 text-slate-500" />
                <span>{company.phone}</span>
              </div>
            )}
          </div>
        )}

        {/* Bottom linear Border on Hover */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
}

export default CompanyCard;