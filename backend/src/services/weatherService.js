import axios from "axios";

const API_URL = "http://localhost:5000/api/weather";

export const getWeatherData = async (cityIds) => {
    const response = await axios.get(`${API_URL}?cities=${cityIds}`);
    return response.data;
};
