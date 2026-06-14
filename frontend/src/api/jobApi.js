import api from "./api";

export const createJob = async (
  jobData
) => {
  const res = await api.post(
    "/jobs",
    jobData
  );

  return res.data;
};

export const getJobs = async () => {
  const res = await api.get(
    "/jobs"
  );

  return res.data;
};

export const getJobById = async (id) => {
  const res = await api.get(`/jobs/${id}`);
  return res.data;
};

export const getRecruiterJobs =
  async () => {
    const res =
      await api.get(
        "applications/my-jobs"
      );
    return res.data;
  };

export const deleteJob =
  async (jobId) => {
    const response =
      await api.delete(
        `/jobs/${jobId}`
      );

    return response.data;
  };

export const updateJob = async (
  id,
  jobData
) => {
  const response =
    await api.put(
      `/jobs/${id}`,
      jobData
    );

  return response.data;
};
