import React from 'react';
import { useNavigate } from 'react-router-dom';
import CardCloud from '../assets/cardcloud.png';
import DegreeIcon from '../assets/Degree.png';

// Import weather icons
import BrokenClouds from '../assets/weathericon/BrokenClouds.png';
import ClearSky from '../assets/weathericon/ClearSky.png';
import FewClouds from '../assets/weathericon/Few Clouds.png';
import LightRain from '../assets/weathericon/LightRain.png';
import Mist from '../assets/weathericon/Mist.png';
import Snow from '../assets/weathericon/snow.png';
import Thunderstorm from '../assets/weathericon/Thunderstorm.png';

// Gradient array (same as WeatherCard)
const gradients = [
  "from-blue-400 to-blue-600",
  "from-purple-400 to-purple-600",
  "from-green-400 to-green-600",
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

// Icon mapping function (same as WeatherCard)
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

// Gradient function (same as WeatherCard)
const getRandomGradient = (seed) => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const idx = Math.abs(hash) % gradients.length;
  return gradients[idx];
};

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

  // Extract API fields
  const cityName = weather?.name || "--";
  const condition = weather?.weather?.[0]?.description || "--";
  const main = weather?.weather?.[0]?.main || "--";
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
  const windStr = weather?.wind
    ? `${weather.wind.speed ?? "--"}m/s${weather.wind.deg !== undefined ? ` ${weather.wind.deg} Degree` : ""}`
    : "--";

  // Get icon and gradient
  const weatherIcon = getWeatherIcon(main, condition);
  const gradient = getRandomGradient(cityName);

  return (
    <div className="max-w-6xl mx-auto space-y-6 px-2 sm:px-4 py-2 mt-4">
      <div className={`relative w-full mx-auto rounded-2xl overflow-hidden shadow-xl bg-gradient-to-b ${gradient} text-white font-sans transition-all duration-300 ${dark ? 'shadow-gray-800/50' : 'shadow-lg'}`}>
        {/* Back Arrow Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="absolute top-2 left-2 sm:top-4 sm:left-4 w-8 h-8 sm:w-10 sm:h-10 bg-gray-50/10 hover:bg-gray-100/30 rounded-full flex items-center justify-center text-white transition-all duration-200 z-20"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>

        {/* Main Weather Section */}
        <div
          className="px-3 py-6 sm:px-16 sm:py-10 relative"
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
            <h2 className="text-2xl font-bold mb-2">{cityName}</h2>
            <div className="flex flex-col items-center justify-center mb-2">
              <img src={weatherIcon} alt={main} className="w-14 h-14 mb-1" />
              <span className="text-base capitalize">{condition}</span>
            </div>
            <h1 className="text-4xl font-bold leading-none mb-1">{temp}</h1>
            <div className="text-xs opacity-80 mb-2">
              <span>Min: {tempMin}</span>
              <span className="mx-1">|</span>
              <span>Max: {tempMax}</span>
            </div>
            {/* Details stacked for mobile */}
            <div className="flex flex-col gap-2 mt-4">
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
          <div className="hidden md:block relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold">
                {cityName}
              </h2>
              <p className="text-sm md:text-lg opacity-80 mt-3">
                {main}
              </p>
            </div>
            <div className="flex justify-between items-start">
              {/* Center - Icon and Condition */}
              <div className="flex flex-col items-center mx-auto">
                <img src={weatherIcon} alt={main} className="w-24 h-24 " />
                <span className="text-2xl md:text-3xl text-center">
                  {condition}
                </span>
              </div>
              <div className="w-0.5 h-32 bg-white opacity-30 "></div>
              {/* Center side - Temperature */}
              <div className="flex flex-col items-center mx-auto">
                <h1 className="text-8xl md:text-7xl font-bold leading-none">
                  {temp}
                </h1>
                <div className="text-sm md:text-lg opacity-80 mt-2">
                  <div>Temp Min: {tempMin}</div>
                  <div>Temp Max: {tempMax}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section (desktop only) */}
        <div className="hidden md:block">
          <div className={`px-3 py-4 sm:px-16 sm:py-10 ${dark
              ? 'bg-gray-900/90 border-t border-gray-700'
              : 'bg-gray-800/80'
            }`}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 text-xs sm:text-sm">
              {/* Left Column */}
              <div className="space-y-2 md:pr-4 md:border-r md:border-gray-600 pl-16">
                <div className="text-center md:text-left">
                  <span className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-300'}`}>Pressure: </span>
                  <span className={`text-sm ${dark ? 'text-gray-100' : 'text-white'}`}>{pressure}</span>
                </div>
                <div className="text-center md:text-left">
                  <span className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-300'}`}>Humidity: </span>
                  <span className={`text-sm ${dark ? 'text-gray-100' : 'text-white'}`}>{humidity}</span>
                </div>
                <div className="text-center md:text-left">
                  <span className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-300'}`}>Visibility: </span>
                  <span className={`text-sm ${dark ? 'text-gray-100' : 'text-white'}`}>{visibility}</span>
                </div>
              </div>

              {/* Center Column - Wind */}
              <div className="flex flex-col items-center justify-center text-center md:px-4 md:border-r md:border-gray-600">
                <img
                  src={DegreeIcon}
                  alt="Wind Direction"
                  className="w-6 h-6 md:w-8 md:h-8 mb-2"
                />
                <div className={`text-sm ${dark ? 'text-gray-100' : 'text-white'}`}>{windStr}</div>
              </div>

              {/* Right Column */}
              <div className="space-y-2 md:pl-4 pr-16">
                <div className="text-center md:text-right">
                  <span className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-300'}`}>Sunrise: </span>
                  <span className={`text-sm ${dark ? 'text-gray-100' : 'text-white'}`}>{sunrise}</span>
                </div>
                <div className="text-center md:text-right">
                  <span className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-300'}`}>Sunset: </span>
                  <span className={`text-sm ${dark ? 'text-gray-100' : 'text-white'}`}>{sunset}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CityWeatherDetails;
