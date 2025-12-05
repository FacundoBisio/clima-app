import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import ForecastChart from './components/ForecastChart';
import WeatherStats from './components/WeatherStats';
import WeatherParticles from './components/WeatherParticles';
import ThemeToggle from './components/ThemeToggle';
import ErrorBoundary from './components/ErrorBoundary';
import { useTheme } from './hooks/useTheme';
import { useWeatherContext } from './context/WeatherContext';
import { useWeather } from './hooks/useWeather';
import { WeatherCardSkeleton, ForecastSkeleton } from './components/Skeletons';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const { theme, toggleTheme } = useTheme();
  const { searchParams, searchCity, searchLocation } = useWeatherContext();
  
  const { data: weatherData, isLoading, isError, error } = useWeather(searchParams);

  const handleSearch = () => {
    if (inputValue.trim()) {
      searchCity(inputValue);
      setInputValue('');
    }
  };

  const mainCondition = weatherData?.current?.weather?.[0]?.main;

  // Optimización: useMemo evita recalcular el fondo en cada render si los datos no cambian
  const dynamicBackground = useMemo(() => {
    if (theme === 'dark') return 'bg-gradient-to-br from-gray-900 via-slate-900 to-black';
    
    switch (mainCondition) {
      case 'Clear': return 'bg-gradient-to-br from-blue-400 to-orange-200';
      case 'Clouds': return 'bg-gradient-to-br from-slate-300 to-gray-400';
      case 'Rain': 
      case 'Drizzle': return 'bg-gradient-to-b from-slate-700 to-slate-900';
      case 'Thunderstorm': return 'bg-gradient-to-br from-indigo-900 to-purple-900';
      case 'Snow': return 'bg-gradient-to-br from-blue-50 to-blue-200';
      default: return 'bg-gradient-to-br from-blue-500 to-cyan-400';
    }
  }, [theme, mainCondition]);

  return (
    <ErrorBoundary>
      <div className={`relative min-h-screen flex flex-col items-center py-10 px-4 transition-all duration-700 overflow-hidden ${dynamicBackground} text-gray-800 dark:text-gray-100`}>
        
        {/* Partículas de fondo */}
        <WeatherParticles weatherCondition={mainCondition} />

        {/* Navbar */}
        <nav className="relative z-10 w-full max-w-4xl flex justify-between items-center mb-8 p-4 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
          <div className="flex items-center gap-3">
            <img src="/Weather.png" alt="Logo" className="w-10 h-10 object-contain drop-shadow-md weather-icon-pulse" />
            <h1 className="text-xl font-bold tracking-wide hidden sm:block">Weather App</h1>
          </div>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </nav>

        {/* Sección de Búsqueda */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-lg space-y-4 mb-8"
        >
          {/* Texto Typewriter corregido */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center h-auto min-h-[2rem] text-lg font-medium opacity-90 mb-2 drop-shadow-md">
             <span className="text-gray-800 dark:text-gray-200">Busca el clima en:</span>
             <span className="text-blue-700 dark:text-blue-300 font-bold min-w-[120px] text-left">
               <Typewriter
                  words={['Córdoba', 'Buenos Aires', 'Madrid', 'Tokio', 'New York']}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={2000}
                />
             </span>
          </div>

          {/* Input */}
          <div className="flex gap-2 shadow-2xl rounded-xl p-1.5 bg-white/50 dark:bg-black/50 backdrop-blur-xl border border-white/30 transition-all focus-within:scale-105">
            <input
              type="text"
              placeholder="Escribe una ciudad..."
              className="w-full px-4 py-3 rounded-lg bg-transparent outline-none text-gray-800 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 font-medium"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg font-semibold transition-all hover:shadow-lg active:scale-95"
            >
              Buscar
            </button>
          </div>

          <button
            onClick={searchLocation}
            className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/20 rounded-lg transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Usar mi ubicación
          </button>
        </motion.div>

        {/* Contenido Principal */}
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center min-h-[400px]">
          <AnimatePresence mode='wait'>
            
            {/* Loading Skeleton */}
            {isLoading && (
              <motion.div 
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col items-center gap-8"
              >
                <WeatherCardSkeleton />
                <ForecastSkeleton />
              </motion.div>
            )}

            {/* Error Message */}
            {isError && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-red-500/20 border border-red-500/50 rounded-xl text-red-100 font-medium backdrop-blur-md mt-4 text-center shadow-xl"
              >
                <p className="text-xl mb-2">⚠️ Error</p>
                <p className="text-sm opacity-90">{error?.message || "No pudimos encontrar esa ciudad."}</p>
              </motion.div>
            )}

            {/* Weather Data */}
            {weatherData && !isLoading && (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full flex flex-col gap-8 pb-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                  <div className="flex justify-center">
                    <WeatherCard data={weatherData.current} />
                  </div>
                  <div>
                     <WeatherStats data={weatherData.current} />
                  </div>
                </div>
                
                <div className="w-full bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/10">
                  <h3 className="text-xl font-bold mb-6 pl-2 border-l-4 border-blue-500 text-gray-800 dark:text-white">Pronóstico a 5 días</h3>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
                     <div className="flex flex-col justify-center">
                       <ForecastList list={weatherData.forecast.list} />
                     </div>
                     <div className="h-full min-h-[280px]">
                       <ForecastChart list={weatherData.forecast.list} />
                     </div>
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;