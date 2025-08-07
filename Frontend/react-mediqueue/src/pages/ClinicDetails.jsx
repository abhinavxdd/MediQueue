import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PatientNavbar from "../components/PatientNavbar";
import { createAppointment } from "../services/appointmentService";
import { getClinicById } from "../services/clinicService";
import {
  getAllDoctors,
  getDoctorAvailableSlots,
} from "../services/doctorService";

const ClinicDetails = () => {
  const { clinicId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [visitReason, setVisitReason] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Hamirpur");
  const [clinic, setClinic] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Fetch clinic and doctors data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch clinic details
        const clinicData = await getClinicById(clinicId);
        setClinic(clinicData);

        // Fetch all doctors (you can filter by clinic if needed)
        const doctorsData = await getAllDoctors();
        setDoctors(doctorsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clinicId]);

  // Fetch available slots when doctor or date changes
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (selectedDoctor && selectedDate) {
        try {
          const dateString = selectedDate.toISOString().split("T")[0];
          const slots = await getDoctorAvailableSlots(
            selectedDoctor,
            dateString
          );
          setAvailableSlots(slots);
        } catch (error) {
          console.error("Error fetching available slots:", error);
          // Fallback to default slots if API fails
          setAvailableSlots([
            { id: 1, time: "09:00 AM", available: true },
            { id: 2, time: "09:30 AM", available: true },
            { id: 3, time: "10:00 AM", available: true },
            { id: 5, time: "11:00 AM", available: true },
            { id: 6, time: "11:30 AM", available: true },
            { id: 9, time: "02:00 PM", available: true },
            { id: 10, time: "02:30 PM", available: true },
            { id: 11, time: "03:00 PM", available: true },
            { id: 13, time: "04:00 PM", available: true },
            { id: 14, time: "04:30 PM", available: true },
          ]);
        }
      }
    };

    fetchAvailableSlots();
  }, [selectedDoctor, selectedDate]);

  // Generate dates for the next 7 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  // Handle booking confirmation with improved animation
  const handleBooking = async () => {
    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }

    if (!selectedDoctor) {
      alert("Please select a doctor");
      return;
    }

    if (!visitReason.trim()) {
      alert("Please provide a reason for your visit");
      return;
    }

    try {
      setBookingLoading(true);

      const selectedTimeSlot = availableSlots.find(
        slot => slot.id === selectedSlot
      );

      // Create appointment data
      const appointmentData = {
        doctor: selectedDoctor,
        clinic: clinicId,
        date: selectedDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
        time: selectedTimeSlot.time,
        reason: visitReason.trim(),
      };

      // Make API call to create appointment
      const createdAppointment = await createAppointment(appointmentData);

      // Set appointment details for success modal
      const doctorInfo = doctors.find(doc => doc._id === selectedDoctor);
      setAppointmentDetails({
        ...createdAppointment,
        doctorName: doctorInfo?.name || "Doctor",
        clinicName: clinic?.name || "Clinic",
        date: selectedDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        time: selectedTimeSlot.time,
      });

      // Show success toast first
      setShowSuccessToast(true);

      // Auto-hide toast and show detailed modal
      setTimeout(() => {
        setShowSuccessToast(false);
        setShowSuccessModal(true);
      }, 2500);
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert(error.message || "Failed to book appointment. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  // Handle success modal close
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate("/patient-dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!clinic) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Clinic Not Found
          </h2>
          <button
            onClick={() => navigate("/patient-dashboard")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Return to Dashboard
          </button>
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

      {/* Success Toast Notification */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 z-50 transition-all duration-500 ease-in-out transform translate-x-0">
          <div className="bg-white rounded-xl shadow-2xl border border-green-200 p-6 max-w-sm">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600 animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Booking Confirmed!
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Your appointment has been successfully scheduled
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Link to="/patient-dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <svg
            className="h-3 w-3 mx-2"
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
          <Link to="/clinics" className="hover:text-blue-600">
            Clinics
          </Link>
          <svg
            className="h-3 w-3 mx-2"
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
          <span className="text-gray-800 font-medium">{clinic.name}</span>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Column - Clinic Info */}
            <div className="w-full md:w-1/2">
              <div className="h-64 relative">
                <img
                  src={clinic.image}
                  alt={clinic.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full">
                  {clinic.rating} ★ ({clinic.numReviews || clinic.totalReviews})
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <h1 className="text-3xl font-bold text-white">
                    {clinic.name}
                  </h1>
                  <p className="text-white flex items-center mt-2">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {clinic.address}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    About the Clinic
                  </h3>
                  <p className="text-gray-600 mb-4">{clinic.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="h-5 w-5 mr-2 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="text-sm">{clinic.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="h-5 w-5 mr-2 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm">{clinic.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="h-5 w-5 mr-2 text-gray-500"
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
                      <span className="text-sm">{clinic.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Form */}
            <div className="w-full md:w-1/2 p-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Book an Appointment
                </h2>

                {/* Date Selection */}
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">
                    Select Date
                  </label>
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {generateDates().map((date, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedDate(date)}
                        className={`flex flex-col items-center p-3 rounded-lg min-w-[5rem] border ${
                          selectedDate.toDateString() === date.toDateString()
                            ? "bg-blue-50 border-blue-500 text-blue-700"
                            : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-sm font-medium">
                          {date.toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </span>
                        <span className="text-lg font-bold">
                          {date.getDate()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {date.toLocaleDateString("en-US", { month: "short" })}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Slots - Updated to use real availability */}
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">
                    Select Time
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {availableSlots.map(slot => (
                      <button
                        key={slot.id}
                        onClick={() =>
                          slot.available && setSelectedSlot(slot.id)
                        }
                        className={`py-2 px-1 rounded text-sm font-medium text-center transition-all duration-200 ${
                          !slot.available
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : selectedSlot === slot.id
                            ? "bg-blue-600 text-white shadow-lg scale-105"
                            : "bg-white border border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300"
                        }`}
                        disabled={!slot.available}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    * Gray slots are already booked
                  </p>
                </div>

                {/* Doctor Selection */}
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">
                    Select Doctor
                  </label>
                  <div className="relative">
                    <select
                      className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                      value={selectedDoctor}
                      onChange={e => setSelectedDoctor(e.target.value)}
                    >
                      <option value="">Select a Doctor</option>
                      {doctors.map(doctor => (
                        <option key={doctor._id} value={doctor._id}>
                          {doctor.name} - {doctor.specialization}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Reason for Visit */}
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">
                    Reason for Visit
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded p-3 text-gray-700 focus:outline-none focus:border-blue-500"
                    rows="3"
                    placeholder="Briefly describe your dental concerns or reason for appointment..."
                    value={visitReason}
                    onChange={e => setVisitReason(e.target.value)}
                  ></textarea>
                </div>

                {/* Book Button */}
                <button
                  onClick={handleBooking}
                  disabled={bookingLoading}
                  className={`w-full font-medium py-3 px-4 rounded transition-all duration-300 ${
                    bookingLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:scale-105"
                  }`}
                >
                  {bookingLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Booking...
                    </div>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* True Popup Success Modal */}
      {showSuccessModal && appointmentDetails && (
        <>
          {/* Minimal backdrop - only slightly dims background */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-20"
            onClick={() => setShowSuccessModal(false)}
          ></div>

          {/* Popup Modal - Positioned in center */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 animate-slide-up">
            {/* Header with Success Icon */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-t-2xl border-b border-green-100">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Booking Confirmed!
                  </h3>
                  <p className="text-sm text-green-700">
                    Your appointment is scheduled
                  </p>
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="p-6">
              <div className="space-y-4">
                {/* Doctor Info */}
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-blue-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">Doctor</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {appointmentDetails.doctorName}
                  </span>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-1">
                      <svg
                        className="w-4 h-4 text-gray-600 mr-1"
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
                      <span className="text-xs text-gray-600">Date</span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {appointmentDetails.date}
                    </p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-1">
                      <svg
                        className="w-4 h-4 text-gray-600 mr-1"
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
                      <span className="text-xs text-gray-600">Time</span>
                    </div>
                    <p className="text-sm font-medium text-blue-600">
                      {appointmentDetails.time}
                    </p>
                  </div>
                </div>

                {/* Clinic Info */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-1">
                    <svg
                      className="w-4 h-4 text-gray-600 mr-1"
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
                    <span className="text-xs text-gray-600">Clinic</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {appointmentDetails.clinicName}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {clinic?.address}
                  </p>
                </div>

                {/* Appointment ID */}
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center mb-1">
                    <svg
                      className="w-4 h-4 text-yellow-600 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    <span className="text-xs text-yellow-700">
                      Appointment ID
                    </span>
                  </div>
                  <p className="text-sm font-mono font-medium text-yellow-800">
                    {appointmentDetails._id
                      ? appointmentDetails._id.slice(-8).toUpperCase()
                      : "PENDING"}
                  </p>
                </div>

                {/* Reason */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-1">
                    <svg
                      className="w-4 h-4 text-gray-600 mr-1"
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
                    <span className="text-xs text-gray-600">
                      Reason for Visit
                    </span>
                  </div>
                  <p className="text-sm text-gray-900">{visitReason}</p>
                </div>

                {/* Status */}
                <div className="flex items-center justify-center p-2 bg-green-50 rounded-lg border border-green-200">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                    Confirmed
                  </span>
                </div>
              </div>
            </div>

            {/* Modern Action Buttons - Less Button-like */}
            <div className="p-6 pt-0 flex gap-3">
              {/* Close Link */}
              <div
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 text-center py-3 px-4 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center justify-center">
                  <svg
                    className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform"
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
                  Close
                </div>
              </div>

              {/* Dashboard Link */}
              <div
                onClick={handleSuccessClose}
                className="flex-1 text-center py-3 px-4 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 group"
              >
                <div className="flex items-center justify-center">
                  <svg
                    className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  Go to Dashboard
                </div>
              </div>
            </div>

            {/* Close X button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white shadow-md hover:bg-gray-50 flex items-center justify-center transition-colors group"
            >
              <svg
                className="w-4 h-4 text-gray-600 group-hover:text-gray-800 group-hover:scale-110 transition-all"
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
        </>
      )}
    </div>
  );
};

export default ClinicDetails;
