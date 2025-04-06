import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-16">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <svg
            className="mx-auto h-24 w-24 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mt-4 mb-8">
          We couldn't find the page you're looking for. The page might have been
          removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200 shadow-md"
          >
            Return to Homepage
          </Link>

          <div className="flex justify-center mt-6">
            <Link
              to="/"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to MediQueue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
