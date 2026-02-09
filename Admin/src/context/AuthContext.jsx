import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token && token !== "undefined") {
      setUser(token);
    } else {
      setUser(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logout successfully");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
