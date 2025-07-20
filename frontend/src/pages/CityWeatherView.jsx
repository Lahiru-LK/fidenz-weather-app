import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Background from '../components/Background';
import Breadcrumb from '../components/Breadcrumb';
import CityWeatherDetails from '../components/CityWeatherDetails';
import '../styles/morphAnimations.css';

const CityWeatherView = () => {
    const { cityId } = useParams();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [dark, setDark] = useState(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        return savedDarkMode ? JSON.parse(savedDarkMode) : false;
    });
    const [weatherData, setWeatherData] = useState(null);

    // Save dark mode to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(dark));
    }, [dark]);

    // Sample weather data based on cityId - in real app, fetch from API
    const getWeatherDataById = (id) => {
        const weatherDatabase = {
            1: {
                id: 1,
                city: 'Colombo, LK',
                date: '5:10am, Feb 8',
                temp: '27°C',
                condition: 'Few Clouds',
                icon: <img src="/assets/Few Clouds.png" alt="Few Clouds" className="w-16 h-16" />,
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
            2: {
                id: 2,
                city: 'Tokyo, JP',
                date: '5:10am, Feb 8',
                temp: '7°C',
                condition: 'Broken Clouds',
                icon: <img src="/assets/BrokenClouds.png" alt="Broken Clouds" className="w-16 h-16" />,
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
            3: {
                id: 3,
                city: 'Liverpool, GB',
                date: '5:10am, Feb 8',
                temp: '-2°C',
                condition: 'Clear Sky',
                icon: <img src="/assets/ClearSky.png" alt="Clear Sky" className="w-16 h-16" />,
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
            4: {
                id: 4,
                city: 'Sydney, AU',
                date: '5:10am, Feb 8',
                temp: '26°C',
                condition: 'Light Rain',
                icon: <img src="/assets/LightRain.png" alt="Light Rain" className="w-16 h-16" />,
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
            5: {
                id: 5,
                city: 'Boston, US',
                date: '5:10am, Feb 8',
                temp: '13°C',
                condition: 'Mist',
                icon: <img src="/assets/Mist.png" alt="Mist" className="w-16 h-16" />,
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
            6: {
                id: 6,
                city: 'New York, US',
                date: '5:10am, Feb 8',
                temp: '5°C',
                condition: 'Snow',
                icon: <img src="/assets/snow.png" alt="Snow" className="w-16 h-16" />,
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
            7: {
                id: 7,
                city: 'Miami, US',
                date: '5:10am, Feb 8',
                temp: '28°C',
                condition: 'Thunderstorm',
                icon: <img src="/assets/Thunderstorm.png" alt="Thunderstorm" className="w-16 h-16" />,
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
        };

        return weatherDatabase[parseInt(id)] || null;
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
            const data = getWeatherDataById(cityId);
            setWeatherData(data);
        }, 100);
        return () => clearTimeout(timer);
    }, [cityId]);

    return (
        <div className={dark ? "dark" : ""}>
            <div className={`min-h-screen flex flex-col smooth-morph page-load ${isLoaded ? 'opacity-100' : 'opacity-0'} ${dark ? 'bg-morph-night' : 'bg-morph-day'}`}>
                <div className="smooth-morph">
                    <Header dark={dark} setDark={setDark} />
                </div>
                <div className="bg-smooth-transition flex-1 flex flex-col">
                    <Background dark={dark} isLoaded={isLoaded}>
                        <main className="px-4 content-smooth">
                            <div className="smooth-morph">
                                <Breadcrumb dark={dark} />
                            </div>
                            <div className="smooth-morph">
                                {weatherData && <CityWeatherDetails weather={weatherData} dark={dark} />}
                            </div>
                        </main>
                    </Background>
                </div>
                <div className="smooth-morph">
                    <Footer dark={dark} />
                </div>
            </div>
        </div>
    );

};

export default CityWeatherView;
