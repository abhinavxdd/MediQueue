import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getClinicsByLocation } from "../services/clinicService";

const NearbyClinics = ({ selectedLocation }) => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        setLoading(true);
        const data = await getClinicsByLocation(selectedLocation);
        setClinics(data);
        setError(null);
      } catch (err) {
        setError("Failed to load clinics. Please try again later.");
        console.error("Error fetching clinics:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, [selectedLocation]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md my-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

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

      {clinics.length === 0 ? (
        <p className="text-gray-600 text-center py-8">
          No clinics found in {selectedLocation}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinics.map(clinic => (
            <div
              key={clinic._id}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <Link to={`/clinic/${clinic._id}`}>
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
                <Link to={`/clinic/${clinic._id}`}>
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
                <p className="text-sm text-gray-600 mb-4">
                  {clinic.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-green-600">
                    Open Now: {clinic.hours}
                  </span>
                  <Link
                    to={`/clinic/${clinic._id}`}
                    className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NearbyClinics;
