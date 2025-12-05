import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import ThemeToggle from './components/ThemeToggle';
import SearchBar from './components/SearchBar';
import WeatherDashboard from './components/WeatherDashboard';
import WeatherParticles from './components/WeatherParticles';
import { WeatherCardSkeleton, ForecastSkeleton } from './components/Skeletons';
import { useTheme } from './hooks/useTheme';
import { useWeatherContext } from './context/WeatherContext';
import { useWeather } from './hooks/useWeather';
import { useDynamicBackground } from './hooks/useDynamicBackground';
import './App.css';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { searchParams } = useWeatherContext();
  
  // React Query maneja el estado de la API
  const { data: weatherData, isLoading, isError, error } = useWeather(searchParams);

  // Hook personalizado para el fondo
  const dynamicBackground = useDynamicBackground(theme, weatherData);
  const mainCondition = weatherData?.current?.weather?.[0]?.main;

  return (
    <ErrorBoundary>
      <div className={`relative min-h-screen flex flex-col items-center py-10 px-4 transition-all duration-700 overflow-hidden ${dynamicBackground} text-gray-800 dark:text-gray-100`}>
        
        <WeatherParticles weatherCondition={mainCondition} />

        <nav className="relative z-10 w-full max-w-4xl flex justify-between items-center mb-8 p-4 bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-2xl shadow-lg border border-white/20" aria-label="Navegación">
          <div className="flex items-center gap-3">
            <img src="/Weather.png" alt="" className="w-10 h-10 object-contain drop-shadow-md weather-icon-pulse" aria-hidden="true" />
            <h1 className="text-xl font-bold tracking-wide hidden sm:block">Weather App</h1>
          </div>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </nav>

        <SearchBar />

        <main className="relative z-10 w-full max-w-4xl flex flex-col items-center min-h-[400px]">
          <AnimatePresence mode='wait'>
            
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

            {isError && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-red-500/20 border border-red-500/50 rounded-xl text-red-100 font-medium backdrop-blur-md mt-4 text-center shadow-xl"
                role="alert"
              >
                <p className="text-xl mb-2">⚠️ Error</p>
                <p className="text-sm opacity-90">{error?.message || "No pudimos encontrar esa ciudad."}</p>
              </motion.div>
            )}

            {weatherData && !isLoading && (
              <WeatherDashboard weatherData={weatherData} />
            )}

          </AnimatePresence>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;