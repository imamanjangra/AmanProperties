import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

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
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/admin" />}
        />

        {/* Protected Layout */}
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <Layout />
            </ProtectedAdmin>
          }
        >
          {/* Dashboard Page */}
          <Route index element={<Dashboard />} />
          <Route path="/admin/formdata" element={<FormData/>} />
          <Route path="/admin/verify-properties" element={<VerifyProperties />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/update-requests" element={<UpdateRequests />} />
          <Route path="/admin/properties" element={<AdminProperties />} />
          <Route path="/admin/ManageProperties" element={<ManageProperties />} />
          <Route path="/admin/EditProperty/:id" element={<EditPropertyForm />} />
        </Route>

        {/* Redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;