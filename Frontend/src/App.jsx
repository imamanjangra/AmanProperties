import { useContext, useEffect } from "react"; // 1. Added useEffect
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

function App() {
  const { user } = useContext(AuthContext);
  const location = useLocation(); // 3. Get current page path

  // --- GOOGLE TAG INTEGRATION ---
  useEffect(() => {
    // This part adds the script tag to your site head
    const script = document.createElement("script");
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-H4E4MWXVYN";
    script.async = true;
    document.head.appendChild(script);

    // This part initializes the tracking
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-H4E4MWXVYN", {
      page_path: location.pathname, // Tracks the specific page the user is on
    });
  }, [location]); // Runs every time the user moves to a new page
  // ------------------------------

  return (
    <Routes>
      {/* 🔹 Public Routes */}
      <Route path="/" element={!user ? <Landingpage2 /> : <Navigate to="/home" />} />

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
      
      <Route
        path="/privacy-policy"
        element={<PrivacyPolicyPage />} 
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