import React from "react";
import Footer from "../components/Footer";

const Services = () => {
  const items = [
    { title: "Appointment Booking", desc: "Find clinics and book instantly." },
    { title: "Patient Dashboard", desc: "Track upcoming and past visits." },
    { title: "Doctor Portal", desc: "Manage schedules and notes." },
    { title: "Reports & Prescriptions", desc: "Access records securely." },
  ];
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="container mx-auto px-6 py-12 flex-1">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Services</h1>
        <p className="text-gray-700 mb-8">
          Everything for a seamless healthcare experience.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(s => (
            <div key={s.title} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
              <p className="text-gray-600 mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
