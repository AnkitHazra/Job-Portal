import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { analyzeExistingResume, getATSData } from "../../api/resumeApi";
import {
    FileText,
    Sparkles,
    TrendingUp,
    Target,
    AlertCircle,
    Loader2,
    Star,
    Brain,
    ClipboardCheck,
    FileBarChart,
    ChevronDown,
    ArrowRight,
    Upload,
    CheckCircle2,
    RefreshCw,
    ExternalLink,
} from "lucide-react";

function ATSScore() {
    const { user } = useAuth();
    const [jobTitle, setJobTitle] = useState("");
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const [showAllSuggestions, setShowAllSuggestions] = useState(false);

    const jobTitles = [
        "Software Developer",
        "Data Analyst",
        "Marketing Manager",
        "HR Manager",
        "Project Manager",
        "Business Analyst",
        "UX Designer",
        "DevOps Engineer",
    ];

    useEffect(() => {
        fetchPreviousData();
    }, []);

    const fetchPreviousData = async () => {
        try {
            const data = await getATSData();
            if (data.atsScore > 0) {
                setResult({
                    atsScore: data.atsScore,
                    analysis: data.atsAnalysis,
                    suggestions: data.atsSuggestions,
                    keywords: data.atsKeywords,
                });
                setJobTitle(data.atsJobTitle || "");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingData(false);
        }
    };

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!jobTitle) return;

        setAnalyzing(true);
        try {
            const data = await analyzeExistingResume(jobTitle);
            setResult(data.resume);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to analyze resume");
        } finally {
            setAnalyzing(false);
        }
    };

    const getScoreColor = (score) => {
        if (score >= 80) return "text-emerald-400";
        if (score >= 60) return "text-amber-400";
        return "text-rose-400";
    };

    const getScoreGradient = (score) => {
        if (score >= 80) return "from-emerald-400 to-green-500";
        if (score >= 60) return "from-amber-400 to-orange-500";
        return "from-rose-400 to-red-500";
    };

    const getScoreLabel = (score) => {
        if (score >= 80) return "Excellent";
        if (score >= 60) return "Good";
        if (score >= 40) return "Average";
        return "Needs Improvement";
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
        },
    };

    return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="py-8 px-4 sm:px-6 lg:px-8 mt-15 sm:mt-0"
            >
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8"
                >
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
                                ATS Score Analyzer
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="mt-2 text-slate-400 flex items-center gap-2"
                            >
                                <Sparkles className="h-4 w-4 text-blue-400" />
                                Analyze your uploaded resume against job descriptions
                            </motion.p>
                        </div>
                    </div>
                </motion.div>

                {/* No Resume Warning */}
                {!loadingData && !user?.resumeUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5"
                    >
                        <div className="flex items-start gap-4">
                            <div className="rounded-xl bg-amber-500/10 p-3 shrink-0">
                                <AlertCircle className="h-6 w-6 text-amber-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-amber-400">No Resume Found</h3>
                                <p className="mt-1 text-sm text-slate-400">
                                    You need to upload your resume first before analyzing it for ATS score.
                                </p>
                                <Link
                                    to="/candidate/profile"
                                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-2 text-sm font-medium text-amber-400 hover:bg-amber-500/20 transition-all"
                                >
                                    <Upload className="h-4 w-4" />
                                    Upload Resume in Profile
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}

                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-8 lg:grid-cols-2">
                    {/* Analysis Form */}
                    <motion.div variants={itemVariants}>
                        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 shadow-xl">
                            <h2 className="text-xl font-semibold text-white mb-6">Analyze Resume</h2>

                            {/* Current Resume Info */}
                            {user?.resumeUrl && (
                                <div className="mb-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-blue-400" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-blue-300">Resume Available</p>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                Your uploaded resume will be analyzed
                                            </p>
                                        </div>
                                        <a
                                            href={user.resumeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                                        >
                                            <ExternalLink className="h-3 w-3" />
                                            View
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* Job Title Selection */}
                            <div className="mb-6">
                                <label className="mb-2 block text-xs font-medium text-slate-400">
                                    Target Job Title
                                </label>
                                <div className="relative">
                                    <select
                                        value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
                                        className="w-full appearance-none rounded-xl border border-slate-700/80 bg-slate-800/50 pl-4 pr-10 py-3 text-sm text-white transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-slate-600 cursor-pointer"
                                        required
                                    >
                                        <option value="">Select job title</option>
                                        {jobTitles.map((title) => (
                                            <option key={title} value={title}>
                                                {title}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                onClick={handleAnalyze}
                                disabled={!jobTitle || analyzing || !user?.resumeUrl}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full rounded-xl bg-linear-to-r from-blue-500 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {analyzing ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Analyzing Resume...
                                    </>
                                ) : (
                                    <>
                                        <Brain className="h-4 w-4" />
                                        Analyze Resume
                                    </>
                                )}
                            </motion.button>

                            {/* Re-analyze Button */}
                            {result && !analyzing && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    onClick={handleAnalyze}
                                    disabled={!jobTitle || analyzing}
                                    className="w-full mt-3 rounded-xl border border-slate-700/80 px-6 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all flex items-center justify-center gap-2"
                                >
                                    <RefreshCw className="h-4 w-4" />
                                    Re-analyze with New Job Title
                                </motion.button>
                            )}
                        </div>
                    </motion.div>

                    {/* Results */}
                    <motion.div variants={itemVariants}>
                        {loadingData ? (
                            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 shadow-xl flex items-center justify-center h-full">
                                <Loader2 className="h-8 w-8 text-blue-400 animate-spin" />
                            </div>
                        ) : result ? (
                            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 shadow-xl">
                                <h2 className="text-xl font-semibold text-white mb-6">Analysis Results</h2>

                                {/* Overall Score */}
                                <div className="text-center mb-8">
                                    <div className="relative inline-flex items-center justify-center">
                                        <svg className="h-32 w-32 -rotate-90" viewBox="0 0 36 36">
                                            <circle
                                                cx="18" cy="18" r="16"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                className="text-slate-700"
                                            />
                                            <motion.circle
                                                cx="18" cy="18" r="16"
                                                fill="none"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                stroke="currentColor"
                                                className={getScoreColor(result.atsScore)}
                                                strokeDasharray={`${(result.atsScore / 100) * 100.53} 100.53`}
                                                initial={{ strokeDasharray: "0 100.53" }}
                                                animate={{ strokeDasharray: `${(result.atsScore / 100) * 100.53} 100.53` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            />
                                        </svg>
                                        <div className="absolute text-center">
                                            <span className={`text-3xl font-bold ${getScoreColor(result.atsScore)}`}>
                                                {result.atsScore}
                                            </span>
                                            <span className="text-xs text-slate-400 block">/100</span>
                                        </div>
                                    </div>
                                    <p className={`mt-2 text-sm font-medium ${getScoreColor(result.atsScore)}`}>
                                        {getScoreLabel(result.atsScore)}
                                    </p>
                                </div>

                                {/* Detailed Scores */}
                                <div className="space-y-4">
                                    {[
                                        { label: "Keyword Match", value: result.analysis.keywordMatch, max: 40, icon: Target },
                                        { label: "Format", value: result.analysis.formatScore, max: 20, icon: FileText },
                                        { label: "Skills", value: result.analysis.skillsMatch, max: 20, icon: Brain },
                                        { label: "Experience", value: result.analysis.experienceScore, max: 10, icon: TrendingUp },
                                        { label: "Education", value: result.analysis.educationScore, max: 10, icon: Star },
                                    ].map((item, index) => {
                                        const Icon = item.icon;
                                        return (
                                            <div key={index}>
                                                <div className="flex justify-between mb-2">
                                                    <div className="flex items-center gap-2 text-sm text-slate-400">
                                                        <Icon className="h-3.5 w-3.5" />
                                                        {item.label}
                                                    </div>
                                                    <span className="text-sm font-medium text-white">{item.value}/{item.max}</span>
                                                </div>
                                                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${(item.value / item.max) * 100}%` }}
                                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                                        className={`h-full rounded-full bg-linear-to-r ${getScoreGradient(result.atsScore)}`}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Keywords Found */}
                                {result.keywords && result.keywords.length > 0 && (
                                    <div className="mt-6">
                                        <h3 className="text-sm font-medium text-slate-400 mb-3">Keywords Found</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {result.keywords.map((keyword, i) => (
                                                <motion.span
                                                    key={i}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-xs font-medium text-emerald-400"
                                                >
                                                    {keyword}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 shadow-xl flex items-center justify-center h-full">
                                <div className="text-center">
                                    <FileBarChart className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                                    <p className="text-slate-400">Select a job title and click analyze</p>
                                    <p className="text-xs text-slate-500 mt-2">Your ATS score will appear here</p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>

                {/* Suggestions */}
                {result && result.suggestions && result.suggestions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="mt-8 rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm p-6 sm:p-8 shadow-xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="rounded-xl bg-amber-500/10 p-2.5">
                                <ClipboardCheck className="h-5 w-5 text-amber-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-white">Suggestions for Improvement</h2>
                        </div>
                        <div className="space-y-3">
                            {result.suggestions
                                .slice(0, showAllSuggestions ? undefined : 3)
                                .map((suggestion, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.9 + index * 0.1 }}
                                        className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/30"
                                    >
                                        <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                                        <p className="text-sm text-slate-300">{suggestion}</p>
                                    </motion.div>
                                ))}
                        </div>
                        {result.suggestions.length > 3 && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowAllSuggestions(!showAllSuggestions)}
                                className="mt-4 text-sm text-blue-400 hover:text-blue-300"
                            >
                                {showAllSuggestions ? "Show Less" : `Show All ${result.suggestions.length} Suggestions`}
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </motion.div>
        
    );
}

export default ATSScore;