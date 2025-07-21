import dotenv from "dotenv";
dotenv.config();

export const openWeatherConfig = {
  apiKey: process.env.OPENWEATHER_API_KEY || "",
};
