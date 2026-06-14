import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getRecruiterJobs, deleteJob } from "../../api/jobApi";


function JobsPage() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] =
    useState(true);

  const fetchJobs = async () => {
    try {
      const data = await getRecruiterJobs();

      setJobs(data.jobs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);


  const handleDeleteJob =
    async (jobId) => {

      const confirmDelete =
        window.confirm(
          "Delete this job?"
        );

      if (!confirmDelete) return;

      try {
        
        await deleteJob(jobId);

        setJobs(
          jobs.filter(
            (job) =>
              job._id !== jobId
          )
        );

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <DashboardLayout>

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Jobs
          </h1>

          <p className="mt-2 text-slate-400">
            Manage and monitor job postings.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/recruiter/job/create")
          }
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          + Create Job
        </button>

      </div>

      {loading ? (
        <div className="mt-10 text-slate-400">
          Loading jobs...
        </div>
      ) : jobs.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center">

          <h2 className="text-2xl font-semibold text-white">
            No Jobs Posted Yet
          </h2>

          <p className="mt-3 text-slate-400">
            Create your first job posting.
          </p>

        </div>
      ) : (
        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden">
  <div className="overflow-x-auto">
    <table className="w-full min-w-250">

      <thead className="border-b border-slate-800">
        <tr>
          <th className="px-6 py-4 text-left text-slate-300">
            Job Title
          </th>

          <th className="px-6 py-4 text-left text-slate-300">
            Company
          </th>

          <th className="px-6 py-4 text-left text-slate-300">
            Location
          </th>

          <th className="px-6 py-4 text-left text-slate-300">
            Salary
          </th>

          <th className="px-6 py-4 text-left text-slate-300">
            Type
          </th>

          <th className="px-6 py-4 text-left text-slate-300">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {jobs.map((job) => (
          <tr
            key={job._id}
            className="border-b border-slate-800 hover:bg-slate-800/50"
          >
            <td className="px-6 py-4 text-white whitespace-nowrap">
              {job.title}
            </td>

            <td className="px-6 py-4 text-slate-300 whitespace-nowrap">
              {job.company?.name}
            </td>

            <td className="px-6 py-4 text-slate-300">
              {job.location}
            </td>

            <td className="px-6 py-4 text-slate-300 whitespace-nowrap">
              ₹{job.salary?.toLocaleString()}
            </td>

            <td className="px-6 py-4 text-slate-300 whitespace-nowrap">
              {job.jobType}
            </td>

            <td className="px-6 py-4">
              <div className="flex flex-wrap gap-2 min-w-70">

                <Link
                  to={`/recruiter/jobs/${job._id}/applicants`}
                  className="rounded-lg bg-blue-600 px-3 py-2 text-white text-sm whitespace-nowrap"
                >
                  Applicants
                </Link>

                <Link
                  to={`/recruiter/job/edit/${job._id}`}
                  className="rounded-lg bg-yellow-600 px-3 py-2 text-white text-sm whitespace-nowrap"
                >
                  Edit
                </Link>

                <button
                  onClick={() =>
                    handleDeleteJob(job._id)
                  }
                  className="rounded-lg bg-red-600 px-3 py-2 text-white text-sm whitespace-nowrap"
                >
                  Delete
                </button>

              </div>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  </div>
</div>
      )}

    </DashboardLayout>
  );
}

export default JobsPage;