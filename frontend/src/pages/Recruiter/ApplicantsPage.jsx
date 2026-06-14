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

  const fetchApplicants =
    async () => {
      try {
        const data =
          await getJobApplicants(
            jobId
          );

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

  const handleStatusChange =
    async (
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
      <div className="min-h-screen bg-slate-950 p-8">

        <h1 className="mb-8 text-4xl font-bold text-white">
          Applicants
        </h1>

        <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full min-w-225">

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
                      className="border-b border-slate-800"
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
                              application.applicant?.profilePicture ||
                              "https://via.placeholder.com/40"
                            }
                            alt=""
                            className="h-10 w-10 rounded-full object-cover"
                          />

                          <div>
                            <p className="text-white">
                              {application.applicant?.fullName}
                            </p>
                            <p className="text-sm text-slate-400">
                              {application.applicant?.email}
                            </p>
                          </div>

                        </div>
                      </td>

                      <td className="p-4">

                        {application
                          .applicant
                          ?.resumeUrl ? (
                          <a
                            href={application.applicant?.resumeUrl}
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
    </DashboardLayout>
  );
}

export default ApplicantsPage;