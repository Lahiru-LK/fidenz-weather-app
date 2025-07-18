import React from 'react';

const Header = ({ dark, setDark }) => {
  return (
    <div className={`text-center relative py-6 px-6 border-b transition-colors duration-300 sticky top-0 z-50 ${
      dark 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-blue-50 border-gray-200'
    }`}>
      <div className="flex items-center justify-center">
        <span className="text-3xl mr-2">🌤️</span>
        <h1 className={`text-2xl font-semibold transition-colors duration-300 ${
          dark ? 'text-white' : 'text-gray-800'
        }`}>Weather App</h1>
      </div>
      
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-6">
        <button
          onClick={() => setDark(!dark)}
          className={`text-xl p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110 ${
            dark 
              ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
              : 'bg-white text-gray-800 hover:bg-gray-100'
          }`}
        >
          {dark ? "🌙" : "☀️"}
        </button>
      </div>
    </div>
  );
};

export default Header;
