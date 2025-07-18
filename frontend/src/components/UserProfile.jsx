import React, { useState } from 'react';

const UserProfile = ({ dark }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Mock user data - you can replace this with actual user data from props or context
  const user = {
    name: "LK Lahiru",
    avatar: "👤" // You can replace this with an actual image
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    // Example: clear localStorage, redirect to login page, etc.
    // localStorage.removeItem('authToken');
    // window.location.href = '/login';
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      {/* User Profile Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`flex items-center space-x-3 p-1 mt-1 rounded-lg transition-all duration-300 hover:bg-opacity-80 ${
          dark 
            ? 'hover:bg-gray-700' 
            : 'hover:bg-white hover:shadow-md'
        }`}
      >
        {/* User Avatar */}
        <div className={`w-8 h-8 md:w-16 md:h-16 rounded-full flex items-center justify-center text-sm md:text-lg transition-all duration-300 ${
          dark 
            ? 'bg-gray-700 text-white' 
            : 'bg-white text-gray-800 shadow-md'
        }`}>
          <svg className="w-5 h-5 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        
        {/* User Name */}
        <span className={`text-sm font-medium transition-colors duration-300 ${
          dark ? 'text-gray-200' : 'text-gray-700'
        }`}>
          {user.name}
        </span>
        
        {/* Dropdown Arrow */}
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''} ${
            dark ? 'text-gray-300' : 'text-gray-600'
          }`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className={`absolute top-full right-0 mt-2 w-44 rounded-lg shadow-lg border z-50 ${
          dark 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="py-2">
            <button
              onClick={handleLogout}
              className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 flex items-center space-x-2 ${
                dark 
                  ? 'text-gray-200 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
