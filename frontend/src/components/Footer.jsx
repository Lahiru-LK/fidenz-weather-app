import React from 'react';

const Footer = ({ dark }) => {
  return (
    <div className={`text-center py-6 border-t transition-colors duration-300 ${
      dark 
        ? 'border-gray-700 bg-gray-900 text-gray-300' 
        : 'border-gray-300 bg-blue-50 text-gray-600'
    }`}>
      <p className="text-sm">2023 Fidenz Technologies</p>
    </div>
  );
};

export default Footer;
