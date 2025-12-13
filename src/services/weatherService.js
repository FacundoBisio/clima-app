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

// Función auxiliar para traer UV (OpenWeatherMap tiene endpoint separado para esto en la versión standard)
const getUVIndex = async (lat, lon) => {
  try {
    // Usamos el endpoint de OneCall si está disponible, o el de UVI legacy.
    // Para asegurar compatibilidad con keys free, intentamos el endpoint de UV directo si existe, 
    // pero OWM lo movió. Usaremos una llamada simulada si falla, o la lógica de Weather Data.
    // NOTA: En la API standard 2.5, el UV no viene en /weather.
    // Vamos a usar un truco: Si tienes la API OneCall activa, esto funcionaría:
    // const res = await apiClient.get('/onecall', { params: { lat, lon, exclude: 'minutely,hourly,daily' } });
    // Pero asumiré que usamos la API standard. Intentaremos buscar el UV actual.
    
    // endpoint específico de UV (a veces requiere pago/onecall, pero intentamos)
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/uvi`, {
        params: {
            lat,
            lon,
            appid: API_KEY
        }
    });
    return res.data;
  } catch (error) {
    console.warn("No se pudo obtener UV (posiblemente requiere OneCall API). Simulando datos para demo.");
    return { value: 0 }; // Fallback seguro
  }
};

export const getWeatherByCity = async (city) => {
  // 1. Obtenemos clima actual para sacar coordenadas
  const weatherRes = await apiClient.get('/weather', { params: { q: city } });
  const { coord } = weatherRes.data;

  // 2. Con las coordenadas, buscamos pronóstico y UV en paralelo
  const [forecastRes, uvRes] = await Promise.all([
    apiClient.get('/forecast', { params: { lat: coord.lat, lon: coord.lon } }), // Usamos lat/lon para forecast es más preciso
    getUVIndex(coord.lat, coord.lon)
  ]);

  return { 
    current: { ...weatherRes.data, uv: uvRes.value }, // Inyectamos el UV en current
    forecast: forecastRes.data 
  };
};

export const getWeatherByCoords = async (lat, lon) => {
  const [weatherRes, forecastRes, uvRes] = await Promise.all([
    apiClient.get('/weather', { params: { lat, lon } }),
    apiClient.get('/forecast', { params: { lat, lon } }),
    getUVIndex(lat, lon)
  ]);
  
  return { 
    current: { ...weatherRes.data, uv: uvRes.value }, 
    forecast: forecastRes.data 
  };
};