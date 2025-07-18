import React from 'react';

const Background = ({ dark, isLoaded, children }) => {
  return (
    <>

      <div className={`min-h-screen transition-all duration-500 p-6 ${
        dark 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'
      } ${isLoaded ? 'bg-morph-dashboard' : ''}`}>
        {children}
      </div>
    </>
  );
};

export default Background;
