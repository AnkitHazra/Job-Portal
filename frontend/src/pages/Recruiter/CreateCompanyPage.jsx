import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  createCompany,
} from "../../api/companyApi";

function CreateCompanyPage() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      website: "",
      location: "",
    });

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
      await createCompany(
        formData
      );

      navigate(
        "/recruiter/companies"
      );
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Failed to create company"
      );
    }
  };

  return (
    <DashboardLayout>

      <h1 className="mb-8 text-4xl font-bold text-white mt-15 sm:mt-0">
        Create Company
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl rounded-3xl border border-slate-800 bg-slate-900 p-8"
      >

        <input
          type="text"
          name="name"
          placeholder="Company Name"
          onChange={handleChange}
          className="mb-4 w-full rounded-xl bg-slate-800 p-3 text-white"
        />

        <input
          type="text"
          name="website"
          placeholder="Website"
          onChange={handleChange}
          className="mb-4 w-full rounded-xl bg-slate-800 p-3 text-white"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="mb-4 w-full rounded-xl bg-slate-800 p-3 text-white"
        />

        <textarea
          rows="5"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="mb-6 w-full rounded-xl bg-slate-800 p-3 text-white"
        />

        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white"
        >
          Create Company
        </button>

      </form>

    </DashboardLayout>
  );
}

export default CreateCompanyPage;