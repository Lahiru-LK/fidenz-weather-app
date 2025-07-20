// src/controllers/weatherController.js
import axios from "axios";
import { openWeatherConfig } from "../config/openWeatherConfig.js";
import cache from "../utils/cache.js";

export const getWeather = async (req, res) => {
  const { cities } = req.query; // frontend එකෙන් ?cities=123456,123456
  
  if (!cities) return res.status(400).json({ message: "City IDs Required!" });

  const cacheKey = `weather-${cities}`;

  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return res.json({ source: "cache", data: cachedData });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/group?id=${cities}&units=metric&appid=${openWeatherConfig.apiKey}`
    );
    cache.set(cacheKey, response.data, 300); // 5 minutes cache
    res.json({ source: "api", data: response.data });
  } catch (err) {
    res.status(500).json({ message: "Weather API Error!", error: err.message });
  }
};
