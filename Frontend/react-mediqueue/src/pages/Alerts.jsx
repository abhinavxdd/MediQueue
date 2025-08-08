import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientNavbar from '../components/PatientNavbar';

const Alerts = () => {
  const [selectedLocation, setSelectedLocation] = useState("Hamirpur");
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'appointment',
      message: 'Upcoming appointment tomorrow at 10:00 AM with Dr. Sarah Johnson',
      date: '2024-01-20',
      isRead: false
    },
    {
      id: 2,
      type: 'medical',
      message: 'Your prescription is ready for pickup',
      date: '2024-01-19',
      isRead: true
    },
    {
      id: 3,
      type: 'reminder',
      message: 'Time to schedule your follow-up appointment',
      date: '2024-01-18',
      isRead: false
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <PatientNavbar
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Notifications</h1>

        <div className="bg-white rounded-lg shadow">
          {alerts.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <p className="mt-4 text-gray-500">No notifications at this time</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-6 ${!alert.isRead ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {alert.type === 'appointment' && (
                        <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                      {alert.type === 'medical' && (
                        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      {alert.type === 'reminder' && (
                        <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-900">{alert.message}</p>
                      <p className="mt-1 text-sm text-gray-500">{new Date(alert.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alerts;