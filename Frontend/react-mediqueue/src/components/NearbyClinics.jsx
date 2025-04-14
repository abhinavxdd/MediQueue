import React from "react";
import { Link } from "react-router-dom";

const NearbyClinics = ({ selectedLocation }) => {
  // Mock clinics data
  const clinics = [
    {
      id: "1",
      name: "Brightsmile Dental Clinic",
      distance: "1.2",
      area: selectedLocation,
      description:
        "Specializing in cosmetic dentistry, dental implants, and routine checkups.",
      hours: "9AM-5PM",
      image:
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVudGFsJTIwY2xpbmljfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
      rating: 4.8,
    },
    {
      id: "2",
      name: "Advanced Dental Care",
      distance: "2.5",
      area: selectedLocation,
      description:
        "Full-service dental practice offering orthodontics, endodontics, and pediatric care.",
      hours: "8AM-7PM",
      image:
        "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGVudGlzdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      rating: 4.6,
    },
    {
      id: "3",
      name: "Family Dental Center",
      distance: "0.8",
      area: selectedLocation,
      description:
        "Family-friendly practice with gentle care for all ages. Specializing in preventive care.",
      hours: "9AM-6PM",
      image:
        "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRlbnRhbCUyMGNsaW5pY3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      rating: 4.9,
    },
  ];

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
        {clinics.map(clinic => (
          <div
            key={clinic.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <Link to={`/clinic/${clinic.id}`}>
              <div className="h-48 bg-gray-300 relative">
                <img
                  src={clinic.image}
                  alt={clinic.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {clinic.rating} ★
                </div>
              </div>
            </Link>
            <div className="p-5">
              <Link to={`/clinic/${clinic.id}`}>
                <h3 className="font-semibold text-lg mb-1 hover:text-blue-600">
                  {clinic.name}
                </h3>
              </Link>
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
                <span>
                  {clinic.distance} miles away • {clinic.area}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{clinic.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-green-600">
                  Open Now: {clinic.hours}
                </span>
                <Link
                  to={`/clinic/${clinic.id}`}
                  className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyClinics;
