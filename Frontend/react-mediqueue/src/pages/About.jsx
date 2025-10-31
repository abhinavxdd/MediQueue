import React from "react";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <main className="container mx-auto px-6 py-12 flex-1">
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          About MediQueue
        </h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-3xl">
          MediQueue streamlines appointment booking between patients and
          clinics. Our mission is to reduce waiting time and improve access to
          care.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default About;
