import API from "../service/Api.jsx";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔥 FORCE LOGOUT (central function)
  const forceLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // 🔥 NORMAL LOGOUT
  const logout = async () => {
    try {
      await API.post("/users/logout");
    } catch (error) {}

    forceLogout();
    toast.success("Logout successfully");
  };

  // 🔥 CHECK USER ON APP LOAD (CRITICAL FIX)
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");

      // ❌ no token → no user
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // ✅ verify user with backend
        const { data } = await API.get("/users/me");

        setUser(data);

        // optional: sync localStorage
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        // ❌ token invalid OR user deleted
        forceLogout();
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};