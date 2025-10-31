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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <main className="container mx-auto px-6 py-12 flex-1">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          Services
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          Everything for a seamless healthcare experience.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <div
              key={s.title}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {s.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
