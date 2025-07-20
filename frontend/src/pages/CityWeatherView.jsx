import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Background from '../components/Background';
import Breadcrumb from '../components/Breadcrumb';
import CityWeatherDetails from '../components/CityWeatherDetails';
import '../styles/morphAnimations.css';
import axios from "axios";

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

    useEffect(() => {
        setIsLoaded(false);
        const fetchCityWeather = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/weather?cities=${cityId}`);
                setWeatherData(res.data.data && res.data.data[0]);
            } catch (err) {
                setWeatherData(null);
            } finally {
                setTimeout(() => setIsLoaded(true), 100);
            }
        };
        fetchCityWeather();
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
