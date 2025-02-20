import React from 'react'

const Loadingcompo = () => {
    return (
        <div className="animate-pulse space-y-4 p-4 border rounded-xl shadow-sm bg-white dark:bg-gray-800 w-full max-w-sm">
            {/* Image Placeholder */}
            <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>

            {/* Title Placeholder */}
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

            {/* Description Placeholder */}
            <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
            </div>

            {/* Button Placeholder */}
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-lg w-full"></div>
        </div>

    );
};

export default Loadingcompo;