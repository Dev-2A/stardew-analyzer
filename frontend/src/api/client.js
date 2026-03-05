import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 30000,
});

export const analyzeFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post("/api/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};