import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import Footer from '../components/Footer';
import Background from '../components/Background';
import Breadcrumb from '../components/Breadcrumb';
import '../styles/morphAnimations.css';

const Dashboard = () => {
  const [searchCity, setSearchCity] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [dark, setDark] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [weatherData, setWeatherData] = useState([
    {
      id: 1,
      city: 'Colombo, LK',
      date: '5:10am, Feb 8',
      temp: '27°C',
      condition: 'Few Clouds',
      icon: <img src="/src/assets/Few Clouds.png" alt="Few Clouds" className="w-12 h-12" />,
      tempMin: '25°C',
      tempMax: '28°C',
      gradient: 'from-blue-400 to-blue-600',
      pressure: '1018hPa',
      humidity: '78%',
      visibility: '3.0km',
      wind: '4.0m/s 120 Degree',
      sunrise: '6:05am',
      sunset: '6:35am'
    },
    {
      id: 2,
      city: 'Tokyo, JP',
      date: '5:10am, Feb 8',
      temp: '7°C',
      condition: 'Broken Clouds',
      icon: <img src="/src/assets/BrokenClouds.png" alt="Broken Clouds" className="w-12 h-12" />,
      tempMin: '7°C',
      tempMax: '7°C',
      gradient: 'from-purple-400 to-purple-600',
      pressure: '1018hPa',
      humidity: '78%',
      visibility: '3.0km',
      wind: '4.0m/s 120 Degree',
      sunrise: '6:05am',
      sunset: '6:35am'
    },
    {
      id: 3,
      city: 'Liverpool, GB',
      date: '5:10am, Feb 8',
      temp: '-2°C',
      condition: 'Clear Sky',
      icon: <img src="/src/assets/ClearSky.png" alt="Clear Sky" className="w-12 h-12" />,
      tempMin: '2°C',
      tempMax: '5°C',
      gradient: 'from-green-400 to-green-600',
      pressure: '1018hPa',
      humidity: '78%',
      visibility: '3.0km',
      wind: '4.0m/s 120 Degree',
      sunrise: '6:05am',
      sunset: '6:35am'
    },
    {
      id: 4,
      city: 'Sydney, AU',
      date: '5:10am, Feb 8',
      temp: '26°C',
      condition: 'Light Rain',
      icon: <img src="/src/assets/LightRain.png" alt="Light Rain" className="w-12 h-12" />,
      tempMin: '30°C',
      tempMax: '30°C',
      gradient: 'from-orange-400 to-orange-600',
      pressure: '1018hPa',
      humidity: '78%',
      visibility: '3.0km',
      wind: '4.0m/s 120 Degree',
      sunrise: '6:05am',
      sunset: '6:35am'
    },
    {
      id: 5,
      city: 'Boston, US',
      date: '5:10am, Feb 8',
      temp: '13°C',
      condition: 'Mist',
      icon: <img src="/src/assets/Mist.png" alt="Mist" className="w-12 h-12" />,
      tempMin: '10°C',
      tempMax: '15°C',
      gradient: 'from-red-400 to-red-600',
      pressure: '1018hPa',
      humidity: '78%',
      visibility: '3.0km',
      wind: '4.0m/s 120 Degree',
      sunrise: '6:05am',
      sunset: '6:35am'
    },
    {
      id: 6,
      city: 'New York, US',
      date: '5:10am, Feb 8',
      temp: '5°C',
      condition: 'Snow',
      icon: <img src="/src/assets/snow.png" alt="Snow" className="w-12 h-12" />,
      tempMin: '3°C',
      tempMax: '7°C',
      gradient: 'from-gray-400 to-gray-600',
      pressure: '1018hPa',
      humidity: '85%',
      visibility: '2.0km',
      wind: '3.0m/s 90 Degree',
      sunrise: '6:05am',
      sunset: '6:35am'
    },
    {
      id: 7,
      city: 'Miami, US',
      date: '5:10am, Feb 8',
      temp: '28°C',
      condition: 'Thunderstorm',
      icon: <img src="/src/assets/Thunderstorm.png" alt="Thunderstorm" className="w-12 h-12" />,
      tempMin: '26°C',
      tempMax: '30°C',
      gradient: 'from-purple-500 to-purple-700',
      pressure: '1015hPa',
      humidity: '90%',
      visibility: '1.5km',
      wind: '8.0m/s 180 Degree',
      sunrise: '6:05am',
      sunset: '6:35am'
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAddCity = () => {
    if (searchCity.trim()) {
      // Here you would typically call an API to get weather data
      console.log('Adding city:', searchCity);
      setSearchCity('');
    }
  };

  const handleRemoveCity = (cityId) => {
    setWeatherData(weatherData.filter(city => city.id !== cityId));
  };

  const displayedCards = showAll ? weatherData : weatherData.slice(0, 6);
  const hasMoreCards = weatherData.length > 6;

  return (
    <div className={dark ? "dark" : ""}>
      <div className={`smooth-morph page-load ${isLoaded ? 'opacity-100' : 'opacity-0'} ${dark ? 'bg-morph-night' : 'bg-morph-day'}`}>
        <Header dark={dark} setDark={setDark} />
        
        <div className="bg-smooth-transition">
          <Background dark={dark} isLoaded={isLoaded}>
            <div className="content-smooth">
              <div className="smooth-morph">
                <Breadcrumb dark={dark} />
              </div>

              <div className="smooth-morph">
                <SearchBar
                  searchCity={searchCity}
                  setSearchCity={setSearchCity}
                  onAddCity={handleAddCity}
                  dark={dark}
                />
              </div>

              {/* Weather Cards Grid */}
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 content-smooth">
                {displayedCards.map((weather, index) => (
                  <div key={weather.id} style={{ animationDelay: `${index * 100}ms` }} className="smooth-morph">
                    <WeatherCard
                      weather={weather}
                      onRemove={handleRemoveCity}
                      dark={dark}
                    />
                  </div>
                ))}
              </div>

              {/* See More Button */}
              {hasMoreCards && (
                <div className="text-center mt-6 content-smooth">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className={`px-6 py-2 rounded-lg font-medium smooth-morph ${dark
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                      }`}
                  >
                    {showAll ? 'Show Less' : 'See More'}
                  </button>
                </div>
              )}
            </div>
          </Background>
          
        </div>
        
        <div className="smooth-morph">
          <Footer dark={dark} />
        </div>
      </div>
    </div>
  );
};



export default Dashboard;

