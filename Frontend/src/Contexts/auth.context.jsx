// import API from "@/service/Api";
import API from "../service/Api.jsx"
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
// import API from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    try {
      if (savedUser && savedUser !== "undefined") {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.log("Invalid user data in localStorage");
      localStorage.removeItem("user");
    }
  }, []);

  const logout = async () => {
    try {
      await API.post("/user/logout"); // clear cookie in backend
    } catch (error) {}

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);

    toast.success("Logout successfully");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};