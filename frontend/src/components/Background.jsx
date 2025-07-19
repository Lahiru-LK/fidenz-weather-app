import React from 'react';

const Background = ({ dark, isLoaded, children }) => {
  return (
    <>
      <div 
        className={`min-h-screen transition-all duration-500 p-6 relative ${
          dark 
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
            : 'bg-gradient-to-br from-blue-50 via-white to-blue-100'
        } ${isLoaded ? 'bg-morph-dashboard' : ''}`}
      >
        {/* Transparent background image overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/src/assets/backcloud.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </>
  );
};

export default Background;
