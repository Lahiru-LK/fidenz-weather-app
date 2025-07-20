import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = ({ dark, user, setDark }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useAuth0();

  // Use Auth0 user data if available, fallback to mock
  const displayName = user?.name || user?.email || "User";

  const handleLogout = () => {
    setShowDropdown(false);
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const handleDarkModeToggle = () => {
    const newDark = !dark;
    setDark && setDark(newDark);
    localStorage.setItem('darkMode', JSON.stringify(newDark));
  };

  return (
    <div className="relative flex items-center space-x-2">
      {/* Dark Mode Toggle */}
      <button
        onClick={handleDarkModeToggle}
        className={`text-xl p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110 ${
          dark 
            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
            : 'bg-white text-gray-800 hover:bg-gray-100'
        }`}
        aria-label="Toggle dark mode"
      >
        {dark ? 
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/>
          </svg>
          : 
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/>
          </svg>
        }
      </button>
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
          {displayName}
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
