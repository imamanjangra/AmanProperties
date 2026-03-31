// import API from "../service/Api.jsx";
// import { createContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // 🔥 FORCE LOGOUT (central function)
//   const forceLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/login");
//   };

//   // 🔥 NORMAL LOGOUT
//   const logout = async () => {
//     try {
//       await API.post("/users/logout");
//     } catch (error) {}

//     forceLogout();
//     toast.success("Logout successfully");
//   };

//   // 🔥 CHECK USER ON APP LOAD (CRITICAL FIX)
//   useEffect(() => {
//     const checkUser = async () => {
//       const token = localStorage.getItem("token");

//       // ❌ no token → no user
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         // ✅ verify user with backend
//         const { data } = await API.get("/users/me");

//         setUser(data);

//         // optional: sync localStorage
//         localStorage.setItem("user", JSON.stringify(data));
//       } catch (error) {
//         // ❌ token invalid OR user deleted
//         forceLogout();
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

import API from "../service/Api.jsx";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ CENTRAL LOGOUT
  const forceLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // ✅ NORMAL LOGOUT
  const logout = async () => {
    try {
      await API.post("/users/logout");
    } catch (error) {}

    forceLogout();
    toast.success("Logout successfully");
  };

  // ✅ LISTEN GLOBAL LOGOUT (from interceptor)
  useEffect(() => {
    const handleLogout = () => forceLogout();

    window.addEventListener("logout", handleLogout);
    return () => window.removeEventListener("logout", handleLogout);
  }, []);

  // ✅ CHECK USER (NON-BLOCKING UI)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    // 🔥 UI should NOT wait for API
    setLoading(false);

    (async () => {
      try {
        const { data } = await API.get("/users/me");
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        forceLogout();
      }
    })();
  }, []);

  // ✅ SHOW LOADER INSTEAD OF BLANK SCREEN
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};