import api from "./api";

export const createCompany = async (
  companyData
) => {
  const res = await api.post(
    "/company",
    companyData
  );

  return res.data;
};

export const getMyCompanies =
  async () => {
    const res = await api.get(
      "/company"
    );

    return res.data;
  };