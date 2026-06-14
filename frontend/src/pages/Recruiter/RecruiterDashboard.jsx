import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getRecruiterAnalytics } from "../../api/applicationApi";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function RecruiterDashboard() {
  const [analytics, setAnalytics] =
    useState(null);

  useEffect(() => {
    const fetchAnalytics =
      async () => {
        try {
          const data =
            await getRecruiterAnalytics();

          setAnalytics(
            data.analytics
          );
        } catch (error) {
          console.log(error);
        }
      };

    fetchAnalytics();
  }, []);

  if (!analytics) {
    return (
      <DashboardLayout>
        <div className="flex h-[60vh] items-center justify-center">
          <p className="text-xl text-white">
            Loading Dashboard...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const chartData = {
    labels: [
      "Pending",
      "Shortlisted",
      "Rejected",
    ],
    datasets: [
      {
        data: [
          analytics.pending,
          analytics.shortlisted,
          analytics.rejected,
        ],
        backgroundColor: [
          "#facc15",
          "#22c55e",
          "#ef4444",
        ],
        borderWidth: 0,
      },
    ],
  };

  const cards = [
    {
      title: "Jobs",
      value:
        analytics.totalJobs,
      color: "text-blue-400",
    },
    {
      title: "Applications",
      value:
        analytics.totalApplications,
      color: "text-purple-400",
    },
    {
      title: "Pending",
      value:
        analytics.pending,
      color: "text-yellow-400",
    },
    {
      title: "Shortlisted",
      value:
        analytics.shortlisted,
      color: "text-green-400",
    },
    {
      title: "Rejected",
      value:
        analytics.rejected,
      color: "text-red-400",
    },
  ];

  return (
    <DashboardLayout>

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-white">
          Recruiter Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Monitor your hiring activity.
        </p>

      </div>

      {/* Analytics Cards */}

      <div className="grid gap-6 md:grid-cols-5">

        {cards.map((card) => (
          <motion.div
            key={card.title}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            transition={{
              duration: 0.2,
            }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
          >

            <h3 className="text-slate-400">
              {card.title}
            </h3>

            <p
              className={`mt-4 text-4xl font-bold ${card.color}`}
            >
              {card.value}
            </p>

          </motion.div>
        ))}

      </div>

      {/* Charts Section */}

      <div className="mt-10 grid gap-8 lg:grid-cols-2">

        {/* Doughnut Chart */}

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="mb-6 text-2xl font-semibold text-white">
            Application Status
          </h2>

          <div className="mx-auto max-w-sm">
            <Doughnut
              data={chartData}
            />
          </div>

        </div>

        {/* Hiring Overview */}

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <h2 className="mb-6 text-2xl font-semibold text-white">
            Hiring Overview
          </h2>

          <div className="space-y-6">

            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-slate-400">
                  Pending
                </span>

                <span className="text-yellow-400">
                  {analytics.pending}
                </span>
              </div>

              <div className="h-3 rounded-full bg-slate-800">
                <div
                  style={{
                    width: `${
                      analytics.totalApplications
                        ? (analytics.pending /
                            analytics.totalApplications) *
                          100
                        : 0
                    }%`,
                  }}
                  className="h-3 rounded-full bg-yellow-400"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-slate-400">
                  Shortlisted
                </span>

                <span className="text-green-400">
                  {analytics.shortlisted}
                </span>
              </div>

              <div className="h-3 rounded-full bg-slate-800">
                <div
                  style={{
                    width: `${
                      analytics.totalApplications
                        ? (analytics.shortlisted /
                            analytics.totalApplications) *
                          100
                        : 0
                    }%`,
                  }}
                  className="h-3 rounded-full bg-green-500"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-slate-400">
                  Rejected
                </span>

                <span className="text-red-400">
                  {analytics.rejected}
                </span>
              </div>

              <div className="h-3 rounded-full bg-slate-800">
                <div
                  style={{
                    width: `${
                      analytics.totalApplications
                        ? (analytics.rejected /
                            analytics.totalApplications) *
                          100
                        : 0
                    }%`,
                  }}
                  className="h-3 rounded-full bg-red-500"
                />
              </div>
            </div>

          </div>

        </div>
         <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">

  <h2 className="mb-6 text-2xl font-semibold text-white">
    Recent Applications
  </h2>

  {analytics.recentApplications
    ?.length === 0 ? (
    <p className="text-slate-400">
      No applications yet.
    </p>
  ) : (
    <div className="space-y-4">

      {analytics.recentApplications.map(
        (application) => (
          <motion.div
            key={
              application._id
            }
            whileHover={{
              scale: 1.01,
            }}
            className="flex items-center justify-between rounded-2xl border border-slate-800 p-4 transition"
          >

            <div className="flex items-center gap-4">

              <img
                src={
                  application
                    .applicant
                    ?.profilePicture ||
                  "https://via.placeholder.com/50"
                }
                alt=""
                className="h-12 w-12 rounded-full object-cover"
              />

              <div>

                <h3 className="font-medium text-white">
                  {
                    application
                      .applicant
                      ?.fullName
                  }
                </h3>

                <p className="text-sm text-slate-400">
                  Applied for{" "}
                  {
                    application
                      .job
                      ?.title
                  }
                </p>

              </div>

            </div>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                application.status ===
                "shortlisted"
                  ? "bg-green-500/20 text-green-400"
                  : application.status ===
                    "rejected"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              {
                application.status
              }
            </span>

          </motion.div>
        )
      )}

    </div>
  )}

</div>

      </div>

    </DashboardLayout>
  );
}

export default RecruiterDashboard;