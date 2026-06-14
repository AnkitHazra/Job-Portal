function CompanyCard({ company }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white">
          {company.name?.charAt(0)}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white">
            {company.name}
          </h3>

          <p className="text-slate-400">
            {company.location}
          </p>
        </div>

      </div>

      <p className="mt-4 text-slate-400">
        {company.description}
      </p>

    </div>
  );
}

export default CompanyCard;