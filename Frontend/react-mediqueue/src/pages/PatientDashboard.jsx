import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PatientNavbar from "../components/PatientNavbar";
import NearbyClinics from "../components/NearbyClinics";
import { getUserProfile } from "../services/authService";
import { getUserAppointments } from "../services/appointmentService";

const PatientDashboard = () => {
  const [selectedLocation, setSelectedLocation] = useState("Hamirpur");
  const [userData, setUserData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/");
          return;
        }

        const [userProfile, userAppointments] = await Promise.all([
          getUserProfile(),
          getUserAppointments(),
        ]);

        setUserData(userProfile);
        setAppointments(userAppointments);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response?.status === 401) {
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const getUpcomingAppointments = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return appointments
      .filter((appointment) => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate >= today && appointment.status === "scheduled";
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case "records":
        navigate("/medical-records");
        break;
      case "alerts":
        navigate("/alerts");
        break;
      case "history":
        navigate("/history");
        break;
      default:
        break;
    }
  };

  const upcomingAppointments = getUpcomingAppointments();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <PatientNavbar
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        userData={userData}
      />

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          {loading ? (
            <div className="flex items-center">
              <div className="animate-pulse h-8 w-60 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Welcome, {userData?.name || "Patient"}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Here's your health at a glance in {selectedLocation}
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex-1 transition-colors duration-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Upcoming Appointments
              </h2>
              <Link
                to="/appointments"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 py-2"
                    >
                      <div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="animate-pulse h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-1"></div>
                      <div className="animate-pulse h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment._id}
                    className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2"
                  >
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {appointment.doctor?.name || "Doctor"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {appointment.reason}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(appointment.date)} · {appointment.time}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {appointment.clinic?.name || "Clinic"}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4"
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
                  <p>No upcoming appointments</p>
                  <Link
                    to="/clinic"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    Book your first appointment
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex-1 transition-colors duration-200">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleQuickAction("records")}
                className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition"
              >
                <svg
                  className="h-8 w-8 text-green-600 dark:text-green-400 mb-2"
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
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Medical Records
                </span>
              </button>

              <button
                onClick={() => handleQuickAction("alerts")}
                className="flex flex-col items-center justify-center p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition"
              >
                <svg
                  className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2"
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
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Alerts
                </span>
              </button>

              <button
                onClick={() => handleQuickAction("history")}
                className="flex flex-col items-center justify-center p-4 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-lg transition"
              >
                <svg
                  className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mb-2"
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
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  History
                </span>
              </button>
            </div>
          </div>
        </div>

        <NearbyClinics selectedLocation={selectedLocation} />
      </div>
    </div>
  );
};

export default PatientDashboard;
