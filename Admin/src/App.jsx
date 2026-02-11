import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login.jsx";

// import { AuthContext } from "./context/Authcontext";

import AdminLayout from "./layout/AdminLayout.jsx";
import ProtectedAdmin from "./routes/ProtectedAdmin.jsx";
import FormData from "./Pages/FormData.jsx";
import AdminAddProperty from "./Pages/AdminAddProperty.jsx";
import AdminUpdateProperties from "./Pages/AdminUpdateProperties.jsx";
import EditPropertyForm from "./Pages/EditPropertyForm.jsx";
import { AuthContext } from "./context/AuthContext.jsx";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/admin/FormData" />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminLayout />
            </ProtectedAdmin>
          }
        >
          <Route path="FormData" element={<FormData />} />
          <Route path="addproperties" element={<AdminAddProperty />} />
          <Route path="updateproperties" element={<AdminUpdateProperties />} />
          <Route path="updateproperties/:id" element={<EditPropertyForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
