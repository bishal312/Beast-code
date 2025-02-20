import React from 'react'

const DashboardLoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center flex flex-col items-center">
        {/* Hexagon Spinner */}
        <div className="relative mb-6">
          <div className="h-16 w-16 animate-pulse bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-[20%] transform rotate-45"></div>
          <div className="absolute inset-0 h-full w-full border-4 border-indigo-300 dark:border-indigo-600 rounded-[20%] animate-spin"></div>
        </div>

        {/* Loading Text */}
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Loading Dashboard...
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Please wait while we prepare your dashboard.
        </p>
      </div>
    </div>

  );
};

export default DashboardLoadingScreen;