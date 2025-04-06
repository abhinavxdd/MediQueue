import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Doctor Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-xl">Welcome to your doctor dashboard!</p>
          <p className="mt-4">
            Here you can manage your appointments and patient information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
