import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

export default function ProtectedAdmin({ children }) {
  const { user } = useContext(AuthContext);

  // agar login nahi hai
  if (!user) {
    return <Navigate to="/login" />;
  }

  // agar login hai
  return children;
}
