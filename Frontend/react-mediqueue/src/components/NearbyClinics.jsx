import React from "react";
import { Link } from "react-router-dom";

const NearbyClinics = ({ selectedLocation }) => {
  return (
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
              Specializing in cosmetic dentistry, dental implants, and routine
              checkups.
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
            <h3 className="font-semibold text-lg mb-1">Advanced Dental Care</h3>
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
              Full-service dental practice offering orthodontics, endodontics,
              and pediatric care.
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
            <h3 className="font-semibold text-lg mb-1">Family Dental Center</h3>
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
  );
};

export default NearbyClinics;
