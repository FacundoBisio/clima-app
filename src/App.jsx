// src/App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
// import ParticleBackground from './components/ParticlesBackground'; // Comentado si no se usa
import ForecastChart from './components/ForecastChart';

function App() {
  const [city, setCity] = useState('');
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Estado para mensajes de error

  const fetchWeather = async () => {
    if (!city) {
      setErrorMessage('Por favor, ingresa una ciudad.');
      return;
    }
    setLoading(true);
    setData(null);
    setForecast(null);
    setErrorMessage(''); // Limpiar errores anteriores
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      setData(res.data);

      const resForecast = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=es&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      setForecast(resForecast.data);
    } catch (err) {
      console.error("Error fetching weather or forecast:", err);
      setErrorMessage('Ciudad no encontrada. Intenta con otro nombre.');
    }
    setLoading(false);
  };

  const getBgColor = (type) => {
    switch (type) {
      case 'Clear': return 'from-yellow-200 to-blue-400';
      case 'Clouds': return 'from-gray-300 to-blue-500';
      case 'Rain': return 'from-blue-800 to-gray-600';
      case 'Snow': return 'from-white to-blue-300';
      default: return 'from-sky-200 to-blue-500';
    }
  };

  const weatherType = data?.weather?.[0]?.main;
  const bgColor = getBgColor(weatherType);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${bgColor} text-white px-4 w-full`}>
      {/* Background de Partículas, si lo tienes implementado y visible */}
      {/* <ParticleBackground /> */}

      <div className="flex items-center justify-center space-x-4 mt-10"> 
        <img src="/Weather.png" alt="Logo" className="w-24 h-24" />
        <h1 className="text-3xl font-bold">Weather App</h1>
      </div>

      {/* Typewriter para ejemplos */}
      <div className="text-center mb-4">
        <span className="text-white text-md">Ejemplo:</span>
        <p className="text-white font-semibold text-xl h-6">
          <Typewriter
            words={['Córdoba', 'Buenos Aires', 'Madrid', 'Tokio']}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </p>
      </div>

      {/* Input y Botón de Búsqueda */}
      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Ingresá una ciudad..."
          className="px-4 py-2 rounded text-black outline-none shadow focus:ring-1 focus:ring-gray-300 transition-all w-full sm:w-[300px]"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button
          onClick={fetchWeather}
          className="bg-gradient-to-b from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Buscar
        </button>
      </div>

      {/* Mensaje de error */}
      {errorMessage && (
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 font-bold mb-4"
        >
          {errorMessage}
        </motion.p>
      )}

      {/* Indicador de carga */}
      {loading && (
        <motion.div
          className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mt-4"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        />
      )}

      {data && <WeatherCard data={data} />}
      
      {forecast && <ForecastList list={forecast.list} />}

      {/* Contenedor del gráfico que ahora tiene ancho y alto explícitos para ResponsiveContainer */}
      {forecast && forecast.list && forecast.list.length > 0 && (
        <div className="w-full max-w-[1000px] h-full">
          <ForecastChart list={forecast.list} />
        </div>
      )}
    </div>
  );
}

export default App;
