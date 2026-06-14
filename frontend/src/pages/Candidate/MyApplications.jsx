import { useEffect, useState } from "react";
import { getMyApplications } from "../../api/applicationApi";

function MyApplications() {
  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

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

  useEffect(() => {
    fetchApplications();
  }, []);

  const getStatusColor = (
    status
  ) => {
    switch (status) {
      case "shortlisted":
        return "bg-green-500/20 text-green-400";

      case "rejected":
        return "bg-red-500/20 text-red-400";

      case "reviewed":
        return "bg-blue-500/20 text-blue-400";

      default:
        return "bg-yellow-500/20 text-yellow-400";
    }
  };

  return (
    <div className=" bg-slate-950 px-4 md:px-6 py-8 md:py-12">

      <div className="mx-auto max-w-7xl">

        <h1 className="text-3xl md:text-4xl font-bold text-white">
          My Applications
        </h1>

        <p className="mt-2 text-slate-400">
          Track all your job applications.
        </p>

        {loading ? (
          <div className="mt-10 text-slate-400">
            Loading...
          </div>
        ) : applications.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center">

            <h2 className="text-2xl font-semibold text-white">
              No Applications Yet
            </h2>

            <p className="mt-3 text-slate-400">
              Apply to jobs and they will appear here.
            </p>

          </div>
        ) : (
          <>
            {/* Desktop Table */}

            <div className="hidden md:block mt-10 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">

              <table className="w-full">

                <thead className="border-b border-slate-800">

                  <tr>

                    <th className="px-6 py-4 text-left text-slate-300">
                      Job
                    </th>

                    <th className="px-6 py-4 text-left text-slate-300">
                      Company
                    </th>

                    <th className="px-6 py-4 text-left text-slate-300">
                      Applied On
                    </th>

                    <th className="px-6 py-4 text-left text-slate-300">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {applications.map(
                    (application) => (
                      <tr
                        key={application._id}
                        className="border-b border-slate-800 hover:bg-slate-800/50"
                      >

                        <td className="px-6 py-4 text-white">
                          {application.job?.title}
                        </td>

                        <td className="px-6 py-4 text-slate-300">
                          {
                            application.job
                              ?.company?.name
                          }
                        </td>

                        <td className="px-6 py-4 text-slate-300">
                          {new Date(
                            application.createdAt
                          ).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-4">

                          <span
                            className={`rounded-full px-3 py-1 text-sm ${getStatusColor(
                              application.status
                            )}`}
                          >
                            {
                              application.status
                            }
                          </span>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

            {/* Mobile Cards */}

            <div className="mt-8 space-y-4 md:hidden px-1">

              {applications.map(
                (application) => (
                  <div
                    key={application._id}
                    className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
                  >

                    <h3 className="text-lg font-semibold text-white">
                      {
                        application.job
                          ?.title
                      }
                    </h3>

                    <p className="mt-1 text-slate-400">
                      {
                        application.job
                          ?.company?.name
                      }
                    </p>

                    <p className="mt-3 text-sm text-slate-500">
                      Applied on{" "}
                      {new Date(
                        application.createdAt
                      ).toLocaleDateString()}
                    </p>

                    <span
                      className={`mt-4 inline-block rounded-full px-3 py-1 text-sm ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {
                        application.status
                      }
                    </span>

                  </div>
                )
              )}

            </div>
          </>
        )}

      </div>

    </div>
  );
}

export default MyApplications;