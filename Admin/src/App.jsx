import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login";

import { AuthContext } from "./context/Authcontext";

import AdminLayout from "./layout/AdminLayout";
import ProtectedAdmin from "./routes/ProtectedAdmin";
import FormData from "./Pages/FormData";
import AdminAddProperty from "./Pages/AdminAddProperty";
import AdminUpdateProperties from "./Pages/AdminUpdateProperties";
import EditPropertyForm from "./Pages/EditPropertyForm";

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
