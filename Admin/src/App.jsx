import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Layout from "./layout/Layout.jsx";
import ProtectedAdmin from "./routes/ProtectedAdmin.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import FormData from "./Pages/FormData.jsx";
import VerifyProperties from "./Pages/VerifyProperties.jsx";
import AdminUsers from "./Pages/AdminUsers.jsx";
import UpdateRequests from "./Pages/UpdateRequests.jsx";
import AdminProperties from "./Pages/AdminProperties.jsx";
import ManageProperties from "./Pages/ManageProperties.jsx";
import EditPropertyForm from "./Pages/EditPropertyForm.jsx";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/admin" replace />}
      />

      {/* Protected */}
      <Route
        path="/admin"
        element={
          <ProtectedAdmin>
            <Layout />
          </ProtectedAdmin>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="formdata" element={<FormData />} />
        <Route path="verify-properties" element={<VerifyProperties />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="update-requests" element={<UpdateRequests />} />
        <Route path="properties" element={<AdminProperties />} />
        <Route path="ManageProperties" element={<ManageProperties />} />
        <Route path="EditProperty/:id" element={<EditPropertyForm />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;