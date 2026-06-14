import {
  Brain,
  FileText,
  BriefcaseBusiness,
  ArrowRight,
} from "lucide-react";

function FeaturesSection() {
  const features = [
    {
      title: "AI Resume Analysis",
      description:
        "Upload resumes and instantly receive ATS scores, skill gap analysis, and actionable improvement suggestions.",
      icon: FileText,
      gradient:
        "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Smart Job Matching",
      description:
        "Match candidates with the most relevant jobs using AI-powered compatibility scoring.",
      icon: BriefcaseBusiness,
      gradient:
        "from-violet-500/20 to-purple-500/20",
    },
    {
      title: "Interview Preparation",
      description:
        "Generate personalized technical and HR interview questions based on skills and job roles.",
      icon: Brain,
      gradient:
        "from-emerald-500/20 to-green-500/20",
    },
  ];

  return (
    <section  id="features" className="relative bg-slate-950 py-32 text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"></div>
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div data-aos="zoom-in-down" className="mx-auto max-w-3xl text-center">

          <span className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
            Core Features
          </span>

          <h2 className="mt-8 text-4xl font-bold md:text-5xl">
            Everything Needed For
            <span className="text-blue-400">
              {" "}Modern Hiring
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-400">
            Recruiters and candidates get powerful AI tools
            that streamline hiring, improve matching, and
            increase interview success.
          </p>

        </div>

        {/* Cards */}
        <div data-aos="zoom-out-up" className="mt-20 grid gap-8 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500"
              >

                {/* Card Glow */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div className="relative z-10">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-blue-400">
                    <Icon size={28} />
                  </div>

                  <h3 className="mt-8 text-2xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-slate-400">
                    {feature.description}
                  </p>

                  <button className="mt-8 flex items-center gap-2 text-blue-400 transition group-hover:gap-4">
                    Learn More
                    <ArrowRight size={18} />
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default FeaturesSection;