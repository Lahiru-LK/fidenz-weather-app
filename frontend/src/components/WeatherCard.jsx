import React from "react";
import { useNavigate } from "react-router-dom";

const WeatherCard = ({ weather, onRemove, dark }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log('Card clicked:', weather?.city);
    navigate(`/city/${weather?.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`relative w-full max-w-sm md:max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg bg-gradient-to-b ${weather?.gradient || 'from-blue-400 to-blue-600'} text-white font-sans transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl ${dark ? 'shadow-gray-800/50' : 'shadow-lg'}`}
    >
      {/* Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove && onRemove(weather?.id);
        }}
        className="absolute top-2 right-2 md:top-3 md:right-3 w-6 h-6 md:w-8 md:h-8 hover:bg-white/20 bg-white/10 text-white rounded-full flex items-center justify-center text-sm md:text-xl transition-all duration-200 z-20"
      >
        ×
      </button>

      {/* Main Weather Section */}
      <div 
        className="px-3 py-3 md:px-16 md:py-5 relative"
        style={{
          backgroundImage: 'url(/src/assets/cardcloud.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'overlay'
        }}
      >
        {/* Mobile Layout - Centered */}
        <div className="block md:hidden text-center relative z-10">
          <h2 className="text-lg font-bold mb-1 text-center">
            {weather?.city}
          </h2>
          <p className="text-xs opacity-80 mb-2">
            {weather?.date}
          </p>
          
          {/* Weather Icon and Condition - Mobile */}
          <div className="flex flex-col items-center mb-2">
            <span className="text-2xl mb-1">
              {weather?.icon}
            </span>
            <span className="text-sm">
              {weather?.condition}
            </span>
          </div>
          
          {/* Temperature - Mobile */}
          <h1 className="text-3xl font-bold leading-none mb-1">
            {weather?.temp}
          </h1>
          <div className="text-xs opacity-80">
            <span>Min: {weather?.tempMin}</span>
            <span className="mx-1">|</span>
            <span>Max: {weather?.tempMax}</span>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex md:justify-between md:items-start mb-6 relative z-10">
          {/* Left side - City Name, Date, Icon and Condition */}
          <div className="text-left mb-4 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold">
              {weather?.city}
            </h2>
            <p className="text-xs md:text-sm opacity-80 mt-1 mb-3 md:mb-4">
              {weather?.date}
            </p>
            {/* Weather Icon and Condition */}
            <div className="flex items-center pt-4">
              <span className="text-3xl md:text-5xl mr-3 md:mr-4">
                {weather?.icon}
              </span>
              <span className="text-lg md:text-xl">
                {weather?.condition}
              </span>
            </div>
          </div>
          
          {/* Right side - Temperature */}
          <div className="text-center md:text-right">
            <h1 className="text-6xl md:text-8xl font-bold leading-none">
              {weather?.temp}
            </h1>
            <div className="text-xs md:text-sm opacity-80 mt-1">
              <div>Temp Min: {weather?.tempMin}</div>
              <div>Temp Max: {weather?.tempMax}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className={`px-2 py-2 md:px-16 md:py-8 ${
        dark 
          ? 'bg-gray-900/90 border-t border-gray-700' 
          : 'bg-gray-800/80'
      }`}>
        <div className="grid grid-cols-3 gap-1 md:gap-4 text-xs">
          {/* Left Column */}
          <div className="space-y-1 md:pr-4 md:border-r md:border-gray-600">
            <div className="text-center md:text-left">
              <div className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-300'}`}>Pressure</div>
              <div className={`text-xs font-medium ${dark ? 'text-gray-100' : 'text-white'}`}>{weather?.pressure}</div>
            </div>
            <div className="text-center md:text-left">
              <div className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-300'}`}>Humidity</div>
              <div className={`text-xs font-medium ${dark ? 'text-gray-100' : 'text-white'}`}>{weather?.humidity}</div>
            </div>
            <div className="text-center md:text-left">
              <div className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-300'}`}>Visibility</div>
              <div className={`text-xs font-medium ${dark ? 'text-gray-100' : 'text-white'}`}>{weather?.visibility}</div>
            </div>
          </div>

          {/* Center Column - Wind */}
          <div className="flex flex-col items-center justify-center text-center md:px-4 md:border-r md:border-gray-600">
            <img 
              src="/src/assets/Degree.png" 
              alt="Wind Direction" 
              className="w-4 h-4 md:w-6 md:h-6 mb-1"
            />
            <div className={`text-xs text-center ${dark ? 'text-gray-100' : 'text-white'}`}>{weather?.wind}</div>
          </div>

          {/* Right Column */}
          <div className="space-y-1 md:pl-4">
            <div className="text-center md:text-left">
              <div className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-300'}`}>Sunrise</div>
              <div className={`text-xs font-medium ${dark ? 'text-gray-100' : 'text-white'}`}>{weather?.sunrise}</div>
            </div>
            <div className="text-center md:text-left">
              <div className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-300'}`}>Sunset</div>
              <div className={`text-xs font-medium ${dark ? 'text-gray-100' : 'text-white'}`}>{weather?.sunset}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
