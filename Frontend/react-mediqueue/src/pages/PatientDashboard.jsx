import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Hamirpur");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  // Locations list
  const locations = ["Hamirpur", "Solan", "Paonta Sahib"];

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  // Function to handle location selection
  const handleLocationSelect = location => {
    setSelectedLocation(location);
    setShowLocationDropdown(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-3 px-6 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <svg
                className="h-8 w-8 text-blue-600"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.671 8.11l-7.141-7.128c-0.896-0.895-2.349-0.895-3.245 0l-7.138 7.128c-0.896 0.896-0.896 2.349 0 3.245l7.138 7.140c0.896 0.896 2.349 0.896 3.245 0l7.141-7.14c0.896-0.896 0.896-2.349 0-3.245zM12 16c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"></path>
              </svg>
              <span className="text-xl font-bold text-blue-600">MediQueue</span>
            </Link>

            {/* Location Selector - Always visible */}
            <div className="relative hidden sm:block">
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-1 rounded-md border border-gray-200"
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              >
                <svg
                  className="w-5 h-5"
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
                <span>{selectedLocation}</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Location Dropdown */}
              {showLocationDropdown && (
                <div className="absolute mt-1 bg-white shadow-md rounded-md overflow-hidden z-20 w-48">
                  {locations.map((location, index) => (
                    <button
                      key={index}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        selectedLocation === location
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => handleLocationSelect(location)}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex items-center max-w-md w-full mx-4">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search for doctors, services..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Mobile Search Icon */}
              <button
                className="md:hidden text-gray-700 hover:text-blue-600"
                onClick={() => setShowMobileSearch(!showMobileSearch)}
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>

              {/* Mobile Location Dropdown */}
              <button
                className="sm:hidden text-gray-700 hover:text-blue-600"
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
              </button>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-medium">JP</span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">John Patient</p>
                    <p className="text-xs text-gray-500">Patient</p>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Profile Dropdown Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                    <Link
                      to="/patient-profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/appointments"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Appointments
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <hr className="my-1 border-gray-200" />
                    <Link
                      to="/help"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Help Center
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search Bar - Conditional Display */}
          {showMobileSearch && (
            <div className="mt-3 md:hidden">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search for doctors, services..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Mobile Location Dropdown */}
          {showLocationDropdown && (
            <div className="sm:hidden mt-3 bg-white rounded-md overflow-hidden z-20">
              {locations.map((location, index) => (
                <button
                  key={index}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    selectedLocation === location
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => handleLocationSelect(location)}
                >
                  {location}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, John!</h1>
          <p className="text-gray-600 mt-1">
            Here's your health at a glance in {selectedLocation}
          </p>
        </div>

        {/* Horizontally aligned cards - Medical Records removed */}
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
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <span className="text-sm font-medium">Message Doctor</span>
              </button>

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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="text-sm font-medium">Insurance</span>
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

        {/* Clinics Near You Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Clinics in {selectedLocation}
            </h2>
            <Link to="/clinics" className="text-blue-600 hover:underline">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Clinic Card 1 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-48 bg-gray-300 relative">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVudGFsJTIwY2xpbmljfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                  alt="Brightsmile Dental Clinic"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  4.8 ★
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-1">
                  Brightsmile Dental Clinic
                </h3>
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <svg
                    className="h-4 w-4 mr-1"
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
                  <span>1.2 miles away • {selectedLocation}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Specializing in cosmetic dentistry, dental implants, and
                  routine checkups.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-600">
                    Open Now: 9AM-5PM
                  </span>
                  <button className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Clinic Card 2 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-48 bg-gray-300 relative">
                <img
                  src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGVudGlzdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt="Advanced Dental Care"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  4.6 ★
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-1">
                  Advanced Dental Care
                </h3>
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <svg
                    className="h-4 w-4 mr-1"
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
                  <span>2.5 miles away • {selectedLocation}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Full-service dental practice offering orthodontics,
                  endodontics, and pediatric care.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-600">
                    Open Now: 8AM-7PM
                  </span>
                  <button className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                    Book Now
                  </button>
                </div>
              </div>
            </div>

            {/* Clinic Card 3 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-48 bg-gray-300 relative">
                <img
                  src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRlbnRhbCUyMGNsaW5pY3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  alt="Family Dental Center"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  4.9 ★
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg mb-1">
                  Family Dental Center
                </h3>
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <svg
                    className="h-4 w-4 mr-1"
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
                  <span>0.8 miles away • {selectedLocation}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Family-friendly practice with gentle care for all ages.
                  Specializing in preventive care.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-600">
                    Open Now: 9AM-6PM
                  </span>
                  <button className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
