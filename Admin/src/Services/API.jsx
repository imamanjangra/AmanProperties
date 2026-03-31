import axios from "axios";

const API = axios.create({
   baseURL: import.meta.env.VITE_BACKEND_URL,
  // baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

// ✅ REQUEST INTERCEPTOR
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ✅ RESPONSE INTERCEPTOR (STRICT + SAFE)
API.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;

    // ✅ ONLY LOGOUT ON AUTH ERRORS
    if (status === 401 || status === 403) {
      window.dispatchEvent(new Event("logout"));
    }

    return Promise.reject(error);
  }
);

export default API;