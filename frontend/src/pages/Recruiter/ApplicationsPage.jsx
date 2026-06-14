import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { getAllApplications } from "../../api/applicationApi";

function ApplicationsPage() {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const data = await getAllApplications();

            setApplications(data.applications);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DashboardLayout>
            <h1 className="mb-8 text-4xl font-bold text-white">Applications</h1>

            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
                  <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="border-b text-xl border-slate-800 ">
                        <tr>
                            <th className="p-4 text-blue-200  text-left">Candidate</th>

                            <th className="p-4 text-blue-200 text-left">Job</th>

                            <th className="p-4 text-blue-200 text-left">Company</th>

                            <th className="p-4 text-blue-200 text-left">Status</th>

                            <th className="p-4 text-blue-200 text-left">Resume</th>
                        </tr>
                    </thead>

                    <tbody>
                        {applications.map((application) => (
                            <tr key={application._id} className="border-b border-slate-800">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={
                                                application.applicant?.profilePicture ||
                                                "https://placehold.net/avatar-5.svg"
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

                                <td className="p-4 text-white">{application.job?.title}</td>

                                <td className="p-4 text-white">
                                    {application.job?.company?.name}
                                </td>

                                <td className="p-4">
                                    <span className="capitalize text-white">
                                        {application.status}
                                    </span>
                                </td>

                                <td className="p-4">
                                    {application.applicant?.resumeUrl ? (
                                        <a
                                            href={application.applicant.resumeUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-lg bg-blue-600 px-3 py-2 text-white"
                                        >
                                            Resume
                                        </a>
                                    ) : (
                                        <span className="text-slate-400">No Resume</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default ApplicationsPage;
