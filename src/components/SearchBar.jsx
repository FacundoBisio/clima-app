import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { useWeatherContext } from '../context/WeatherContext';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const { searchCity, searchLocation } = useWeatherContext();

  const handleSearch = () => {
    if (inputValue.trim()) {
      searchCity(inputValue);
      setInputValue('');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 w-full max-w-lg space-y-4 mb-8"
      role="search"
    >
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
        Usar mi ubicación actual
      </button>
    </motion.div>
  );
};

export default SearchBar;