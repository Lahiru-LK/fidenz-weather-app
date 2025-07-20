// src/controllers/weatherController.js
import axios from "axios";
import { openWeatherConfig } from "../config/openWeatherConfig.js";
import cache from "../utils/cache.js";

export const getWeather = async (req, res) => {
  const { cities } = req.query;
  if (!cities) return res.status(400).json({ message: "City IDs Required!" });

  const cacheKey = `weather-${cities}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    return res.json({ source: "cache", data: cachedData });
  }

  try {
    // Free plan workaround: fetch each city separately
    const cityIds = cities.split(",");
    const results = [];
    for (const id of cityIds) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${openWeatherConfig.apiKey}`
      );
      results.push(response.data);
    }
    cache.set(cacheKey, results, 300); // 5 minutes cache
    res.json({ source: "api", data: results });
  } catch (err) {
    console.error("Weather API Error:", err.response?.data || err.message);
    res.status(500).json({ message: "Weather API Error!", error: err.message });
  }
};
