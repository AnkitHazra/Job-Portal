import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getJobById,
  updateJob,
} from "../../api/jobApi";

import { getMyCompanies } from "../../api/companyApi";

function EditJobPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  console.log(id);

  const [companies, setCompanies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      requirements: "",
      salary: "",
      location: "",
      experienceLevel: "",
      jobType: "Full-Time",
      position: "",
      companyId: "",
    });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        companyData,
        jobData,
      ] = await Promise.all([
        getMyCompanies(),
        getJobById(id),
      ]);

      setCompanies(
        companyData.companies
      );

      const job =
        jobData.job;

      setFormData({
        title:
          job.title || "",

        description:
          job.description ||
          "",

        requirements:
          job.requirements?.join(
            ", "
          ) || "",

        salary:
          job.salary || "",

        location:
          job.location || "",

        experienceLevel:
          job.experienceLevel ||
          "",

        jobType:
          job.jobType ||
          "Full-Time",

        position:
          job.position || "",

        companyId:
          job.company?._id ||
          "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await updateJob(id, {
          ...formData,

          requirements:
            formData.requirements
              .split(",")
              .map((item) =>
                item.trim()
              ),
        });

        alert(
          "Job Updated Successfully"
        );

        navigate(
          "/recruiter/jobs"
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Failed to update job"
        );
      }
    };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-white">
          Loading...
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <h1 className="mb-8 text-4xl font-bold text-white mt-12 sm:mt-0">
        Edit Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-800 bg-slate-900 p-8"
      >

        <div className="grid gap-5 md:grid-cols-2">

          <input
            type="text"
            name="title"
            value={
              formData.title
            }
            onChange={
              handleChange
            }
            placeholder="Job Title"
            className="rounded-xl bg-slate-800 p-3 text-white"
          />

          <input
            type="number"
            name="salary"
            value={
              formData.salary
            }
            onChange={
              handleChange
            }
            placeholder="Salary"
            className="rounded-xl bg-slate-800 p-3 text-white"
          />

          <input
            type="text"
            name="location"
            value={
              formData.location
            }
            onChange={
              handleChange
            }
            placeholder="Location"
            className="rounded-xl bg-slate-800 p-3 text-white"
          />

          <input
            type="number"
            name="experienceLevel"
            value={
              formData.experienceLevel
            }
            onChange={
              handleChange
            }
            placeholder="Experience"
            className="rounded-xl bg-slate-800 p-3 text-white"
          />

          <input
            type="number"
            name="position"
            value={
              formData.position
            }
            onChange={
              handleChange
            }
            placeholder="Open Positions"
            className="rounded-xl bg-slate-800 p-3 text-white"
          />

          <select
            name="jobType"
            value={
              formData.jobType
            }
            onChange={
              handleChange
            }
            className="rounded-xl bg-slate-800 p-3 text-white"
          >
            <option>
              Full-Time
            </option>

            <option>
              Internship
            </option>

            <option>
              Part-Time
            </option>

            <option>
              Contract
            </option>
          </select>

          <select
            name="companyId"
            value={
              formData.companyId
            }
            onChange={
              handleChange
            }
            className="rounded-xl bg-slate-800 p-3 text-white"
          >
            <option value="">
              Select Company
            </option>

            {companies.map(
              (company) => (
                <option
                  key={
                    company._id
                  }
                  value={
                    company._id
                  }
                >
                  {company.name}
                </option>
              )
            )}
          </select>

        </div>

        <textarea
          rows="5"
          name="description"
          value={
            formData.description
          }
          onChange={
            handleChange
          }
          placeholder="Job Description"
          className="mt-5 w-full rounded-xl bg-slate-800 p-3 text-white"
        />

        <textarea
          rows="3"
          name="requirements"
          value={
            formData.requirements
          }
          onChange={
            handleChange
          }
          placeholder="React, Node.js, MongoDB"
          className="mt-5 w-full rounded-xl bg-slate-800 p-3 text-white"
        />

        <button
          type="submit"
          className="mt-6 rounded-xl bg-yellow-600 px-6 py-3 font-medium text-white hover:bg-yellow-700"
        >
          Update Job
        </button>

      </form>

    </DashboardLayout>
  );
}

export default EditJobPage;