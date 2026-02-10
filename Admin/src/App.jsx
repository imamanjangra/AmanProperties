import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./Pages/Login";
import AdminAddProperty from "./Pages/AddProperties";
import AdminUpdateProperties from "./Pages/updateProperties";

import { AuthContext } from "./context/Authcontext";
// import AdminLayout from "./layouts/AdminLayout";
// import ProtectedAdmin from "./routes/ProtectedAdmin";
import AdminLayout from "./layout/AdminLayout";
import ProtectedAdmin from "./routes/ProtectedAdmin";
import FormData from "./Pages/FormData";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/admin/FormData" />}
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminLayout />
            </ProtectedAdmin>
          }
        >
          <Route path="FormData" element={<FormData/>} />
          <Route path="add-properties" element={<AdminAddProperty />} />
          <Route
            path="update-properties"
            element={<AdminUpdateProperties />}
          />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
