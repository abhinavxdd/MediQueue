import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DoctorNavbar from "../components/DoctorNavbar";
import Footer from "../components/Footer";
import { getDoctorProfile } from "../services/authService";
import { getDoctorAppointments } from "../services/appointmentService";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [doctorData, setDoctorData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [dashboardStats, setDashboardStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctor profile and appointments
  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        // Check if doctor is authenticated
        const token = localStorage.getItem("doctorAuthToken");
        const role = localStorage.getItem("userRole");

        console.log("Doctor dashboard auth check:", {
          hasToken: !!token,
          userRole: role,
        });

        if (!token || role !== "doctor") {
          console.log("No doctor token or wrong role, redirecting to homepage");
          navigate("/");
          return;
        }

        // Get doctor profile
        const profileData = await getDoctorProfile();
        setDoctorData(profileData);

        // Get all appointments for this doctor
        const appointmentsData = await getDoctorAppointments();
        setAppointments(appointmentsData);

        // Calculate dashboard stats from the appointments
        calculateDashboardStats(appointmentsData);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
        setError("Failed to load your dashboard data. Please try again later.");

        // If token is invalid, clear it and redirect
        if (
          error.message === "Not authorized, token failed" ||
          error.message === "Not authorized, no token"
        ) {
          localStorage.removeItem("doctorAuthToken");
          localStorage.removeItem("userRole");
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [navigate]);

  // Calculate stats based on actual appointment data
  const calculateDashboardStats = (appointmentsData) => {
    const today = new Date().toISOString().split("T")[0]; // Today's date as YYYY-MM-DD

    // Count today's appointments
    const todaysAppointments = appointmentsData.filter(
      (appointment) =>
        new Date(appointment.date).toISOString().split("T")[0] === today
    );

    // Count total unique patients
    const uniquePatients = [
      ...new Set(appointmentsData.map((a) => a.patient._id)),
    ].length;

    // Count completed appointments today
    const completedToday = appointmentsData.filter(
      (appointment) =>
        new Date(appointment.date).toISOString().split("T")[0] === today &&
        appointment.status === "completed"
    );

    // Generate stats
    setDashboardStats([
      {
        title: "Today's Appointments",
        value: todaysAppointments.length,
        icon: "calendar",
        color: "blue",
      },
      {
        title: "Total Patients",
        value: uniquePatients,
        icon: "users",
        color: "green",
      },
      {
        title: "Pending Reports",
        value: appointmentsData.filter((a) => a.status === "scheduled").length,
        icon: "document",
        color: "yellow",
      },
      {
        title: "Completed Today",
        value: completedToday.length,
        icon: "check",
        color: "indigo",
      },
    ]);
  };

  // Get today's appointments
  const getTodaysAppointments = () => {
    const today = new Date().toISOString().split("T")[0];
    return appointments
      .filter(
        (appointment) =>
          new Date(appointment.date).toISOString().split("T")[0] === today
      )
      .sort((a, b) => {
        // Sort by time
        return a.time.localeCompare(b.time);
      });
  };

  // Get recent patients (unique patients from recent appointments)
  const getRecentPatients = () => {
    const uniquePatients = [];
    const patientMap = new Map();

    // Create a map of patients with their latest appointment
    appointments.forEach((appointment) => {
      const patientId = appointment.patient._id;
      if (
        !patientMap.has(patientId) ||
        new Date(appointment.date) > new Date(patientMap.get(patientId).date)
      ) {
        patientMap.set(patientId, {
          id: patientId,
          name: appointment.patient.name,
          lastVisit: new Date(appointment.date).toLocaleDateString(),
          condition: appointment.reason,
          // Approximate age might not be available from API
          // This is optional and can be removed if not available
          age: "N/A",
        });
      }
    });

    // Convert map to array
    patientMap.forEach((patient) => uniquePatients.push(patient));

    // Return most recent patients first (up to 5)
    return uniquePatients.slice(0, 5);
  };

  const handleLogout = () => {
    localStorage.removeItem("doctorAuthToken");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  // Icons for dashboard stats
  const renderIcon = (iconName, color) => {
    const iconClasses = `h-8 w-8 text-${color}-500`;

    switch (iconName) {
      case "calendar":
        return (
          <svg
            className={iconClasses}
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
        );
      case "users":
        return (
          <svg
            className={iconClasses}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        );
      case "document":
        return (
          <svg
            className={iconClasses}
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
        );
      case "check":
        return (
          <svg
            className={iconClasses}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="bg-red-50 dark:bg-red-900 p-4 rounded-md">
          <p className="text-red-600 dark:text-red-200">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const todaysAppointments = getTodaysAppointments();
  const recentPatients = getRecentPatients();

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Welcome, {doctorData?.name || "Doctor"}!
              </h1>
              <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">
                Here's your practice overview for today
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {dashboardStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {renderIcon(stat.icon, stat.color)}
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                          {stat.title}
                        </dt>
                        <dd className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                          {stat.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Today's Appointments Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Today's Appointments
                </h2>
              </div>
              <div className="p-6">
                {todaysAppointments.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Time
                          </th>
                          <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Patient
                          </th>
                          <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {todaysAppointments.map((appointment) => (
                          <tr key={appointment._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                              {appointment.time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {appointment.patient.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {appointment.reason}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  appointment.status === "scheduled"
                                    ? "bg-green-100 text-green-800"
                                    : appointment.status === "completed"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {appointment.status.charAt(0).toUpperCase() +
                                  appointment.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    No appointments scheduled for today
                  </p>
                )}
              </div>
            </div>

            {/* Recent Patients Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Recent Patients
                </h2>
              </div>
              <div className="p-6">
                {recentPatients.length > 0 ? (
                  <div className="space-y-4">
                    {recentPatients.map((patient) => (
                      <div
                        key={patient.id}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                          {patient.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {patient.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Last visit: {patient.lastVisit}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    No recent patients
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case "appointments":
        return (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Appointments
            </h1>
            <div className="mt-6">
              {/* Your appointments table */}
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {appointment.patient.name}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {appointment.time}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {appointment.reason}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            appointment.status === "scheduled"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : appointment.status === "completed"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {appointment.status.charAt(0).toUpperCase() +
                            appointment.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm">
                        <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "patients":
        return (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Patients
            </h1>
            <div className="mt-6">
              {/* Patients list */}
              {recentPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                    {patient.name.charAt(0)}
                  </div>
                  <div className="ml-4 flex-grow">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {patient.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {patient.age !== "N/A" ? `${patient.age} years • ` : ""}
                      {patient.condition}
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "schedule":
        return (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Schedule
            </h1>
            <div className="mt-6">
              {/* Weekly calendar component */}
              <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Weekly Schedule
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-7 gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day, index) => (
                        <div key={index} className="text-center">
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {day}
                          </div>
                          <div
                            className={`mt-1 rounded-full h-8 w-8 flex items-center justify-center mx-auto ${
                              index === 2
                                ? "bg-blue-500 text-white"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {new Date(
                              new Date().setDate(
                                new Date().getDate() -
                                  new Date().getDay() +
                                  index +
                                  1
                              )
                            ).getDate()}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="text-center text-gray-500 dark:text-gray-400">
                      Click on a day to view or edit your detailed schedule
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "messages":
        return (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Messages
            </h1>
            <div className="mt-6">
              <p className="text-gray-600 dark:text-gray-400">Coming soon...</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <DoctorNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        doctorData={doctorData}
      />

      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
};

export default DoctorDashboard;
