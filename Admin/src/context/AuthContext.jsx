import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ CHECK TOKEN ON LOAD
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && token !== "undefined") {
      setUser(token);
    } else {
      setUser(null);
    }

    setLoading(false);

    // ✅ GLOBAL LOGOUT LISTENER (FROM INTERCEPTOR)
    const handleLogout = () => {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login", { replace: true });
    };

    window.addEventListener("logout", handleLogout);

    return () => window.removeEventListener("logout", handleLogout);
  }, [navigate]);

  // ✅ MANUAL LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);

    toast.success("Logout successfully");

    // prevent race condition
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 100);
  };

  // ✅ PREVENT BLANK SCREEN
  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};