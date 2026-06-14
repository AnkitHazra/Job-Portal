import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";
import CompanyCard from "../../components/common/CompanyCard";
import { getMyCompanies, } from "../../api/companyApi";

function CompaniesPage() {
  const [companies, setCompanies] =
    useState([]);

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

  useEffect(() => {
    fetchCompanies();
  }, []);

  const navigate = useNavigate();

  return (
    <DashboardLayout>

      <div className="flex items-center justify-between">

        <h1 className="text-4xl font-bold text-white">
          Companies
        </h1>

        <button
          onClick={() =>
            navigate(
              "/recruiter/company/create"
            )
          }
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white"
        >
          Add Company
        </button>

      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">

        {companies.map(
          (company) => (
            <CompanyCard
              key={company._id}
              company={company}
            />
          )
        )}

      </div>

    </DashboardLayout>
  );
}

export default CompaniesPage;