import { MapPin, BriefcaseBusiness } from "lucide-react";
import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-blue-500">

      <div className="flex items-center justify-between">

        <div>
          <h3 className="text-xl font-semibold text-white">
            {job.title}
          </h3>

          <p className="mt-1 text-slate-400">
            {job.company?.name}
          </p>
        </div>

        <span className="rounded-full bg-blue-600/20 px-3 py-1 text-sm text-blue-400">
          {job.jobType}
        </span>

      </div>

      <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-400">

        <div className="flex items-center gap-2">
          <MapPin size={16} />
          {job.location}
        </div>

        <div className="flex items-center gap-2">
          <BriefcaseBusiness size={16} />
          {job.experienceLevel} Years
        </div>

      </div>

      <div className="mt-6 flex items-center justify-between">

        <h4 className="text-2xl font-bold text-white">
          ₹{job.salary?.toLocaleString()}
        </h4>

        <button
          onClick={() =>
            navigate(`/jobs/${job._id}`)
          }
          className="rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
        >
          View Details
        </button>

      </div>

    </div>
  );
}

export default JobCard;