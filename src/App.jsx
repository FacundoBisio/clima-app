import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import ForecastChart from './components/ForecastChart';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  const [city, setCity] = useState('');
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isDark, setIsDark] = useState(false);

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const fetchWeather = async () => {
    if (!city) {
      setErrorMessage('Por favor, ingresa una ciudad.');
      return;
    }
    setLoading(true);
    setData(null);
    setForecast(null);
    setErrorMessage('');
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
    if (isDark) return 'from-gray-900 to-gray-800';
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
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${bgColor} text-white dark:text-white px-4 w-full`}>


      {/* Toggle modo oscuro como switch */}
      <div className="absolute top-4 right-4">
        <DarkModeToggle isDark={isDark} toggleDark={toggleDark} />
      </div>

      <div className="flex items-center justify-center space-x-4 mt-10">
        <img src="/Weather.png" alt="Logo" className="w-24 h-24 weather-icon-pulse" />
        <h1 className="text-3xl font-bold dark:text-white">Weather App</h1>
      </div>

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

      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <input
          type="text"
          placeholder="Ingresá una ciudad..."
          className="px-4 py-2 rounded dark:bg-gray-700 dark:text-white text-black outline-none shadow focus:ring-1 focus:ring-gray-300 transition-all w-full sm:w-[300px]"
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

      <div className="mb-6">
        <button
        onClick={async () => {
          setErrorMessage('');
          setLoading(true);
          try {
            navigator.geolocation.getCurrentPosition(async (position) => {
              const { latitude, longitude } = position.coords;
              const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
              );
              setData(res.data);

              const resForecast = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
              );
              setForecast(resForecast.data);
            }, () => {
              setErrorMessage("No se pudo acceder a la ubicación.");
              setLoading(false);
            });
          } catch (err) {
            setErrorMessage("Error obteniendo clima por ubicación.");
          } finally {
            setLoading(false);
          }
        }}
        className="bg-gradient-to-b from-green-600 to-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 hover:shadow-lg active:bg-green-800 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Clima Actual
      </button>
      </div>


      {errorMessage && (
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 font-bold mb-4"
        >
          {errorMessage}
        </motion.p>
      )}

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

      {forecast && forecast.list && forecast.list.length > 0 && (
        <div className="w-full max-w-[1000px] h-full">
          <ForecastChart list={forecast.list} />
        </div>
      )}
    </div>
  );
}

export default App; 