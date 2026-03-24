import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./src/Contexts/auth.context";
// import { AuthContext } from "../Contexts/auth.context.jsx";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;