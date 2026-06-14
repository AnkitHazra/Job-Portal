function CompanySection() {
  const companies = [
    {
      name: "Google",
      hiring: "120+ Open Roles",
    },
    {
      name: "Microsoft",
      hiring: "85+ Open Roles",
    },
    {
      name: "Amazon",
      hiring: "150+ Open Roles",
    },
    {
      name: "Netflix",
      hiring: "40+ Open Roles",
    },
    {
      name: "Adobe",
      hiring: "60+ Open Roles",
    },
    {
      name: "Spotify",
      hiring: "30+ Open Roles",
    },
  ];

  return (
    <section
      id="companies"
      className="bg-slate-950 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
            Trusted Companies
          </span>

          <h2 className="mt-8 text-4xl font-bold text-white md:text-5xl">
            Top Companies Hiring
          </h2>

          <p className="mt-4 text-slate-400">
            Discover opportunities from industry leaders.
          </p>

        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {companies.map((company) => (
            <div
              key={company.name}
              className="group rounded-3xl border border-slate-800 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500"
            >

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-violet-600 text-2xl font-bold text-white">
                {company.name.slice(0, 2)}
              </div>

              <h3 className="mt-6 text-2xl font-semibold text-white">
                {company.name}
              </h3>

              <p className="mt-3 text-slate-400">
                {company.hiring}
              </p>

              <button className="mt-6 rounded-xl bg-slate-800 px-4 py-2 text-sm text-white transition group-hover:bg-blue-600">
                View Jobs
              </button>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default CompanySection;