import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ✅ Analyze existing resume (no file upload)
export const analyzeExistingResume = async (jobTitle) => {
  const response = await axios.post(
    `${API_URL}/resume/analyze-existing`,
    { jobTitle },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const getATSData = async () => {
  const response = await axios.get(`${API_URL}/resume/ats-data`, {
    withCredentials: true,
  });
  return response.data;
};