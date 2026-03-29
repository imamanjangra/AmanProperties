import { useContext } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import PropertyPage from "./pages/PropertyPage.jsx";
import Layout from "./layout/layout.jsx";
import PropertyDetails from "./pages/PropertyDetails.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/LoginPage.jsx";
import Signup from "./pages/SignupPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AdminAddProperty from "./pages/AdminAddProperty.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EditProperty from "./pages/EditProperty.jsx";
import Landingpage2 from "./pages/Landingpage2.jsx";

import { AuthContext } from "./Contexts/auth.context.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";
import TermsConditionsPage from "./pages/TermsConditionsPage.jsx";
function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>

      {/* 🔹 Public Routes */}
      <Route path="/" element={ <Landingpage2 />} />

      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/home" />}
      />

      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to="/home" />}
      />
      <Route
        path="/term-and-condition"
        element={<TermsConditionsPage />} 
        />

      {/* 🔹 Protected Routes WITH Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      {/* 🔹 Protected Routes WITHOUT Layout */}
      <Route
        path="/properties"
        element={
          <ProtectedRoute>
            <PropertyPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/properties/:id"
        element={
          <ProtectedRoute>
            <PropertyDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/addproperty"
        element={
          <ProtectedRoute>
            <AdminAddProperty />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/editproperty/:id"
        element={
          <ProtectedRoute>
            <EditProperty />
          </ProtectedRoute>
        }
      />

      <Route
        path="/editprofile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />


      {/* 🔹 Fallback */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;