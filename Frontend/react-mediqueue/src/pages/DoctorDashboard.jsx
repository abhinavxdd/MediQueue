import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorNavbar from "../components/DoctorNavbar";
import Footer from "../components/Footer";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data for dashboard
  const dashboardStats = [
    {
      title: "Today's Appointments",
      value: 8,
      icon: "calendar",
      color: "blue",
    },
    { title: "Total Patients", value: 243, icon: "users", color: "green" },
    { title: "Pending Reports", value: 5, icon: "document", color: "yellow" },
    { title: "Completed Today", value: 3, icon: "check", color: "indigo" },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: "Emily Johnson",
      time: "09:00 AM",
      date: "Today",
      type: "Regular Checkup",
      status: "Confirmed",
    },
    {
      id: 2,
      patient: "Michael Smith",
      time: "10:30 AM",
      date: "Today",
      type: "Root Canal",
      status: "Confirmed",
    },
    {
      id: 3,
      patient: "Sophia Davis",
      time: "11:45 AM",
      date: "Today",
      type: "Consultation",
      status: "Confirmed",
    },
    {
      id: 4,
      patient: "Daniel Brown",
      time: "02:15 PM",
      date: "Today",
      type: "Teeth Cleaning",
      status: "Confirmed",
    },
    {
      id: 5,
      patient: "Olivia Wilson",
      time: "03:30 PM",
      date: "Today",
      type: "Cavity Filling",
      status: "Confirmed",
    },
  ];

  const recentPatients = [
    {
      id: 101,
      name: "James Taylor",
      age: 42,
      lastVisit: "2023-06-18",
      condition: "Dental Crown",
    },
    {
      id: 102,
      name: "Isabella Martinez",
      age: 28,
      lastVisit: "2023-06-17",
      condition: "Teeth Whitening",
    },
    {
      id: 103,
      name: "William Johnson",
      age: 35,
      lastVisit: "2023-06-15",
      condition: "Dental Implant",
    },
  ];

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

  const handleLogout = () => {
    localStorage.removeItem("doctorAuthToken");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DoctorNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, Dr. Sarah Johnson!
          </h1>
          <p className="mt-1 text-lg text-gray-600">
            Here's your practice overview for today
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex items-start"
            >
              <div className={`p-3 rounded-lg bg-${stat.color}-100 mr-4`}>
                {renderIcon(stat.icon, stat.color)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Today's Appointments
                </h2>
                <button className="text-blue-600 hover:text-blue-800">
                  View All
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {upcomingAppointments.map(appointment => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.patient}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {appointment.time}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {appointment.type}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {appointment.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap text-sm">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                          View
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Patients */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Patients
                </h2>
                <button className="text-blue-600 hover:text-blue-800">
                  View All
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-5">
                {recentPatients.map(patient => (
                  <div
                    key={patient.id}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                      {patient.name.charAt(0)}
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="text-sm font-medium text-gray-900">
                        {patient.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {patient.age} years • {patient.condition}
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-500">
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
          </div>
        </div>

        {/* Weekly Calendar */}
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Weekly Schedule
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-7 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, index) => (
                  <div key={index} className="text-center">
                    <div className="font-medium text-gray-900">{day}</div>
                    <div
                      className={`mt-1 rounded-full h-8 w-8 flex items-center justify-center mx-auto ${
                        index === 2 ? "bg-blue-500 text-white" : "text-gray-700"
                      }`}
                    >
                      {new Date(
                        new Date().setDate(
                          new Date().getDate() - new Date().getDay() + index + 1
                        )
                      ).getDate()}
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="text-center text-gray-500">
                Click on a day to view or edit your detailed schedule
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DoctorDashboard;
