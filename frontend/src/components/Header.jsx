import React, { useState } from 'react';
import UserProfile from './UserProfile';

const Header = ({ dark, setDark }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    console.log('Logging out...');
    setShowMobileMenu(false);
  };

  return (
    <div className={`text-center relative py-2 px-6 border-b transition-colors duration-300 sticky top-0 z-50 ${
      dark 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-blue-50 border-gray-200'
    }`}>
      <div className="flex items-center justify-center">
        <img 
          src="/src/assets/mainlogo.png" 
          alt="Weather App Logo" 
          className="w-16 h-16 mr-2"
        />
        <h1 className={`text-2xl font-semibold transition-colors duration-300 ${
          dark ? 'text-white' : 'text-gray-800'
        }`}>Weather App</h1>
      </div>
      
      {/* Desktop - User Profile */}
      <div className="hidden md:block absolute top-0 right-6">
        <UserProfile dark={dark} />
      </div>
      
      {/* Desktop - Dark Mode Toggle */}
      <div className="hidden md:block absolute top-6 right-52">
        <button
          onClick={() => setDark(!dark)}
          className={`text-xl p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110 ${
            dark 
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
              : 'bg-white text-gray-800 hover:bg-gray-100'
          }`}
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
      </div>

      {/* Mobile - Hamburger Menu */}
      <div className="md:hidden absolute top-6 right-4">
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className={`p-2 rounded-lg transition-colors duration-300 ${
            dark 
              ? 'text-white hover:bg-gray-700' 
              : 'text-gray-800 hover:bg-gray-200'
          }`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Dropdown Menu */}
        {showMobileMenu && (
          <div className={`absolute top-full right-0 mt-2 w-48 rounded-lg shadow-lg border z-50 ${
            dark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="py-2">
              <button
                onClick={() => setShowMobileMenu(false)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 flex items-center space-x-3 ${
                  dark 
                    ? 'text-gray-200 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
                <span>Home</span>
              </button>
              
              <button
                onClick={() => setShowMobileMenu(false)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 flex items-center space-x-3 ${
                  dark 
                    ? 'text-gray-200 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                </svg>
                <span>Dashboard</span>
              </button>

              <div className="border-t border-gray-300 my-2"></div>
              
              <button
                onClick={() => setDark(!dark)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 flex items-center space-x-3 ${
                  dark 
                    ? 'text-gray-200 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {dark ? 
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/>
                  </svg>
                  : 
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/>
                  </svg>
                }
                <span>{dark ? "Dark Mode" : "Light Mode"}</span>
              </button>
              
              <button
                onClick={handleLogout}
                className={`w-full text-left px-4 py-3 text-sm transition-colors duration-200 flex items-center space-x-3 ${
                  dark 
                    ? 'text-gray-200 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-50'
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
    </div>
  );
};

export default Header;
