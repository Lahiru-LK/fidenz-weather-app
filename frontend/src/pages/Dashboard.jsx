import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import Footer from '../components/Footer';
import Background from '../components/Background';
import Breadcrumb from '../components/Breadcrumb';

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
      icon: <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM12 8c2.21 0 4 1.79 4 4 0 2.21-1.79 4-4 4s-4-1.79-4-4c0-2.21 1.79-4 4-4z"/></svg>,
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
      icon: <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/></svg>,
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
      icon: <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></svg>,
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
      icon: <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12.73 5.08L11.15 3.5c-.58-.58-1.34-.92-2.15-.92s-1.57.34-2.15.92L2.93 7.42c-1.18 1.18-1.18 3.1 0 4.28l.71.71c.78.78 2.05.78 2.83 0l.71-.71c.39-.39.9-.59 1.41-.59s1.02.2 1.41.59l3.54 3.54c.78.78 2.05.78 2.83 0l.71-.71c1.18-1.18 1.18-3.1 0-4.28l-3.92-3.92z"/></svg>,
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
      icon: <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"/></svg>,
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
      city: 'Boston, US',
      date: '5:10am, Feb 8',
      temp: '13°C',
      condition: 'Mist',
      icon: <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"/></svg>,
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
      id: 7,
      city: 'Boston, US',
      date: '5:10am, Feb 8',
      temp: '13°C',
      condition: 'Mist',
      icon: <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"/></svg>,
      tempMin: '10°C',
      tempMax: '15°C',
      gradient: 'from-red-400 to-red-600',
      pressure: '1018hPa',
      humidity: '78%',
      visibility: '3.0km',
      wind: '4.0m/s 120 Degree',
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
      <Header dark={dark} setDark={setDark} />
      
      <Background dark={dark} isLoaded={isLoaded}>
        <Breadcrumb dark={dark} />

        <SearchBar
          searchCity={searchCity}
          setSearchCity={setSearchCity}
          onAddCity={handleAddCity}
          dark={dark}
        />

        {/* Weather Cards Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedCards.map((weather, index) => (
            <div key={weather.id} style={{ animationDelay: `${index * 100}ms` }}>
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
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-300 ${
                dark
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  : 'bg-indigo-500 hover:bg-indigo-600 text-white'
              }`}
            >
              {showAll ? 'Show Less' : 'See More'}
            </button>
          </div>
        )}
      </Background>
      
      <Footer dark={dark} />
    </div>
  );
};

export default Dashboard;

