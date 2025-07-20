import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import Footer from '../components/Footer';
import Background from '../components/Background';
import Breadcrumb from '../components/Breadcrumb';
import '../styles/morphAnimations.css';
import axios from "axios";

const Dashboard = () => {
  const [searchCity, setSearchCity] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [dark, setDark] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
  });
  const [showAll, setShowAll] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  const [cityIds, setCityIds] = useState("");
  const [lastCityIds, setLastCityIds] = useState(""); // To detect changes

  // Save dark mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(dark));
  }, [dark]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Load city IDs from cities.json (initial + polling)
  useEffect(() => {
    let interval;
    const loadCityIds = async () => {
      const response = await fetch('/cities.json');
      const data = await response.json();
      const ids = data.List.map(city => city.CityCode).join(",");
      setCityIds(ids);
    };
    loadCityIds();
    interval = setInterval(loadCityIds, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Fetch weather data from backend when cityIds changes
  useEffect(() => {
    if (!cityIds || cityIds === lastCityIds) return;
    const fetchWeather = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/weather?cities=${cityIds}`);
        setWeatherData(res.data.data); // data is an array
        setLastCityIds(cityIds);
      } catch (err) {
        console.error("Failed to fetch weather data", err);
      }
    };
    fetchWeather();
  }, [cityIds, lastCityIds]);

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
      <div className={`min-h-screen flex flex-col smooth-morph page-load ${isLoaded ? 'opacity-100' : 'opacity-0'} ${dark ? 'bg-morph-night' : 'bg-morph-day'}`}>
        <Header dark={dark} setDark={setDark} />
        
        <div className="bg-smooth-transition flex-1 flex flex-col">
          <Background dark={dark} isLoaded={isLoaded}>
            <div className="content-smooth">
              <div className="smooth-morph">
                <Breadcrumb dark={dark} />
              </div>

              <div className="smooth-morph px-4">
                <SearchBar
                  searchCity={searchCity}
                  setSearchCity={setSearchCity}
                  onAddCity={handleAddCity}
                  dark={dark}
                />
              </div>

              {/* Weather Cards Grid */}
              <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 content-smooth px-2 sm:px-4">
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
                <div className="text-center mt-6 content-smooth pb-2 px-4">
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

