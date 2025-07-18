import React from 'react';

const Breadcrumb = ({ dark }) => {
  return (
    <div className={`transition-colors duration-300 ${
      dark ? 'text-gray-300' : 'text-gray-600'
    }`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center text-sm mb-6">
          <span className={`hover:underline cursor-pointer ${
            dark ? 'hover:text-white' : 'hover:text-blue-600'
          }`}>Home</span>
          <span className="mx-2">/</span>
          <span className={`font-medium ${
            dark ? 'text-white' : 'text-gray-800'
          }`}>Dashboard</span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
