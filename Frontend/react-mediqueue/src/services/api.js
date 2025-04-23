// Base API setup with axios
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  config => {
    const userRole = localStorage.getItem("userRole");
    let token = null;

    if (userRole === "patient") {
      token = localStorage.getItem("authToken");
    } else if (userRole === "doctor") {
      token = localStorage.getItem("doctorAuthToken");
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
