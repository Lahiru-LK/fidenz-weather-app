import React from 'react';

const SearchBar = ({ searchCity, setSearchCity, onAddCity, dark }) => {
  return (
    <div className="flex justify-center max-w-md mx-auto mb-4 mt-2">
      <input
        type="text"
        placeholder="Enter a city"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        className={`flex-1 px-4 py-2 rounded-l-lg border transition-colors duration-300 focus:outline-none ${
          dark
            ? 'bg-gray-700 text-white border-gray-600 focus:border-blue-400 placeholder-gray-400'
            : 'bg-white text-gray-800 border-gray-300 focus:border-blue-500 placeholder-gray-500 shadow-sm'
        }`}
      />
      <button
        onClick={onAddCity}
        className={`px-6 py-2 rounded-r-lg transition-colors duration-300 font-medium shadow-sm ${
          dark
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        Add City
      </button>
    </div>
  );
};

export default SearchBar;
