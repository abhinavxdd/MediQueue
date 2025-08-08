import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PatientNavbar from "../components/PatientNavbar";
import {
  getUserAppointments,
  cancelAppointment,
} from "../services/appointmentService";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Hamirpur");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [appointments, filter]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/");
        return;
      }

      const data = await getUserAppointments();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      if (error.response && error.response.status === 401) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const filterAppointments = () => {
    let filtered = [...appointments];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (filter) {
      case "upcoming":
        filtered = appointments.filter(
          apt => new Date(apt.date) >= today && apt.status === "scheduled"
        );
        break;
      case "past":
        filtered = appointments.filter(
          apt => new Date(apt.date) < today || apt.status === "completed"
        );
        break;
      case "cancelled":
        filtered = appointments.filter(apt => apt.status === "cancelled");
        break;
      default:
        filtered = appointments;
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    setFilteredAppointments(filtered);
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = status => {
    switch (status) {
      case "scheduled":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAppointmentClick = appointment => {
    setSelectedAppointment(appointment);
    setShowDetailModal(true);
  };

  const handleViewDetails = appointmentId => {
    navigate(`/appointment/${appointmentId}`);
  };

  const handleCancelAppointment = async () => {
    try {
      await cancelAppointment(selectedAppointment._id, {
        reason: cancelReason,
      });

      // Update local state
      setAppointments(prev =>
        prev.map(apt =>
          apt._id === selectedAppointment._id
            ? { ...apt, status: "cancelled" }
            : apt
        )
      );

      setShowCancelModal(false);
      setShowDetailModal(false);
      setCancelReason("");

      // Show success message
      alert("Appointment cancelled successfully");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("Failed to cancel appointment. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PatientNavbar
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PatientNavbar
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            My Appointments
          </h1>
          <p className="text-gray-600">Manage your healthcare appointments</p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                {
                  id: "all",
                  label: "All Appointments",
                  count: appointments.length,
                },
                {
                  id: "upcoming",
                  label: "Upcoming",
                  count: appointments.filter(
                    apt =>
                      new Date(apt.date) >= new Date() &&
                      apt.status === "scheduled"
                  ).length,
                },
                {
                  id: "past",
                  label: "Past",
                  count: appointments.filter(
                    apt =>
                      new Date(apt.date) < new Date() ||
                      apt.status === "completed"
                  ).length,
                },
                {
                  id: "cancelled",
                  label: "Cancelled",
                  count: appointments.filter(apt => apt.status === "cancelled")
                    .length,
                },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    filter === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-lg shadow-sm">
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No appointments found
              </h3>
              <p className="text-gray-500 mb-4">
                {filter === "all"
                  ? "You haven't booked any appointments yet."
                  : `No ${filter} appointments found.`}
              </p>
              <button
                onClick={() => navigate("/patient-dashboard")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Book New Appointment
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredAppointments.map(appointment => (
                <div
                  key={appointment._id}
                  onClick={() => handleAppointmentClick(appointment)}
                  className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-medium text-gray-900 mr-3">
                          {appointment.doctor?.name || "Doctor"}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status.charAt(0).toUpperCase() +
                            appointment.status.slice(1)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-gray-400"
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
                          {formatDate(appointment.date)}
                        </div>

                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-gray-400"
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
                          {appointment.time}
                        </div>

                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                          {appointment.clinic?.name || "Clinic"}
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Reason:</span>{" "}
                        {appointment.reason}
                      </p>
                    </div>

                    <div className="ml-4">
                      <svg
                        className="w-5 h-5 text-gray-400"
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Appointment Detail Modal - Updated with new opacity syntax */}
      {showDetailModal && selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowDetailModal(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  Appointment Details
                </h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Doctor
                  </label>
                  <p className="text-gray-900">
                    {selectedAppointment.doctor?.name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Date
                    </label>
                    <p className="text-gray-900">
                      {formatDate(selectedAppointment.date)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Time
                    </label>
                    <p className="text-gray-900">{selectedAppointment.time}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Clinic
                  </label>
                  <p className="text-gray-900">
                    {selectedAppointment.clinic?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedAppointment.clinic?.address}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Reason
                  </label>
                  <p className="text-gray-900">{selectedAppointment.reason}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Status
                  </label>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      selectedAppointment.status
                    )}`}
                  >
                    {selectedAppointment.status.charAt(0).toUpperCase() +
                      selectedAppointment.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions - Updated with different options based on status */}
            <div className="p-6 border-t border-gray-200">
              {selectedAppointment.status === "scheduled" &&
              new Date(selectedAppointment.date) > new Date() ? (
                // For scheduled future appointments
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      alert("Reschedule functionality coming soon!");
                    }}
                    className="flex-1 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
                  >
                    Cancel
                  </button>
                </div>
              ) : selectedAppointment.status === "completed" ? (
                // For completed appointments
                <div className="flex gap-3">
                  <button
                    onClick={() => handleViewDetails(selectedAppointment._id)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
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
                    View Full Details
                  </button>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              ) : (
                // For cancelled or other statuses
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Modal - Updated with new opacity syntax */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowCancelModal(false)}
          ></div>

          <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Cancel Appointment
              </h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to cancel your appointment with{" "}
                {selectedAppointment?.doctor?.name}?
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for cancellation (optional)
                </label>
                <textarea
                  value={cancelReason}
                  onChange={e => setCancelReason(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                  rows="3"
                  placeholder="Please provide a reason for cancellation..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Keep Appointment
                </button>
                <button
                  onClick={handleCancelAppointment}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
