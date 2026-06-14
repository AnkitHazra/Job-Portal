import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getJobApplicants,
  updateApplicationStatus,
} from "../../api/applicationApi";

function ApplicantsPage() {
  const { jobId } = useParams();

  const [applications, setApplications] =
    useState([]);

  const fetchApplicants = async () => {
    try {
      const data =
        await getJobApplicants(jobId);

      setApplications(
        data.applications
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  const handleStatusChange = async (
    applicationId,
    status
  ) => {
    try {
      await updateApplicationStatus(
        applicationId,
        status
      );

      fetchApplicants();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="bg-slate-950 p-4 md:p-8">

        <h1 className="mb-8 text-3xl md:text-4xl font-bold text-white">
          Applicants
        </h1>

        {/* MOBILE VIEW */}

        <div className="space-y-4 md:hidden">

          {applications.map(
            (application) => (
              <div
                key={application._id}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
              >

                <div className="flex items-center gap-3">

                  <img
                    src={
                      application.applicant
                        ?.profilePicture ||
                      "https://placehold.net/avatar-5.svg"
                    }
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                  />

                  <div className="min-w-0">

                    <h3 className="truncate font-semibold text-white">
                      {
                        application
                          .applicant
                          ?.fullName
                      }
                    </h3>

                    <p className="truncate text-sm text-slate-400">
                      {
                        application
                          .applicant
                          ?.email
                      }
                    </p>

                  </div>

                </div>

                <div className="mt-4">

                  <p className="text-sm text-slate-400">
                    Status
                  </p>

                  <p className="capitalize text-white">
                    {application.status}
                  </p>

                </div>

                <div className="mt-4 flex flex-wrap gap-2">

                  {application.applicant
                    ?.resumeUrl ? (
                    <a
                      href={
                        application
                          .applicant
                          .resumeUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white"
                    >
                      Resume
                    </a>
                  ) : (
                    <span className="text-sm text-slate-500">
                      No Resume
                    </span>
                  )}

                  <button
                    onClick={() =>
                      handleStatusChange(
                        application._id,
                        "shortlisted"
                      )
                    }
                    className="rounded-lg bg-green-600 px-3 py-2 text-sm text-white"
                  >
                    Shortlist
                  </button>

                  <button
                    onClick={() =>
                      handleStatusChange(
                        application._id,
                        "rejected"
                      )
                    }
                    className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white"
                  >
                    Reject
                  </button>

                </div>

              </div>
            )
          )}

        </div>

        {/* DESKTOP VIEW */}

        <div className="hidden md:block">

          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b border-slate-800">

                    <th className="p-4 text-left text-slate-300">
                      Candidate
                    </th>

                    <th className="p-4 text-left text-slate-300">
                      Information
                    </th>

                    <th className="p-4 text-left text-slate-300">
                      Resume
                    </th>

                    <th className="p-4 text-left text-slate-300">
                      Status
                    </th>

                    <th className="p-4 text-left text-slate-300">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {applications.map(
                    (application) => (
                      <tr
                        key={
                          application._id
                        }
                        className="border-b border-slate-800 hover:bg-slate-800/40"
                      >

                        <td className="p-4 text-white">
                          {
                            application
                              .applicant
                              ?.fullName
                          }
                        </td>

                        <td className="p-4">

                          <div className="flex items-center gap-3">

                            <img
                              src={
                                application
                                  .applicant
                                  ?.profilePicture ||
                                "https://placehold.net/avatar.svg"
                              }
                              alt=""
                              className="h-12 w-12 rounded-full object-cover"
                            />

                            <div>

                              <p className="text-white">
                                {
                                  application
                                    .applicant
                                    ?.fullName
                                }
                              </p>

                              <p className="text-sm text-slate-400">
                                {
                                  application
                                    .applicant
                                    ?.email
                                }
                              </p>

                            </div>

                          </div>

                        </td>

                        <td className="p-4">

                          {application
                            .applicant
                            ?.resumeUrl ? (
                            <a
                              href={
                                application
                                  .applicant
                                  .resumeUrl
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                            >
                              View Resume
                            </a>
                          ) : (
                            <span className="text-slate-500">
                              No Resume
                            </span>
                          )}

                        </td>

                        <td className="p-4">

                          <span className="capitalize text-white">
                            {
                              application.status
                            }
                          </span>

                        </td>

                        <td className="p-4">

                          <div className="flex gap-2">

                            <button
                              onClick={() =>
                                handleStatusChange(
                                  application._id,
                                  "shortlisted"
                                )
                              }
                              className="rounded-lg bg-green-600 px-3 py-2 text-white"
                            >
                              Shortlist
                            </button>

                            <button
                              onClick={() =>
                                handleStatusChange(
                                  application._id,
                                  "rejected"
                                )
                              }
                              className="rounded-lg bg-red-600 px-3 py-2 text-white"
                            >
                              Reject
                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default ApplicantsPage;