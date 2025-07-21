import React from "react";
import { useNavigate } from "react-router-dom";
import CardCloud from '../assets/cardcloud.png';
import DegreeIcon from '../assets/Degree.png';

// Import your weather icons
import BrokenClouds from '../assets/weathericon/BrokenClouds.png';
import ClearSky from '../assets/weathericon/ClearSky.png';
import FewClouds from '../assets/weathericon/Few Clouds.png';
import LightRain from '../assets/weathericon/LightRain.png';
import Mist from '../assets/weathericon/Mist.png';
import Snow from '../assets/weathericon/snow.png';
import Thunderstorm from '../assets/weathericon/Thunderstorm.png';

// Map OpenWeatherMap main/description to icon
const getWeatherIcon = (main, description) => {
  if (!main) return FewClouds;
  const desc = description?.toLowerCase() || "";
  switch (main) {
    case "Clouds":
      if (desc.includes("broken")) return BrokenClouds;
      if (desc.includes("few")) return FewClouds;
      if (desc.includes("overcast")) return BrokenClouds;
      return FewClouds;
    case "Clear":
      return ClearSky;
    case "Rain":
      if (desc.includes("light")) return LightRain;
      if (desc.includes("heavy")) return Thunderstorm;
      return LightRain;
    case "Drizzle":
      return LightRain;
    case "Thunderstorm":
      return Thunderstorm;
    case "Mist":
    case "Fog":
    case "Haze":
      return Mist;
    case "Snow":
      return Snow;
    default:
      return FewClouds;
  }
};

// List of 20 gradient classes
const gradients = [
  "from-blue-400 to-blue-600",
  "from-purple-400 to-purple-600",
  "from-pink-600 to-pink-900",
  "from-orange-400 to-orange-600",
  "from-red-400 to-red-600",
  "from-gray-400 to-gray-600",
  "from-yellow-300 to-yellow-500",
  "from-pink-400 to-pink-600",
  "from-indigo-500 to-indigo-700",
  "from-teal-400 to-teal-600",
  "from-cyan-400 to-cyan-600",
  "from-emerald-400 to-emerald-600",
  "from-lime-400 to-lime-600",
  "from-fuchsia-400 to-fuchsia-600",
  "from-rose-400 to-rose-600",
  "from-violet-400 to-violet-600",
  "from-sky-400 to-sky-600",
  "from-amber-400 to-amber-600",
  "from-stone-400 to-stone-600",
  "from-zinc-400 to-zinc-600",
];

// Pick a random gradient based on city name (so it's stable per city)
const getRandomGradient = (seed) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const idx = Math.abs(hash) % gradients.length;
  return gradients[idx];
};

const WeatherCard = ({ weather, onRemove, dark }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/city/${weather?.id}`);
  };

  // Extract API fields
  const cityName = weather?.name || "";
  const condition = weather?.weather?.[0]?.description;
  const main = weather?.weather?.[0]?.main;
  const temp = weather?.main?.temp !== undefined ? `${Math.round(weather.main.temp)}°C` : "--";
  const tempMin = weather?.main?.temp_min !== undefined ? `${Math.round(weather.main.temp_min)}°C` : "--";
  const tempMax = weather?.main?.temp_max !== undefined ? `${Math.round(weather.main.temp_max)}°C` : "--";
  const pressure = weather?.main?.pressure !== undefined ? `${weather.main.pressure} hPa` : "--";
  const humidity = weather?.main?.humidity !== undefined ? `${weather.main.humidity}%` : "--";
  const visibility = weather?.visibility !== undefined ? `${weather.visibility}` : "--";
  const sunrise = weather?.sys?.sunrise
    ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : "--";
  const sunset = weather?.sys?.sunset
    ? new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : "--";

  // Extract wind info as a string (e.g., "4.0m/s 120 Degree")
  const windStr = weather?.wind
    ? `${weather.wind.speed ?? "--"}m/s${weather.wind.deg !== undefined ? ` ${weather.wind.deg} Degree` : ""}`
    : "--";

  // Get icon
  const weatherIcon = getWeatherIcon(main, condition);

  // Get random gradient for the city
  const gradient = getRandomGradient(cityName);

  return (
    <div 
      onClick={handleCardClick}
      className={`relative w-full max-w-xs sm:max-w-sm md:max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg bg-gradient-to-b ${gradient} text-white font-sans transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl ${dark ? 'shadow-gray-800/50' : 'shadow-lg'} mb-4`}
    >
      {/* Close Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove && onRemove(weather?.id);
        }}
        className="absolute top-2 right-2 md:top-3 md:right-3  pb-1  w-6 h-6 md:w-8 md:h-8 hover:bg-white/20 bg-white/10 text-white rounded-full flex items-center justify-center text-sm md:text-xl transition-all duration-200 z-20"
      >
        ×
      </button>

      {/* Main Weather Section */}
      <div 
        className="px-4 py-4 sm:px-8 sm:py-6 md:px-16 md:py-5 relative"
        style={{
          backgroundImage: `url(${CardCloud})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'overlay'
        }}
      >
        {/* Mobile Layout - Centered */}
        <div className="block md:hidden text-center relative z-10">
          <h2 className="text-xl font-bold mb-1">{cityName}</h2>
          <div className="flex flex-col items-center mb-2">
            <img src={weatherIcon} alt={main} className="w-10 h-10 mb-1" />
            <span className="text-base capitalize">{condition}</span>
          </div>
          <h1 className="text-3xl font-bold leading-none mb-1">{temp}</h1>
          <div className="text-xs opacity-80 mb-2">
            <span>Min: {tempMin}</span>
            <span className="mx-1">|</span>
            <span>Max: {tempMax}</span>
          </div>
          {/* Details stacked for mobile */}
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex justify-between px-2">
              <span className="font-semibold">Pressure:</span>
              <span className="font-bold">{pressure}</span>
            </div>
            <div className="flex justify-between px-2">
              <span className="font-semibold">Humidity:</span>
              <span className="font-bold">{humidity}</span>
            </div>
            <div className="flex justify-between px-2">
              <span className="font-semibold">Visibility:</span>
              <span className="font-bold">{visibility}</span>
            </div>
            <div className="flex justify-between px-2 items-center">
              <span className="font-semibold flex items-center">
                <img src={DegreeIcon} alt="Wind" className="w-5 h-5 mr-1" />
                Wind:
              </span>
              <span className="font-bold">{windStr}</span>
            </div>
            <div className="flex justify-between px-2">
              <span className="font-semibold">Sunrise:</span>
              <span className="font-bold">{sunrise}</span>
            </div>
            <div className="flex justify-between px-2">
              <span className="font-semibold">Sunset:</span>
              <span className="font-bold">{sunset}</span>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex md:justify-between md:items-start mb-6 relative z-10">
          {/* Left side - City Name, Date, Icon and Condition */}
          <div className="text-left mb-4 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold">
              {cityName}
            </h2>
            <p className="text-xs md:text-sm opacity-80 mt-1 mb-3 md:mb-4">
              {weather?.date}
            </p>
            {/* Weather Icon and Condition */}
            <div className="flex items-center pt-4">
              <img src={weatherIcon} alt={main} className="w-16 h-16 mr-3 md:mr-4" />
              <span className="text-lg md:text-xl">
                {condition}
              </span>
            </div>
          </div>
          
          {/* Right side - Temperature */}
          <div className="text-center md:text-right">
            <h1 className="text-6xl md:text-8xl font-bold leading-none">
              {temp}
            </h1>
            <div className="text-xs md:text-sm opacity-80 mt-1">
              <div>Temp Min: {tempMin}</div>
              <div>Temp Max: {tempMax}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section (desktop only) */}
      <div className="hidden md:block">
        <div className={`px-2 py-2 md:px-16 md:py-8 ${
          dark 
            ? 'bg-gray-900/90 border-t border-gray-700' 
            : 'bg-gray-800/80'
        }`}>
          <div className="grid grid-cols-3 gap-1 md:gap-4 text-xs">
            {/* Left Column */}
            <div className="space-y-1 md:pr-4 md:border-r md:border-gray-600">
              <div className="text-center md:text-left">
                <span className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-300'}`}>Pressure: </span>
                <span className={`text-xs font-medium ${dark ? 'text-gray-100' : 'text-white'}`}>{pressure}</span>
              </div>
              <div className="text-center md:text-left">
                <span className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-300'}`}>Humidity: </span>
                <span className={`text-xs font-medium ${dark ? 'text-gray-100' : 'text-white'}`}>{humidity}</span>
              </div>
              <div className="text-center md:text-left">
                <span className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-300'}`}>Visibility: </span>
                <span className={`text-xs font-medium ${dark ? 'text-gray-100' : 'text-white'}`}>{visibility}</span>
              </div>
            </div>

            {/* Center Column - Wind */}
            <div className="flex flex-col items-center justify-center text-center md:px-4 md:border-r md:border-gray-600">
              <img 
                src={DegreeIcon}
                alt="Wind Direction" 
                className="w-4 h-4 md:w-6 md:h-6 mb-1"
              />
              <div className={`text-xs text-center ${dark ? 'text-gray-100' : 'text-white'}`}>
                {windStr}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-1 md:pl-4">
              <div className="text-center md:text-left">
                <span className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-300'}`}>Sunrise: </span>
                <span className={`text-xs font-medium ${dark ? 'text-gray-100' : 'text-white'}`}>{sunrise}</span>
              </div>
              <div className="text-center md:text-left">
                <span className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-300'}`}>Sunset: </span>
                <span className={`text-xs font-medium ${dark ? 'text-gray-100' : 'text-white'}`}>{sunset}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
