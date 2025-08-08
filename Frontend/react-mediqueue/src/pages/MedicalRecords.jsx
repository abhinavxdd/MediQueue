import React, { useState } from 'react';
import PatientNavbar from '../components/PatientNavbar';

const MedicalRecords = () => {
  const [selectedLocation, setSelectedLocation] = useState("Hamirpur");
  const [activeTab, setActiveTab] = useState('records');
  const [records, setRecords] = useState({
    records: [
      {
        id: 1,
        type: 'Dental X-Ray',
        date: '2024-01-15',
        doctor: 'Dr. Sarah Johnson',
        clinic: 'Brightsmile Dental Clinic',
        description: 'Full mouth X-ray series',
        attachmentUrl: 'https://example.com/xray1.pdf'
      },
      {
        id: 2,
        type: 'Treatment Plan',
        date: '2024-01-10',
        doctor: 'Dr. Michael Chen',
        clinic: 'Downtown Dental Care',
        description: 'Comprehensive treatment plan for orthodontic work',
        attachmentUrl: 'https://example.com/treatment-plan.pdf'
      }
    ],
    prescriptions: [
      {
        id: 1,
        medication: 'Amoxicillin',
        dosage: '500mg',
        frequency: 'Three times daily',
        duration: '7 days',
        date: '2024-01-15',
        doctor: 'Dr. Sarah Johnson',
        notes: 'Take with food'
      },
      {
        id: 2,
        medication: 'Ibuprofen',
        dosage: '400mg',
        frequency: 'As needed',
        duration: '5 days',
        date: '2024-01-10',
        doctor: 'Dr. Michael Chen',
        notes: 'Take for pain relief'
      }
    ]
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <PatientNavbar
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Medical Records</h1>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {['records', 'prescriptions'].map((tab) => (
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
          {activeTab === 'records' && (
            <div className="divide-y divide-gray-200">
              {records.records.map((record) => (
                <div key={record.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{record.type}</h3>
                      <p className="mt-1 text-sm text-gray-500">{record.doctor}</p>
                    </div>
                    <a
                      href={record.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      View Document
                    </a>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">{record.clinic}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                    <p className="mt-2 text-sm text-gray-600">{record.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'prescriptions' && (
            <div className="divide-y divide-gray-200">
              {records.prescriptions.map((prescription) => (
                <div key={prescription.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {prescription.medication}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{prescription.doctor}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Dosage</p>
                      <p className="mt-1 text-sm text-gray-900">{prescription.dosage}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Frequency</p>
                      <p className="mt-1 text-sm text-gray-900">{prescription.frequency}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Duration</p>
                      <p className="mt-1 text-sm text-gray-900">{prescription.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Prescribed On</p>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(prescription.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {prescription.notes && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-500">Notes</p>
                      <p className="mt-1 text-sm text-gray-600">{prescription.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;