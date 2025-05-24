import { default as axios } from 'axios';




export const axiosInstance = axios.create({
  baseURL: window.location.hostname === "localhost"? "http://localhost:4000/api/v1":"https://hisab-kitab-qtr0.onrender.com/api/v1",
});

// Automatically attach the token to each request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("hisab-kitab-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

