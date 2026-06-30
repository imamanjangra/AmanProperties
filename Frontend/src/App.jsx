import { useContext, useEffect, useState } from "react"; // 1. Added useEffect
import "./App.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom"; // 2. Added useLocation

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
import ProtectedRoute from "../ProtectedRoute.jsx";
import TermsConditionsPage from "./pages/TermsConditionsPage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";
import Loader from "./components/Loader.jsx";

function App() {
 const { user } = useContext(AuthContext);
const location = useLocation();

const [loading, setLoading] = useState(true);
useEffect(() => {
  if (location.pathname !== "/") {
    setLoading(false);
    return;
  }

  const wakeUpServer = async () => {
    try {
      await API.get("/users/wakeup");
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3500);
    }
  };

  wakeUpServer();
}, []);

useEffect(() => {
  const script = document.createElement("script");
  script.src =
    "https://www.googletagmanager.com/gtag/js?id=G-H4E4MWXVYN";
  script.async = true;

  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];

  function gtag() {
    window.dataLayer.push(arguments);
  }

  gtag("js", new Date());

  gtag("config", "G-H4E4MWXVYN", {
    page_path: location.pathname,
  });
}, [location]);

// RETURN AFTER ALL HOOKS
if (loading) {
  return <Loader />;
} // Runs every time the user moves to a new page
  // ------------------------------

  return (
    <Routes>
      {/* 🔹 Public Routes */}
      <Route path="/" element={<Home/>} />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />
      
      <Route
        path="/term-and-condition"
        element={<TermsConditionsPage />} 
      />
      
      <Route
        path="/privacy-policy"
        element={<PrivacyPolicyPage />} 
      />

      {/* 🔹 Protected Routes WITH Layout */}
      <Route
        path="/"
        element={
         
            <Layout />
          
        }
      >
        <Route index element={<Home />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      {/* 🔹 Protected Routes WITHOUT Layout */}
      <Route
        path="/properties"
        element={
          
            <PropertyPage />
         
        }
      />

      <Route
        path="/properties/:slug"
        element={
          
            <PropertyDetails />
        
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