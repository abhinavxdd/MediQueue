import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PatientNavbar from '../components/PatientNavbar';

const History = () => {
  const [selectedLocation, setSelectedLocation] = useState("Hamirpur");
  const [activeTab, setActiveTab] = useState('appointments');
  const [history, setHistory] = useState({
    appointments: [
      {
        id: 1,
        doctorName: "Dr. Sarah Johnson",
        specialty: "Orthodontics",
        date: "2024-01-15",
        time: "10:00 AM",
        status: "completed",
        clinic: "Brightsmile Dental Clinic"
      },
      {
        id: 2,
        doctorName: "Dr. Michael Chen",
        specialty: "General Dentistry",
        date: "2023-12-20",
        time: "2:30 PM",
        status: "cancelled",
        clinic: "Downtown Dental Care"
      }
    ],
    treatments: [
      {
        id: 1,
        name: "Root Canal Treatment",
        date: "2024-01-15",
        doctor: "Dr. Sarah Johnson",
        notes: "Successful procedure, follow-up scheduled"
      },
      {
        id: 2,
        name: "Dental Cleaning",
        date: "2023-12-20",
        doctor: "Dr. Michael Chen",
        notes: "Regular cleaning and check-up"
      }
    ]
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PatientNavbar
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Medical History</h1>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {['appointments', 'treatments'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow">
          {activeTab === 'appointments' && (
            <div className="divide-y divide-gray-200">
              {history.appointments.map((appointment) => (
                <div key={appointment.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{appointment.doctorName}</h3>
                      <p className="mt-1 text-sm text-gray-500">{appointment.specialty}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </span>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    <p>{appointment.clinic}</p>
                    <p>{new Date(appointment.date).toLocaleDateString()} at {appointment.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'treatments' && (
            <div className="divide-y divide-gray-200">
              {history.treatments.map((treatment) => (
                <div key={treatment.id} className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">{treatment.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{treatment.doctor}</p>
                  <p className="mt-2 text-sm text-gray-500">{new Date(treatment.date).toLocaleDateString()}</p>
                  <p className="mt-2 text-sm text-gray-600">{treatment.notes}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;