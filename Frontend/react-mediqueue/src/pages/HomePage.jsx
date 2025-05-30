import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { loginUser, loginDoctor, registerUser } from "../services/authService";

function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDoctorAuthenticated, setIsDoctorAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDoctorLoginModal, setShowDoctorLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [doctorPassword, setDoctorPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated on component mount and redirect accordingly
  useEffect(() => {
    // Check patient authentication
    const token = localStorage.getItem("authToken");
    if (token) {
      // Redirect to patient dashboard if patient is logged in
      navigate("/patient-dashboard");
      return;
    }

    // Check doctor authentication
    const doctorToken = localStorage.getItem("doctorAuthToken");
    if (doctorToken) {
      // Redirect to doctor dashboard if doctor is logged in
      navigate("/doctor-dashboard");
      return;
    }
  }, [navigate]);

  const handlePatientPortalClick = () => {
    if (isAuthenticated) {
      // Navigate to patient dashboard if authenticated
      navigate("/patient-dashboard");
    } else {
      // Show login modal if not authenticated
      setShowLoginModal(true);
    }
  };

  const handleDoctorPortalClick = () => {
    if (isDoctorAuthenticated) {
      // Navigate to doctor dashboard if authenticated
      navigate("/doctor-dashboard");
    } else {
      // Show doctor login modal if not authenticated
      setShowDoctorLoginModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setError("");
    setEmail("");
    setPassword("");
  };

  const handleCloseDoctorModal = () => {
    setShowDoctorLoginModal(false);
    setError("");
    setDoctorEmail("");
    setDoctorPassword("");
  };

  const handleCloseSignupModal = () => {
    setShowSignupModal(false);
    setError("");
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
    setSignupConfirmPassword("");
    setSignupPhone("");
  };

  const handleLogin = async e => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Clear any existing doctor authentication first to ensure only one login type
      localStorage.removeItem("doctorAuthToken");
      localStorage.removeItem("userRole");

      // Login as patient
      await loginUser(email, password);
      setIsAuthenticated(true);
      setShowLoginModal(false);
      navigate("/patient-dashboard");
    } catch (error) {
      setError(
        error.message || "Failed to login. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoctorLogin = async e => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Clear any existing patient authentication first to ensure only one login type
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");

      // Login as doctor
      await loginDoctor(doctorEmail, doctorPassword);
      setIsDoctorAuthenticated(true);
      setShowDoctorLoginModal(false);
      navigate("/doctor-dashboard");
    } catch (error) {
      setError(
        error.message || "Failed to login. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async e => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (signupPassword !== signupConfirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    if (signupPassword.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      // Clear any existing authentication tokens
      localStorage.removeItem("doctorAuthToken");
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");

      const userData = {
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        phone: signupPhone,
      };

      await registerUser(userData);
      // Auto login after successful registration
      await loginUser(signupEmail, signupPassword);
      setIsAuthenticated(true);
      setShowSignupModal(false);
      navigate("/patient-dashboard");
    } catch (error) {
      setError(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-md hover:bg-blue-50 transition"
            >
              Login
            </button>
            <button
              onClick={() => setShowSignupModal(true)}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
            >
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

            <button
              onClick={handleDoctorPortalClick}
              className="group bg-white p-8 rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-2 w-full md:w-80"
            >
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

      {/* Patient Login Modal */}
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

            {error && (
              <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

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
                  value={email}
                  onChange={e => setEmail(e.target.value)}
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
                  value={password}
                  onChange={e => setPassword(e.target.value)}
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
                disabled={isLoading}
                className={`w-full ${
                  isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } text-white py-2 px-4 rounded-md transition`}
              >
                {isLoading ? "Signing in..." : "Sign In"}
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

      {/* Doctor Login Modal */}
      {showDoctorLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-600">Doctor Login</h2>
              <button
                onClick={handleCloseDoctorModal}
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

            {error && (
              <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleDoctorLogin}>
              <div className="mb-4">
                <label
                  htmlFor="doctor-email"
                  className="block text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="doctor-email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="doctor@example.com"
                  value={doctorEmail}
                  onChange={e => setDoctorEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="doctor-password"
                  className="block text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="doctor-password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                  value={doctorPassword}
                  onChange={e => setDoctorPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    id="doctor-remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="doctor-remember-me"
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
                disabled={isLoading}
                className={`w-full ${
                  isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } text-white py-2 px-4 rounded-md transition`}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>

              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Contact administration
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Patient Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-600">
                Create Account
              </h2>
              <button
                onClick={handleCloseSignupModal}
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

            {error && (
              <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label
                  htmlFor="signup-name"
                  className="block text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="signup-name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Smith"
                  value={signupName}
                  onChange={e => setSignupName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="signup-email"
                  className="block text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="signup-email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="signup-phone"
                  className="block text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="signup-phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="9876543210"
                  value={signupPhone}
                  onChange={e => setSignupPhone(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="signup-password"
                  className="block text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="signup-password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                  value={signupPassword}
                  onChange={e => setSignupPassword(e.target.value)}
                  required
                  minLength="6"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="signup-confirm-password"
                  className="block text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="signup-confirm-password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                  value={signupConfirmPassword}
                  onChange={e => setSignupConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full ${
                  isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } text-white py-2 px-4 rounded-md transition`}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>

              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      handleCloseSignupModal();
                      setShowLoginModal(true);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Sign in
                  </button>
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
