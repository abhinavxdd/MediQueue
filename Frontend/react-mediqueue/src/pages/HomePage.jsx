import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated on component mount
  useEffect(() => {
    // This would typically check a JWT token or session
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePatientPortalClick = () => {
    if (isAuthenticated) {
      // Navigate to patient dashboard if authenticated
      navigate("/patient-dashboard");
    } else {
      // Show login modal if not authenticated
      setShowLoginModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleLogin = e => {
    e.preventDefault();
    // In a real app, you'd validate credentials and make an API call
    // For now, just simulate a successful login
    localStorage.setItem("authToken", "sample-token");
    setIsAuthenticated(true);
    setShowLoginModal(false);
    navigate("/patient-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">MediQueue</div>

          <div className="hidden md:flex space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              About
            </a>
            <a
              href="#services"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Services
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Contact
            </a>
          </div>

          <div className="flex space-x-4">
            <button className="px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition">
              Login
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto py-16 px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            Welcome to MediQueue
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Book your dental appointments with ease and convenience
          </p>

          <div className="flex flex-col md:flex-row gap-8 justify-center mt-12">
            <button
              onClick={handlePatientPortalClick}
              className="group bg-white p-8 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-2 w-full md:w-80"
            >
              <div className="text-center">
                <span className="text-5xl mb-4 block">👤</span>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  Patient Portal
                </h3>
                <p className="text-gray-600">
                  Book appointments and manage your profile
                </p>
              </div>
            </button>

            <button className="group bg-white p-8 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-2 w-full md:w-80">
              <div className="text-center">
                <span className="text-5xl mb-4 block">👨‍⚕️</span>
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  Doctor Portal
                </h3>
                <p className="text-gray-600">
                  Manage schedules and view appointments
                </p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">
            Why Choose MediQueue
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <span className="text-4xl block mb-4 text-center">📅</span>
              <h3 className="text-xl font-semibold text-blue-600 mb-3 text-center">
                Easy Scheduling
              </h3>
              <p className="text-gray-600 text-center">
                Book appointments with just a few clicks
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <span className="text-4xl block mb-4 text-center">🔔</span>
              <h3 className="text-xl font-semibold text-blue-600 mb-3 text-center">
                Reminders
              </h3>
              <p className="text-gray-600 text-center">
                Get notified about upcoming appointments
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <span className="text-4xl block mb-4 text-center">⭐</span>
              <h3 className="text-xl font-semibold text-blue-600 mb-3 text-center">
                Top Specialists
              </h3>
              <p className="text-gray-600 text-center">
                Connect with qualified healthcare professionals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-600">
                Patient Login
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                  required
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                Sign In
              </button>

              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Sign up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default HomePage;
