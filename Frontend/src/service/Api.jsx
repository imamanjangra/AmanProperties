// import axios from "axios";

// const API = axios.create({
//   // baseURL: import.meta.env.VITE_BACKEND_URL,
//   baseURL: "http://localhost:8000/api/v1",
//   withCredentials: true, // needed for refreshToken cookie
// });

// // ✅ REQUEST INTERCEPTOR
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");

//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }

//   return req;
// });

// // ✅ RESPONSE INTERCEPTOR (FIXED)
// API.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // 🔴 1. Prevent crash if no config
//     if (!originalRequest) {
//       return Promise.reject(error);
//     }

//     // 🔴 2. Skip refresh API itself (VERY IMPORTANT)
//     if (originalRequest.url?.includes("/users/refreshTokens")) {
//       return Promise.reject(error);
//     }

//     // 🔴 3. Handle only 401 once
//     const status = error.response?.status;
//     const message = error.response?.data?.message || "";

//     // 🔴 CASE 1: Unauthorized (token invalid / expired)
//     if (status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const res = await API.get("/users/refreshTokens");

//         const newAccessToken = res.data?.accessToken;

//         if (!newAccessToken) {
//           throw new Error("No access token");
//         }

//         localStorage.setItem("token", newAccessToken);

//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//         return API(originalRequest);
//       } catch (refreshError) {
//         forceLogout();
//       }
//     }

//     // 🔴 CASE 2: User deleted / not found
//     if (
//       status === 401 ||
//       status === 403 ||
//       message.toLowerCase().includes("user not found")
//     ) {
//       forceLogout();
//     }

//     return Promise.reject(error);
//   },
// );

// export default API;

import axios from "axios";

const API = axios.create({
  // baseURL: import.meta.env.VITE_BACKEND_URL,
  baseURL: "http://localhost:8000/api/v1",
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

// ✅ RESPONSE INTERCEPTOR (CLEAN + SAFE)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // ❌ skip refresh API itself
    if (originalRequest.url?.includes("/users/refreshTokens")) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const message = error.response?.data?.message || "";

    // ✅ HANDLE TOKEN REFRESH
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await API.get("/users/refreshTokens");

        const newAccessToken = res.data?.accessToken;

        if (!newAccessToken) throw new Error("No token");

        localStorage.setItem("token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return API(originalRequest);
      } catch (err) {
        // 🔥 GLOBAL LOGOUT TRIGGER
        window.dispatchEvent(new Event("logout"));
      }
    }

    // ✅ USER DELETED / FORBIDDEN
    if (
      status === 403 ||
      message.toLowerCase().includes("user not found")
    ) {
      window.dispatchEvent(new Event("logout"));
    }

    return Promise.reject(error);
  }
);

export default API;