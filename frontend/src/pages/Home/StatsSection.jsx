import {
  Users,
  Building2,
  BriefcaseBusiness,
  TrendingUp,
} from "lucide-react";

function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "10K+",
      label: "Candidates",
      description: "Actively searching for opportunities",
    },
    {
      icon: Building2,
      value: "500+",
      label: "Companies",
      description: "Hiring through our platform",
    },
    {
      icon: BriefcaseBusiness,
      value: "25K+",
      label: "Applications",
      description: "Successfully submitted",
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Match Accuracy",
      description: "AI-powered recommendation score",
    },
  ];

  return (
    <section id="stats" className="relative bg-slate-950 py-24">

      {/* Top Border */}
      <div className="absolute top-0 left-0 h-px w-full bg-slate-800"></div>

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">

          <span className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
            Trusted By Recruiters
          </span>

          <h2 className="mt-8 text-4xl font-bold text-white md:text-5xl">
            Growing Faster Every Day
          </h2>

          <p className="mt-4 text-lg text-slate-400">
            Helping recruiters discover talent and candidates
            land better opportunities with AI.
          </p>

        </div>

        {/* Stats Grid */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                  <Icon size={28} />
                </div>

                <h3 className="mt-8 text-4xl font-bold text-white">
                  {stat.value}
                </h3>

                <p className="mt-2 text-lg font-medium text-white">
                  {stat.label}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {stat.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default StatsSection;