import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getAllApplications } from "../../api/applicationApi";
import {
    Users,
    Briefcase,
    Building2,
    FileText,
    Search,
    Filter,
    ChevronDown,
    ArrowUpDown,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Clock,
    CheckCircle2,
    XCircle,
    Clock3,
    Eye,
    Download,
    ExternalLink,
    Loader2,
    Sparkles,
    TrendingUp,
    UserCheck,
    UserX,
    User,
    MoreHorizontal,
} from "lucide-react";

function ApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const data = await getAllApplications();
            setApplications(data.applications);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "shortlisted":
                return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
            case "rejected":
                return "bg-rose-500/20 text-rose-400 border-rose-500/30";
            case "reviewed":
                return "bg-blue-500/20 text-blue-400 border-blue-500/30";
            default:
                return "bg-amber-500/20 text-amber-400 border-amber-500/30";
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case "shortlisted":
                return <CheckCircle2 className="h-3.5 w-3.5" />;
            case "rejected":
                return <XCircle className="h-3.5 w-3.5" />;
            case "reviewed":
                return <Eye className="h-3.5 w-3.5" />;
            default:
                return <Clock3 className="h-3.5 w-3.5" />;
        }
    };

    const filteredApplications = applications
        .filter((app) => {
            const matchesSearch =
                app.applicant?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.job?.company?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.applicant?.email?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = !statusFilter || app.status?.toLowerCase() === statusFilter.toLowerCase();
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
            if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
            if (sortBy === "name") return a.applicant?.fullName?.localeCompare(b.applicant?.fullName);
            if (sortBy === "job") return a.job?.title?.localeCompare(b.job?.title);
            return 0;
        });

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

    const rowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: 0.3 + i * 0.08,
                duration: 0.4,
                ease: "easeOut",
            },
        }),
        hover: {
            backgroundColor: "rgba(30, 41, 59, 0.8)",
            x: 5,
            transition: { duration: 0.2 },
        },
    };

    const mobileCardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                delay: 0.3 + i * 0.1,
                duration: 0.4,
            },
        }),
        hover: {
            y: -3,
            scale: 1.02,
            transition: { duration: 0.2 },
        },
    };

    const statsData = [
        {
            label: "Total",
            value: applications.length,
            icon: Users,
            color: "text-blue-400",
            bgColor: "bg-blue-500/10",
        },
        {
            label: "Pending",
            value: applications.filter((a) => a.status === "pending").length,
            icon: Clock3,
            color: "text-amber-400",
            bgColor: "bg-amber-500/10",
        },
        {
            label: "Shortlisted",
            value: applications.filter((a) => a.status === "shortlisted").length,
            icon: UserCheck,
            color: "text-emerald-400",
            bgColor: "bg-emerald-500/10",
        },
        {
            label: "Rejected",
            value: applications.filter((a) => a.status === "rejected").length,
            icon: UserX,
            color: "text-rose-400",
            bgColor: "bg-rose-500/10",
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
                                    Applications
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    className="mt-2 text-slate-400 flex items-center gap-2"
                                >
                                    <TrendingUp className="h-4 w-4" />
                                    Review and manage all candidate applications
                                </motion.p>
                            </div>
                        </div>

                        {/* Total Count Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                            className="inline-flex items-center gap-2 rounded-xl bg-slate-800/50 border border-slate-700/50 px-4 py-2"
                        >
                            <Users className="h-4 w-4 text-blue-400" />
                            <span className="text-sm font-medium text-slate-300">
                                {applications.length} Application{applications.length !== 1 ? "s" : ""}
                            </span>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Statistics Cards */}
                    {!loading && applications.length > 0 && (
                        <motion.div
                            variants={itemVariants}
                            className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
                        >
                            {statsData.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        whileHover={{ y: -3, scale: 1.05 }}
                                        className="rounded-xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-4 shadow-lg"
                                    >
                                        <div className={`${stat.bgColor} w-fit rounded-lg p-2 mb-2`}>
                                            <Icon className={`h-4 w-4 ${stat.color}`} />
                                        </div>
                                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                                        <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}

                    {/* Search and Filters */}
                    {!loading && applications.length > 0 && (
                        <motion.div
                            variants={itemVariants}
                            className="mb-6 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 shadow-xl"
                        >
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by candidate, job, company, or email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full rounded-xl border border-slate-700/80 bg-slate-800/50 pl-11 pr-4 py-3 text-sm text-white placeholder-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <div className="relative">
                                        <select
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            className="appearance-none rounded-xl border border-slate-700/80 bg-slate-800/50 pl-4 pr-10 py-3 text-sm text-white transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                                        >
                                            <option value="">All Status</option>
                                            <option value="pending">Pending</option>
                                            <option value="reviewed">Reviewed</option>
                                            <option value="shortlisted">Shortlisted</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                    </div>
                                    <div className="relative">
                                        <select
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="appearance-none rounded-xl border border-slate-700/80 bg-slate-800/50 pl-4 pr-10 py-3 text-sm text-white transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                                        >
                                            <option value="newest">Newest First</option>
                                            <option value="oldest">Oldest First</option>
                                            <option value="name">Candidate Name</option>
                                            <option value="job">Job Title</option>
                                        </select>
                                        <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                            {(searchTerm || statusFilter) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="mt-3 pt-3 border-t border-slate-800/50"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-slate-400">
                                            {filteredApplications.length} application{filteredApplications.length !== 1 ? "s" : ""} found
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                setSearchTerm("");
                                                setStatusFilter("");
                                            }}
                                            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            Clear filters
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {/* Content */}
                    {loading ? (
                        <motion.div variants={itemVariants} className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                                    className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6"
                                >
                                    <div className="animate-pulse flex items-center gap-4">
                                        <div className="h-12 w-12 bg-slate-800 rounded-xl" />
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-slate-800 rounded-full w-1/3" />
                                            <div className="h-3 bg-slate-800 rounded-full w-1/4" />
                                        </div>
                                        <div className="h-8 w-24 bg-slate-800 rounded-full" />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : applications.length === 0 ? (
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col items-center justify-center py-20"
                        >
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="rounded-2xl bg-slate-800/50 p-8 mb-6"
                            >
                                <FileText className="h-16 w-16 text-slate-600" />
                            </motion.div>
                            <h3 className="text-xl font-semibold text-white mb-2">No Applications Yet</h3>
                            <p className="text-slate-400 text-center max-w-md">
                                Applications will appear here once candidates start applying to your job postings.
                            </p>
                        </motion.div>
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <motion.div
                                variants={itemVariants}
                                className="hidden md:block overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm shadow-xl"
                            >
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-slate-800/80 bg-slate-900/80">
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4" />
                                                        Candidate
                                                    </div>
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                                    <div className="flex items-center gap-2">
                                                        <Briefcase className="h-4 w-4" />
                                                        Job Position
                                                    </div>
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                                    <div className="flex items-center gap-2">
                                                        <Building2 className="h-4 w-4" />
                                                        Company
                                                    </div>
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4" />
                                                        Status
                                                    </div>
                                                </th>
                                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                                    Resume
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <AnimatePresence mode="popLayout">
                                                {filteredApplications.map((application, index) => (
                                                    <motion.tr
                                                        key={application._id}
                                                        custom={index}
                                                        variants={rowVariants}
                                                        initial="hidden"
                                                        animate="visible"
                                                        exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                                                        whileHover="hover"
                                                        className="border-b border-slate-800/50 transition-colors"
                                                    >
                                                        <td className="px-6 py-5">
                                                            <div className="flex items-center gap-3">
                                                                <motion.div
                                                                    whileHover={{ scale: 1.1 }}
                                                                    className="relative"
                                                                >
                                                                    <img
                                                                        src={
                                                                            application.applicant?.profilePicture ||
                                                                            "https://placehold.net/avatar-5.svg"
                                                                        }
                                                                        alt={application.applicant?.fullName}
                                                                        className="h-10 w-10 rounded-xl object-cover ring-2 ring-blue-500/20"
                                                                    />
                                                                    <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-slate-900 ${application.status === "shortlisted" ? "bg-emerald-400" :
                                                                            application.status === "rejected" ? "bg-rose-400" : "bg-amber-400"
                                                                        }`} />
                                                                </motion.div>
                                                                <div>
                                                                    <p className="font-semibold text-white">
                                                                        {application.applicant?.fullName || "Unknown"}
                                                                    </p>
                                                                    <div className="flex items-center gap-1 mt-0.5">
                                                                        <Mail className="h-3 w-3 text-slate-500" />
                                                                        <p className="text-xs text-slate-400">
                                                                            {application.applicant?.email || "No email"}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <p className="font-medium text-white">{application.job?.title || "N/A"}</p>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className="flex items-center gap-2">
                                                                <div className="h-7 w-7 rounded-lg bg-slate-800 flex items-center justify-center">
                                                                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                                                                </div>
                                                                <p className="text-slate-300">
                                                                    {application.job?.company?.name || "N/A"}
                                                                </p>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <motion.span
                                                                whileHover={{ scale: 1.05 }}
                                                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border ${getStatusColor(
                                                                    application.status
                                                                )}`}
                                                            >
                                                                {getStatusIcon(application.status)}
                                                                {application.status?.charAt(0).toUpperCase() + application.status?.slice(1) || "Pending"}
                                                            </motion.span>
                                                        </td>
                                                        <td className="px-6 py-5 text-right">
                                                            {application.applicant?.resumeUrl ? (
                                                                <motion.a
                                                                    href={application.applicant.resumeUrl}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-2 text-xs font-medium text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition-all"
                                                                >
                                                                    <Download className="h-3.5 w-3.5" />
                                                                    Resume
                                                                </motion.a>
                                                            ) : (
                                                                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                                                                    <FileText className="h-3.5 w-3.5" />
                                                                    No Resume
                                                                </span>
                                                            )}
                                                        </td>
                                                    </motion.tr>
                                                ))}
                                            </AnimatePresence>
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>

                            {/* Mobile Cards */}
                            <motion.div
                                variants={itemVariants}
                                className="space-y-4 md:hidden"
                            >
                                <AnimatePresence mode="popLayout">
                                    {filteredApplications.map((application, index) => (
                                        <motion.div
                                            key={application._id}
                                            custom={index}
                                            variants={mobileCardVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                            whileHover="hover"
                                            className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-5 shadow-lg"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <motion.div
                                                        whileHover={{ scale: 1.1 }}
                                                        className="relative"
                                                    >
                                                        <img
                                                            src={
                                                                application.applicant?.profilePicture ||
                                                                "https://placehold.net/avatar-5.svg"
                                                            }
                                                            alt={application.applicant?.fullName}
                                                            className="h-12 w-12 rounded-xl object-cover ring-2 ring-blue-500/20"
                                                        />
                                                        <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-slate-900 ${application.status === "shortlisted" ? "bg-emerald-400" :
                                                                application.status === "rejected" ? "bg-rose-400" : "bg-amber-400"
                                                            }`} />
                                                    </motion.div>
                                                    <div>
                                                        <h3 className="font-semibold text-white">
                                                            {application.applicant?.fullName || "Unknown"}
                                                        </h3>
                                                        <div className="flex items-center gap-1 mt-0.5">
                                                            <Mail className="h-3 w-3 text-slate-500" />
                                                            <p className="text-xs text-slate-400">
                                                                {application.applicant?.email || "No email"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <motion.span
                                                    whileHover={{ scale: 1.05 }}
                                                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border ${getStatusColor(
                                                        application.status
                                                    )}`}
                                                >
                                                    {getStatusIcon(application.status)}
                                                    {application.status?.charAt(0).toUpperCase() + application.status?.slice(1) || "Pending"}
                                                </motion.span>
                                            </div>

                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Briefcase className="h-4 w-4 text-slate-500" />
                                                    <span className="text-slate-300">{application.job?.title || "N/A"}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Building2 className="h-4 w-4 text-slate-500" />
                                                    <span className="text-slate-300">{application.job?.company?.name || "N/A"}</span>
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-slate-800/50">
                                                {application.applicant?.resumeUrl ? (
                                                    <motion.a
                                                        href={application.applicant.resumeUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className="inline-flex items-center gap-2 rounded-lg bg-blue-500/10 border border-blue-500/20 px-4 py-2.5 text-sm font-medium text-blue-400 hover:bg-blue-500/20 transition-all w-full justify-center"
                                                    >
                                                        <Download className="h-4 w-4" />
                                                        View Resume
                                                    </motion.a>
                                                ) : (
                                                    <span className="inline-flex items-center justify-center gap-2 text-sm text-slate-500 w-full py-2.5">
                                                        <FileText className="h-4 w-4" />
                                                        No Resume Available
                                                    </span>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </DashboardLayout>
    );
}

export default ApplicationsPage;