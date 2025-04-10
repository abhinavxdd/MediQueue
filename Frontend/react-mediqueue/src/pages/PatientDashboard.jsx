import React, { useState } from "react";
import { Link } from "react-router-dom";
import PatientNavbar from "../components/PatientNavbar";
import NearbyClinics from "../components/NearbyClinics";

const PatientDashboard = () => {
  const [selectedLocation, setSelectedLocation] = useState("Hamirpur");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Component */}
      <PatientNavbar
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, John!</h1>
          <p className="text-gray-600 mt-1">
            Here's your health at a glance in {selectedLocation}
          </p>
        </div>

        {/* Horizontally aligned cards */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          {/* Upcoming Appointments Card */}
          <div className="bg-white rounded-lg shadow p-6 flex-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Upcoming Appointments
              </h2>
              <Link
                to="/appointments"
                className="text-sm text-blue-600 hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-medium">Dr. Sarah Johnson</p>
                <p className="text-sm text-gray-500">Dental Checkup</p>
                <p className="text-sm text-gray-500">
                  June 15, 2023 · 10:30 AM
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="font-medium">Dr. Michael Chen</p>
                <p className="text-sm text-gray-500">Root Canal Treatment</p>
                <p className="text-sm text-gray-500">June 22, 2023 · 2:00 PM</p>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white rounded-lg shadow p-6 flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex flex-col items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
                <svg
                  className="h-8 w-8 text-blue-600 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm font-medium">Book Appointment</span>
              </button>

              {/* Medical Records - Replacing Message Doctor */}
              <button className="flex flex-col items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition">
                <svg
                  className="h-8 w-8 text-green-600 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-sm font-medium">Medical Records</span>
              </button>

              {/* Alerts - Replacing Insurance */}
              <button className="flex flex-col items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition">
                <svg
                  className="h-8 w-8 text-purple-600 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="text-sm font-medium">Alerts</span>
              </button>

              <button className="flex flex-col items-center justify-center p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition">
                <svg
                  className="h-8 w-8 text-yellow-600 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium">History</span>
              </button>
            </div>
          </div>
        </div>

        {/* Clinics Near You Component */}
        <NearbyClinics selectedLocation={selectedLocation} />
      </div>
    </div>
  );
};

export default PatientDashboard;
