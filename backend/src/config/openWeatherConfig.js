import dotenv from "dotenv";
dotenv.config();

console.log("openWeatherConfig.js: process.env.OPENWEATHER_API_KEY =", process.env.OPENWEATHER_API_KEY);
export const openWeatherConfig = {
  apiKey: process.env.OPENWEATHER_API_KEY || "",
};
