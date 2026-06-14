import {
  Brain,
  BriefcaseBusiness,
  FileText,
  Sparkles,
} from "lucide-react";
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion';

function HeroSection() {
  return (
    <section className="pt-8 md:pt-12 bg-slate-950 text-white">

      {/* Background Glow */}

      <div className="absolute inset-0 bg-linear-to-b from-slate-950 to-transparent"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div data-aos="fade-right" >

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
              <Sparkles size={16} />
              AI Powered Recruitment Platform
            </div>

            <motion.h1  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }} className="mt-8 text-6xl font-bold leading-tight md:text-7xl">
              Hire Smarter.
              <br />
              Match Faster.
            </motion.h1>

            <p className="mt-8 max-w-xl text-lg text-slate-400">
              AI-powered hiring platform that helps
              recruiters discover top talent and
              candidates find the right opportunities.
            </p>

            <div className="mt-10 flex gap-4">
              <Link to="/login" className="rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-700">
                Find Jobs
              </Link>

              <Link to="/login" className="rounded-xl border border-slate-700 px-6 py-3 font-semibold hover:bg-slate-800">
                Hire Talent
              </Link>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div data-aos="fade-left">

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">

              <div className="flex items-center justify-between">
                <h3 className="font-semibold">
                  AI Candidate Insights
                </h3>

                <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
                  Live
                </span>
              </div>

              <div className="mt-8 space-y-5">

                <div className="rounded-2xl bg-slate-800 p-5">
                  <div className="flex items-center gap-3">
                    <FileText size={20} />
                    <p>ATS Score</p>
                  </div>

                  <h3 className="mt-3 text-4xl font-bold text-green-400">
                    92%
                  </h3>

                  <div className="mt-3 h-2 rounded-full bg-slate-700">
                    <div className="h-2 w-[92%] rounded-full bg-green-500"></div>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-800 p-5">
                  <div className="flex items-center gap-3">
                    <BriefcaseBusiness size={20} />
                    <p>Job Match Score</p>
                  </div>

                  <h3 className="mt-3 text-4xl font-bold text-blue-400">
                    89%
                  </h3>

                  <div className="mt-3 h-2 rounded-full bg-slate-700">
                    <div className="h-2 w-[89%] rounded-full bg-blue-500"></div>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-800 p-5">
                  <div className="flex items-center gap-3">
                    <Brain size={20} />
                    <p>Interview Readiness</p>
                  </div>

                  <h3 className="mt-3 text-3xl font-bold">
                    Strong
                  </h3>
                </div>

              </div>

            </div>

          </div>

        </div>
<div data-aos="fade-down" className="mt-12 flex flex-wrap justify-center gap-8">
  {[
    "AI Resume Analysis",
    "Smart Job Matching",
    "Interview Preparation"
  ].map((feature, idx) => (
    <div
      key={idx}
      className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/50 px-6 py-3 text-slate-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:border-emerald-500 dark:hover:bg-emerald-900/20"
    >
      <span className="text-xl text-emerald-500 transition-transform duration-300 group-hover:scale-110">✓</span>
      <span className="font-medium">{feature}</span>
    </div>
  ))}
</div>
      </div>

    </section>
  );
}

export default HeroSection;