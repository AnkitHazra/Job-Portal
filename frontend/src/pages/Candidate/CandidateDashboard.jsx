import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

import {
  FileText,
  Clock3,
  BadgeCheck,
  XCircle,
} from "lucide-react";

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
import { getMyApplications } from "../../api/applicationApi";

function CandidateDashboard() {

  const { user} = useAuth();
  

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

  const chartData = {
    labels: [
      "Pending",
      "Shortlisted",
      "Rejected",
    ],
    datasets: [
      {
        data: [
          pending,
          shortlisted,
          rejected,
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
  return (
    <div className=" bg-slate-950 p-8">

      <h1 className="text-4xl font-bold text-white mt-20">
        Candidate Dashboard
      </h1>

      <p className="mt-2 text-slate-400">
        Track your applications and opportunities.
      </p>
      <div className="mt-8  rounded-3xl border border-slate-800 bg-slate-900 p-6">

        <div className="flex flex-col  gap-4 sm:flex-row sm:items-center">

          <img
            src={
              user?.profilePicture ||
              "https://placehold.net/avatar-4.png"
            }
            alt="Profile Picture"
            className="h-24 w-24 rounded-full border-4 border-blue-500 object-cover"
          />

          <div>

            <h2 className="text-2xl font-bold text-white">
              {user?.fullName}
            </h2>

            <p className="text-slate-400">
              {user?.email}
            </p>

            <p className="mt-1 text-slate-500">
              {user?.location ||
                "Location not added"}
            </p>

          </div>

        </div>

      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">

        <motion.div
          whileHover={{
            y: -5,
            scale: 1.02,
          }}
          className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
        >
          <FileText className="mb-4 text-blue-400" />
          <h3 className="text-slate-400">
            Applications
          </h3>
          <p className="mt-4 text-4xl font-bold text-white">
            {total}
          </p>
        </motion.div>

        <motion.div
          whileHover={{
            y: -5,
            scale: 1.02,
          }}
          className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
        >
          <Clock3 className="mb-4 text-yellow-400" />
          <h3 className="text-slate-400">
            Pending
          </h3>
          <p className="mt-4 text-4xl font-bold text-yellow-400">
            {pending}
          </p>
        </motion.div>

        <motion.div
          whileHover={{
            y: -5,
            scale: 1.02,
          }}
          className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
        >
          <BadgeCheck className="mb-4 text-green-400" />
          <h3 className="text-slate-400">
            Shortlisted
          </h3>
          <p className="mt-4 text-4xl font-bold text-green-400">
            {shortlisted}
          </p>
        </motion.div>

        <motion.div
          whileHover={{
            y: -5,
            scale: 1.02,
          }}
          className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
        >
          <XCircle className="mb-4 text-red-400" />
          <h3 className="text-slate-400">
            Rejected
          </h3>
          <p className="mt-4 text-4xl font-bold text-red-400">
            {rejected}
          </p>
        </motion.div>

      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="mb-6 text-2xl font-semibold text-white">
            Application Status
          </h2>

          <div className="mx-auto h-64 w-full max-w-xs">

            <Doughnut
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      color: "#fff",
                    },
                  },
                },
              }}
            />

          </div>

        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

          <h2 className="mb-6 text-2xl font-semibold text-white">
            Application Progress
          </h2>

          <div className="space-y-6">

            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-slate-400">
                  Pending
                </span>
                <span className="text-yellow-400">
                  {pending}
                </span>
              </div>

              <div className="h-3 rounded-full bg-slate-800">
                <div
                  className="h-3 rounded-full bg-yellow-400"
                  style={{
                    width: `${total
                        ? (pending /
                          total) *
                        100
                        : 0
                      }%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-slate-400">
                  Shortlisted
                </span>
                <span className="text-green-400">
                  {shortlisted}
                </span>
              </div>

              <div className="h-3 rounded-full bg-slate-800">
                <div
                  className="h-3 rounded-full bg-green-500"
                  style={{
                    width: `${total
                        ? (shortlisted /
                          total) *
                        100
                        : 0
                      }%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-slate-400">
                  Rejected
                </span>
                <span className="text-red-400">
                  {rejected}
                </span>
              </div>

              <div className="h-3 rounded-full bg-slate-800">
                <div
                  className="h-3 rounded-full bg-red-500"
                  style={{
                    width: `${total
                        ? (rejected /
                          total) *
                        100
                        : 0
                      }%`,
                  }}
                />
              </div>
            </div>

          </div>

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
                  className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-800 p-4 transition hover:border-blue-500 hover:bg-slate-800/50"
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

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${app.status === "shortlisted"
                        ? "bg-green-500/20 text-green-400"
                        : app.status === "rejected"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                  >
                    {app.status.charAt(0).toUpperCase() +
                      app.status.slice(1)}
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