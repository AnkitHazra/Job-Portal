import { useEffect, useState } from "react";

import JobCard from "../../components/common/JobCard";

import { getJobs } from "../../api/jobApi";

function JobsPage() {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [jobType, setJobType] =
    useState("");

  const fetchJobs = async () => {
    try {
      const data = await getJobs();

      setJobs(data.jobs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs =
    jobs.filter((job) => {

      const matchesSearch =
        job.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesLocation =
        !location ||
        job.location
          .toLowerCase()
          .includes(
            location.toLowerCase()
          );

      const matchesJobType =
        !jobType ||
        job.jobType ===
        jobType;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesJobType
      );
    });




  return (
    <div className=" bg-slate-950 px-6 py-10">

      <div className="mx-auto max-w-7xl">

        <h1 className="text-5xl font-bold text-white">
          Find Your Dream Job
        </h1>

        <p className="mt-3 text-slate-400">
          Explore opportunities from top companies.
        </p>


        <div className="mt-8 grid gap-4 md:grid-cols-3">

          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(
                e.target.value
              )
            }
            className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
          />

          <select
            value={jobType}
            onChange={(e) =>
              setJobType(
                e.target.value
              )
            }
            className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
          >
            <option value="">
              All Types
            </option>

            <option value="Full-Time">
              Full-Time
            </option>

            <option value="Internship">
              Internship
            </option>

            <option value="Part-Time">
              Part-Time
            </option>

            <option value="Contract">
              Contract
            </option>

          </select>

          <button
            onClick={() => {
              setSearch("");
              setLocation("");
              setJobType("");
            }}
            className="mt-4 rounded-xl j bg-red-600  px-4 py-2 text-white hover:bg-red-700"
          >
            Clear Filters
          </button>

<p className="mt-6 text-slate-400">
  {filteredJobs.length} jobs found
</p>

        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
            />
          ))}

        </div>

      </div>

    </div>
  );
}

export default JobsPage;