import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
// import { AuthContext } from "../context/Authcontext";

export default function ProtectedAdmin({ children }) {
  const { user } = useContext(AuthContext);

  
  if (!user) {
    return ;
  }

  return children;
}
