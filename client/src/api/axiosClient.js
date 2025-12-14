// client/src/api/axiosClient.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

// Debug check
console.log("🔗 API Base URL Loaded:", API);

const axiosClient = axios.create({
  baseURL: API, // http://localhost:5000/api
  headers: {
    "Content-Type": "application/json",
  },
});

// -----------------------------------------------------
//  Automatically attach token to every request
// -----------------------------------------------------
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("campkart_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
