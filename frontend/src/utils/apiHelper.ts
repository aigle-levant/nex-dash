import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_PROD_SERVER || "http://localhost:8000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
