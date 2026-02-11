import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

export default function ProtectedAdmin({ children }) {
  const { user } = useContext(AuthContext);

  
  if (!user) {
    return ;
  }

  return children;
}
