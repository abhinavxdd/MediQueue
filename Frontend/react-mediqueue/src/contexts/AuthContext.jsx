// Frontend/react-mediqueue/src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { getUserProfile, getDoctorProfile } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (userRole === "patient" && localStorage.getItem("authToken")) {
          const userData = await getUserProfile();
          setUser({ ...userData, role: "patient" });
        } else if (
          userRole === "doctor" &&
          localStorage.getItem("doctorAuthToken")
        ) {
          const doctorData = await getDoctorProfile();
          setUser({ ...doctorData, role: "doctor" });
        }
      } catch (error) {
        console.error("Failed to load user:", error);
        // Clear localStorage if token is invalid
        localStorage.removeItem("authToken");
        localStorage.removeItem("doctorAuthToken");
        localStorage.removeItem("userRole");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userRole]);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
