import api from "./api";

export const applyJob = async (jobId) => {
  const res = await api.post(
    `/applications/apply/${jobId}`
  );

  return res.data;
};

export const getMyApplications =
  async () => {
    const res = await api.get(
      "/applications/my-applications"
    );

    return res.data;
  };

export const getJobApplicants = async (jobId) => {
  const response = await api.get(
    `/applications/job/${jobId}`
  );

  return response.data;
};

export const updateApplicationStatus = async (
  applicationId,
  status
) => {
  const response = await api.put(
    `/applications/${applicationId}/status`,
    { status }
  );

  return response.data;
};

export const getAllApplications =
  async () => {
    const response =
      await api.get(
        "/applications/all"
      );

    return response.data;
  };

export const getRecruiterAnalytics =
  async () => {
    const response =
      await api.get(
        "/applications/analytics"
      );

    return response.data;
  };
