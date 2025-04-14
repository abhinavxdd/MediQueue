import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PatientNavbar from "../components/PatientNavbar";

const ClinicDetails = () => {
  const { clinicId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [visitReason, setVisitReason] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Hamirpur");

  // Mock clinic data - in a real app, you would fetch this based on clinicId
  const clinic = {
    id: clinicId || "1",
    name: "Brightsmile Dental Clinic",
    address: "123 Medical Avenue, Hamirpur",
    description:
      "Brightsmile Dental Clinic is a state-of-the-art dental facility offering comprehensive dental care with the latest technology and a patient-centered approach. Our experienced team of dentists specializes in cosmetic dentistry, dental implants, and routine checkups.",
    phone: "+91 98765 43210",
    email: "info@brightsmile.com",
    website: "www.brightsmile.com",
    hours: "Monday to Saturday: 9:00 AM - 5:00 PM",
    rating: 4.8,
    totalReviews: 127,
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    doctors: [
      { id: 1, name: "Dr. Sarah Johnson", specialty: "Orthodontics" },
      { id: 2, name: "Dr. Michael Chen", specialty: "Endodontics" },
      { id: 3, name: "Dr. Emily Patel", specialty: "Periodontics" },
    ],
    reviews: [
      {
        id: 1,
        user: "Robert K.",
        rating: 5,
        comment: "Amazing service and very gentle care!",
        date: "2023-05-12",
      },
      {
        id: 2,
        user: "Priya M.",
        rating: 4,
        comment: "Very professional staff and clean facility.",
        date: "2023-04-28",
      },
      {
        id: 3,
        user: "James L.",
        rating: 5,
        comment: "Best dental experience I've ever had!",
        date: "2023-04-15",
      },
    ],
  };

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

  // More precise time slots with 30-minute intervals
  const timeSlots = [
    { id: 1, time: "09:00 AM", available: true },
    { id: 2, time: "09:30 AM", available: true },
    { id: 3, time: "10:00 AM", available: true },
    { id: 4, time: "10:30 AM", available: false },
    { id: 5, time: "11:00 AM", available: true },
    { id: 6, time: "11:30 AM", available: true },
    { id: 7, time: "12:00 PM", available: false },
    { id: 8, time: "12:30 PM", available: false },
    { id: 9, time: "02:00 PM", available: true },
    { id: 10, time: "02:30 PM", available: true },
    { id: 11, time: "03:00 PM", available: true },
    { id: 12, time: "03:30 PM", available: false },
    { id: 13, time: "04:00 PM", available: true },
    { id: 14, time: "04:30 PM", available: true },
  ];

  // Handle booking confirmation
  const handleBooking = () => {
    if (!selectedSlot) {
      alert("Please select a time slot");
      return;
    }

    // In a real application, you would make an API call to book the appointment
    alert(
      `Appointment booked successfully for ${selectedDate.toLocaleDateString()} at ${
        timeSlots.find(slot => slot.id === selectedSlot).time
      }`
    );
    navigate("/patient-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PatientNavbar
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

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
            {/* Left Column */}
            <div className="w-full md:w-1/2">
              {/* Clinic Image */}
              <div className="h-64 relative">
                <img
                  src={clinic.image}
                  alt={clinic.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full">
                  {clinic.rating} ★ ({clinic.totalReviews})
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

              {/* Clinic Info Section - Moved under the image */}
              <div className="p-6">
                {/* About the Clinic */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    About the Clinic
                  </h3>
                  <p className="text-gray-600 mb-4">{clinic.description}</p>
                </div>

                {/* Contact Information */}
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
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                      <span className="text-sm">{clinic.website}</span>
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

                {/* Reviews Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Patient Reviews
                    </h3>
                    <span className="text-blue-600 font-medium flex items-center">
                      {clinic.rating}
                      <svg
                        className="h-4 w-4 text-yellow-500 ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm text-gray-600 ml-1">
                        ({clinic.totalReviews})
                      </span>
                    </span>
                  </div>

                  <div className="space-y-4 mb-4">
                    {clinic.reviews.slice(0, 2).map(review => (
                      <div
                        key={review.id}
                        className="p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex mb-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm">
                          "{review.comment}"
                        </p>
                        <div className="mt-1 flex justify-between">
                          <span className="text-xs font-medium">
                            {review.user}
                          </span>
                          <span className="text-xs text-gray-500">
                            {review.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={`/clinic/${clinic.id}/reviews`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                  >
                    Read all reviews
                    <svg
                      className="h-4 w-4 ml-1"
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
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Form Only */}
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

                {/* Time Slots with more precise options */}
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">
                    Select Time
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map(slot => (
                      <button
                        key={slot.id}
                        onClick={() =>
                          slot.available && setSelectedSlot(slot.id)
                        }
                        className={`py-2 px-1 rounded text-sm font-medium text-center ${
                          !slot.available
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : selectedSlot === slot.id
                            ? "bg-blue-600 text-white"
                            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
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
                      <option value="">Any Available Doctor</option>
                      {clinic.doctors.map(doctor => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.specialty}
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded transition"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicDetails;
