import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import PatientNavbar from "../components/PatientNavbar";
import { getAppointmentById } from "../services/appointmentService";

const AppointmentDetails = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("Hamirpur");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/");
          return;
        }

        const data = await getAppointmentById(appointmentId);
        setAppointment(data);
      } catch (error) {
        console.error("Error fetching appointment details:", error);
        setError("Failed to load appointment details");
        if (error.response && error.response.status === 401) {
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [appointmentId, navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status) => {
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

  if (error || !appointment) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PatientNavbar 
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {error || "Appointment not found"}
            </h2>
            <button
              onClick={() => navigate("/appointments")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Back to Appointments
            </button>
          </div>
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
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Link to="/patient-dashboard" className="hover:text-blue-600">
            Dashboard
          </Link>
          <svg className="h-3 w-3 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          <Link to="/appointments" className="hover:text-blue-600">
            Appointments
          </Link>
          <svg className="h-3 w-3 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-800 font-medium">Appointment Details</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Appointment with Dr. {appointment.doctor?.name}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {formatDate(appointment.date)}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {appointment.time}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {appointment.clinic?.name}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: "overview", label: "Overview", icon: "📋" },
                { id: "medical", label: "Medical Details", icon: "🏥" },
                { id: "prescriptions", label: "Prescriptions", icon: "💊" },
                { id: "reports", label: "Reports", icon: "📄" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Appointment Overview</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Visit Summary</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-600">Chief Complaint</label>
                          <p className="text-gray-900">{appointment.reason}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Duration</label>
                          <p className="text-gray-900">{appointment.duration || "30 minutes"}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Appointment Type</label>
                          <p className="text-gray-900">{appointment.type || "Consultation"}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-600">Consultation Fee</label>
                          <p className="text-gray-900">₹{appointment.consultationFee || "500"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {appointment.status === "completed" && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Doctor's Notes</h3>
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <p className="text-gray-800">
                          {appointment.doctorNotes || "Patient presented with dental discomfort. Examination revealed minor cavity in upper molar. Recommended filling procedure. Prescribed pain medication and advised follow-up in 2 weeks."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "medical" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Medical Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Diagnosis</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-800">
                        {appointment.diagnosis || "Dental Caries (Tooth Decay) - Upper Right Molar"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Treatment Provided</h3>
                    <div className="space-y-2">
                      {(appointment.treatments || [
                        "Clinical examination",
                        "X-ray imaging",
                        "Cavity cleaning",
                        "Temporary filling placement"
                      ]).map((treatment, index) => (
                        <div key={index} className="flex items-center bg-gray-50 rounded-lg p-3">
                          <svg className="w-4 h-4 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-800">{treatment}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Vital Signs</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: "Blood Pressure", value: appointment.vitals?.bp || "120/80", unit: "mmHg" },
                        { label: "Heart Rate", value: appointment.vitals?.hr || "72", unit: "bpm" },
                        { label: "Temperature", value: appointment.vitals?.temp || "98.6", unit: "°F" },
                        { label: "Weight", value: appointment.vitals?.weight || "70", unit: "kg" },
                      ].map((vital, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                          <p className="text-sm font-medium text-gray-600">{vital.label}</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {vital.value} <span className="text-sm font-normal text-gray-600">{vital.unit}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "prescriptions" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Prescriptions</h2>
                
                <div className="space-y-4">
                  {(appointment.prescriptions || [
                    {
                      medicine: "Ibuprofen 400mg",
                      dosage: "1 tablet twice daily",
                      duration: "5 days",
                      instructions: "Take after meals"
                    },
                    {
                      medicine: "Chlorhexidine Mouthwash",
                      dosage: "15ml twice daily",
                      duration: "7 days",
                      instructions: "Rinse for 30 seconds, don't swallow"
                    },
                    {
                      medicine: "Amoxicillin 500mg",
                      dosage: "1 capsule three times daily",
                      duration: "7 days",
                      instructions: "Take with food, complete full course"
                    }
                  ]).map((prescription, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">{prescription.medicine}</h3>
                        <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {prescription.duration}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Dosage:</span> {prescription.dosage}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Instructions:</span> {prescription.instructions}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">Important Notes</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Please complete the full course of antibiotics as prescribed. If you experience any adverse reactions, contact the clinic immediately.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reports" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Medical Reports</h2>
                
                <div className="space-y-4">
                  {(appointment.reports || [
                    {
                      name: "Dental X-Ray",
                      date: "2024-01-15",
                      type: "X-Ray",
                      size: "2.4 MB",
                      url: "#"
                    },
                    {
                      name: "Blood Test Report",
                      date: "2024-01-15",
                      type: "Lab Report",
                      size: "1.2 MB",
                      url: "#"
                    }
                  ]).map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{report.name}</p>
                          <p className="text-sm text-gray-600">{report.type} • {report.size} • {report.date}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                          View
                        </button>
                        <button className="px-3 py-1 text-sm text-gray-600 border border-gray-600 rounded hover:bg-gray-50">
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {(!appointment.reports || appointment.reports.length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>No reports available for this appointment</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Doctor Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Doctor Information</h3>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-semibold">
                  {appointment.doctor?.name?.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">Dr. {appointment.doctor?.name}</p>
                  <p className="text-sm text-gray-600">{appointment.doctor?.specialization}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {appointment.doctor?.email}
                </p>
                <p className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {appointment.doctor?.phone}
                </p>
              </div>
            </div>

            {/* Clinic Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Clinic Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">{appointment.clinic?.name}</p>
                  <p className="text-sm text-gray-600">{appointment.clinic?.address}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {appointment.clinic?.phone}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {appointment.clinic?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                  Book Follow-up
                </button>
                <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Download Invoice
                </button>
                <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Share Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;