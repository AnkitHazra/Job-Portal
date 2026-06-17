import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";

import { createJob } from "../../api/jobApi";
import { getMyCompanies } from "../../api/companyApi";

function CreateJobPage() {
  const navigate = useNavigate();

  const [companies, setCompanies] =
    useState([]);

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
    const fetchCompanies =
      async () => {
        try {
          const data =
            await getMyCompanies();

          setCompanies(
            data.companies
          );
        } catch (error) {
          console.log(error);
        }
      };

    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await createJob({
        ...formData,
        requirements:
          formData.requirements
            .split(",")
            .map((item) =>
              item.trim()
            ),
      });

      navigate(
        "/recruiter/jobs"
      );
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Failed to create job"
      );
    }
  };

  return (
    <DashboardLayout>

      <h1 className="mb-8 text-4xl font-bold text-white mt-15 sm:mt-0">
        Create Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-800 bg-slate-900 p-8"
      >

        <div className="grid gap-5 md:grid-cols-2">

          <input
            type="text"
            name="title"
            placeholder="Job Title"
            onChange={handleChange}
            className="rounded-xl bg-slate-800 p-3 text-white"
          />

          <input
            type="number"
            name="salary"
            placeholder="Salary"
            onChange={handleChange}
            className="rounded-xl bg-slate-800 p-3 text-white"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            className="rounded-xl bg-slate-800 p-3 text-white"
          />

          <input
            type="number"
            name="experienceLevel"
            placeholder="Experience (Years)"
            onChange={handleChange}
            className="rounded-xl bg-slate-800 p-3 text-white"
          />

          <input
            type="number"
            name="position"
            placeholder="Open Positions"
            onChange={handleChange}
            className="rounded-xl bg-slate-800 p-3 text-white"
          />

          <select
            name="jobType"
            onChange={handleChange}
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
            onChange={handleChange}
            className="rounded-xl bg-slate-800 p-3 text-white"
          >
            <option value="">
              Select Company
            </option>

            {companies.map(
              (company) => (
                <option
                  key={company._id}
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
          placeholder="Job Description"
          onChange={handleChange}
          className="mt-5 w-full rounded-xl bg-slate-800 p-3 text-white"
        />

        <textarea
          rows="3"
          name="requirements"
          placeholder="React, Node.js, MongoDB"
          onChange={handleChange}
          className="mt-5 w-full rounded-xl bg-slate-800 p-3 text-white"
        />

        <button
          type="submit"
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
        >
          Create Job
        </button>

      </form>

    </DashboardLayout>
  );
}

export default CreateJobPage;