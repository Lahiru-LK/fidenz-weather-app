import React from 'react';

const Breadcrumb = ({ dark }) => {
  return (
    <div className={`transition-colors duration-300 ${
      dark ? 'text-gray-300' : 'text-white'
    }`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center text-sm">
          <span className="hover:underline cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className={`font-medium ${
            dark ? 'text-white' : 'text-white'
          }`}>Dashboard</span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
