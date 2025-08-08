import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import ClinicDetails from "./pages/ClinicDetails";
import Appointments from "./pages/Appointments";
import NotFound from "./pages/NotFound";

import AppointmentDetails from "./pages/AppointmentDetails";

import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";


// Create a protected route component
const ProtectedRoute = ({ children }) => {
  // Check if user is authenticated (either patient OR doctor)
  const isAuthenticated =
    localStorage.getItem("authToken") !== null ||
    localStorage.getItem("doctorAuthToken") !== null;

  // If not authenticated, redirect to home
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the children components
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />

        {/* Protected routes */}
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <AppointmentDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/clinic/:clinicId"
          element={
            <ProtectedRoute>
              <ClinicDetails />
            </ProtectedRoute>
          }
        />

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
