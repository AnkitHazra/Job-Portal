import { useEffect, useState } from "react";

import { getMyApplications } from "../../api/applicationApi";

function CandidateDashboard() {
  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchApplications =
      async () => {
        try {
          const data =
            await getMyApplications();

          setApplications(
            data.applications
          );
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchApplications();
  }, []);

  const total =
    applications.length;

  const pending =
    applications.filter(
      (app) =>
        app.status === "pending"
    ).length;

  const shortlisted =
    applications.filter(
      (app) =>
        app.status ===
        "shortlisted"
    ).length;

  const rejected =
    applications.filter(
      (app) =>
        app.status ===
        "rejected"
    ).length;

  return (
    <div className=" bg-slate-950 p-8">

      <h1 className="text-4xl font-bold text-white">
        Candidate Dashboard
      </h1>

      <p className="mt-2 text-slate-400">
        Track your applications and opportunities.
      </p>

      <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-slate-400">
            Applications
          </h3>

          <p className="mt-4 text-4xl font-bold text-white">
            {total}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-slate-400">
            Pending
          </h3>

          <p className="mt-4 text-4xl font-bold text-yellow-400">
            {pending}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-slate-400">
            Shortlisted
          </h3>

          <p className="mt-4 text-4xl font-bold text-green-400">
            {shortlisted}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-slate-400">
            Rejected
          </h3>

          <p className="mt-4 text-4xl font-bold text-red-400">
            {rejected}
          </p>
        </div>

      </div>

      <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="mb-6 text-2xl font-semibold text-white">
          Recent Applications
        </h2>

        {loading ? (
          <p className="text-slate-400">
            Loading...
          </p>
        ) : applications.length ===
          0 ? (
          <p className="text-slate-400">
            No applications yet.
          </p>
        ) : (
          <div className="space-y-4">

            {applications
              .slice(0, 5)
              .map((app) => (
                <div
                  key={app._id}
                  className="flex items-center justify-between rounded-2xl border border-slate-800 p-4"
                >

                  <div>
                    <h3 className="font-medium text-white">
                      {
                        app.job
                          ?.title
                      }
                    </h3>

                    <p className="text-slate-400">
                      {
                        app.job
                          ?.company
                          ?.name
                      }
                    </p>
                  </div>

                  <span className="text-slate-300">
                    {
                      app.status
                    }
                  </span>

                </div>
              ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default CandidateDashboard;