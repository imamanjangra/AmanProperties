import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  //  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, // needed for refreshToken cookie
});

// ✅ REQUEST INTERCEPTOR
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ✅ RESPONSE INTERCEPTOR (FIXED)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔴 1. Prevent crash if no config
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // 🔴 2. Skip refresh API itself (VERY IMPORTANT)
    if (originalRequest.url?.includes("/users/refreshTokens")) {
      return Promise.reject(error);
    }

    // 🔴 3. Handle only 401 once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 🔁 Call refresh API
        const res = await API.get("/users/refreshTokens");

        const newAccessToken = res.data?.accessToken;

        // 🔴 If no token → force logout
        if (!newAccessToken) {
          throw new Error("No access token received");
        }

        // ✅ Save new token
        localStorage.setItem("token", newAccessToken);

        // ✅ Retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return API(originalRequest);
      } catch (refreshError) {
        // ❌ Logout if refresh fails
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;