import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Instancia de Axios configurada
const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
    lang: 'es',
  },
});

export const getWeatherByCity = async (city) => {
  const [weather, forecast] = await Promise.all([
    apiClient.get('/weather', { params: { q: city } }),
    apiClient.get('/forecast', { params: { q: city } }),
  ]);
  return { current: weather.data, forecast: forecast.data };
};

export const getWeatherByCoords = async (lat, lon) => {
  const [weather, forecast] = await Promise.all([
    apiClient.get('/weather', { params: { lat, lon } }),
    apiClient.get('/forecast', { params: { lat, lon } }),
  ]);
  return { current: weather.data, forecast: forecast.data };
};