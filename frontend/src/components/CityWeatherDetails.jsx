import React from 'react';
import { useNavigate } from 'react-router-dom';

const CityWeatherDetails = ({ weather, dark }) => {
  const navigate = useNavigate();

  if (!weather) {
    return (
      <div className={`p-8 rounded-xl text-center ${dark
          ? 'bg-gray-800/70 text-white'
          : 'bg-white/70 text-gray-800'
        }`}>
        <p className="text-lg">No weather data available</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 px-4 py-2 mt-8">
      {/* Main Weather Card - Same design as WeatherCard */}
      <div className={`relative w-full mx-auto rounded-xl overflow-hidden shadow-lg bg-gradient-to-b ${weather?.gradient || 'from-blue-400 to-blue-600'} text-white font-sans transition-all duration-300 ${dark ? 'shadow-gray-800/50' : 'shadow-lg'}`}>
        
        {/* Back Arrow Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="absolute top-4 left-4 w-10 h-10 bg-gray-50/10 hover:bg-gray-100/30 rounded-full flex items-center justify-center text-white transition-all duration-200 z-20"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>

        {/* Main Weather Section */}
        <div
          className="px-6 py-8 md:px-16 md:py-8 relative"
          style={{
            backgroundImage: 'url(/assets/cardcloud.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundBlendMode: 'overlay'
          }}
        >
          {/* Mobile Layout - Centered */}
          <div className="block md:hidden text-center relative z-10">
            <h2 className="text-3xl font-bold mb-2  ">
              {weather.city}
            </h2>
            <p className="text-sm opacity-80 mb-4">
              {weather.date}
            </p>

            {/* Weather Icon and Condition - Mobile */}
            <div className="flex items-center justify-center mb-4">
              <span className="text-5xl mr-3">
                {weather.icon}
              </span>
              <span className="text-xl">
                {weather.condition}
              </span>
            </div>

            {/* Temperature - Mobile */}
            <h1 className="text-6xl font-bold leading-none mb-3">
              {weather.temp}
            </h1>
            <div className="text-sm opacity-80">
              <div>Min: {weather.tempMin} | Max: {weather.tempMax}</div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:block relative z-10">
            {/* Centered City Name and Date */}
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold">
                {weather.city}
              </h2>
              <p className="text-sm md:text-lg opacity-80 mt-3">
                {weather.date}
              </p>
            </div>
            
            {/* Weather Info and Temperature */}
            <div className="flex justify-between items-start">
              {/* Center - Icon and Condition */}
              <div className="flex flex-col items-center mx-auto">
                <span className="text-6xl md:text-8xl mb-3">
                  {weather.icon}
                </span>
                <span className="text-2xl md:text-3xl text-center">
                  {weather.condition}
                </span>
              </div>
              
              {/* Vertical Divider */}
              <div className="w-0.5 h-32 bg-white opacity-30 "></div>
              
              {/* Center side - Temperature */}
              <div className="flex flex-col items-center mx-auto">
                <h1 className="text-8xl md:text-7xl font-bold leading-none">
                  {weather.temp}
                </h1>
                <div className="text-sm md:text-lg opacity-80 mt-2">
                  <div>Temp Min: {weather.tempMin}</div>
                  <div>Temp Max: {weather.tempMax}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section - Same style as WeatherCard */}
        <div className={`px-6 py-4 md:px-16 md:py-10 ${dark
            ? 'bg-gray-900/90 border-t border-gray-700'
            : 'bg-gray-800/80'
          }`}>
          <div className="grid grid-cols-3 gap-4 md:gap-8 text-sm">
            {/* Left Column */}
            <div className="space-y-2 md:pr-4 md:border-r md:border-gray-600 pl-16">
              <div className="text-center md:text-left">
                <span className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-300'}`}>Pressure: </span>
                <span className={`text-sm ${dark ? 'text-gray-100' : 'text-white'}`}>{weather.pressure}</span>
              </div>
              <div className="text-center md:text-left">
                <span className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-300'}`}>Humidity: </span>
                <span className={`text-sm ${dark ? 'text-gray-100' : 'text-white'}`}>{weather.humidity}</span>
              </div>
              <div className="text-center md:text-left">
                <span className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-300'}`}>Visibility: </span>
                <span className={`text-sm ${dark ? 'text-gray-100' : 'text-white'}`}>{weather.visibility}</span>
              </div>
            </div>

            {/* Center Column - Wind */}
            <div className="flex flex-col items-center justify-center text-center md:px-4 md:border-r md:border-gray-600">
              <img
                src="/assets/Degree.png"
                alt="Wind Direction"
                className="w-6 h-6 md:w-8 md:h-8 mb-2"
              />
              <div className={`text-sm ${dark ? 'text-gray-100' : 'text-white'}`}>{weather.wind}</div>
            </div>

            {/* Right Column */}
            <div className="space-y-2 md:pl-4 pr-16">
              <div className="text-center md:text-right">
                <span className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-300'}`}>Sunrise: </span>
                <span className={`text-sm ${dark ? 'text-gray-100' : 'text-white'}`}>{weather.sunrise}</span>
              </div>
              <div className="text-center md:text-right">
                <span className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-300'}`}>Sunset: </span>
                <span className={`text-sm ${dark ? 'text-gray-100' : 'text-white'}`}>{weather.sunset}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityWeatherDetails;
