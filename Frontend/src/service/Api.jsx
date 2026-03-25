import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  // baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  // console.log("TOKEN BEING SENT:", token);

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});
export default API;
