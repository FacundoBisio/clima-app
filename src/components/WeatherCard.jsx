import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animatedIcons from '../assets/animatedIcons';

const WeatherCard = ({ data }) => {
  const { name, main, weather, wind } = data;
  const icon = weather[0].icon;
  const animation = animatedIcons[icon];

  const fallback = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-white/70 dark:bg-gray-800/60 text-gray-800 dark:text-white rounded-3xl p-6 md:p-8 shadow-2xl w-full max-w-sm text-center backdrop-blur-xl border border-white/40 dark:border-white/10"
    >
      {/* Efecto de resplandor de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-400/30 dark:bg-blue-500/20 rounded-full blur-3xl -z-10"></div>

      {/* CAMBIO AQUI: Texto responsive (chico en mobile, grande en desktop) */}
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-2 truncate">
        {name}
      </h2>
      
      <div className="my-6 drop-shadow-lg">
        {animation ? (
          <Lottie animationData={animation} loop className="mx-auto h-32 w-32 md:h-40 md:w-40" />
        ) : (
          <img src={fallback} alt="weather" className="mx-auto h-28 w-28 md:h-32 md:w-32" />
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-5xl font-black tracking-tighter">{Math.round(main.temp)}°C</p>
        <p className="text-sm font-medium opacity-80">Sensación: {Math.round(main.feels_like)}°C</p>
      </div>
      
      <p className="mt-4 text-lg font-medium capitalize px-4 py-1 rounded-full bg-white/30 dark:bg-white/10 inline-block shadow-sm border border-white/20">
        {weather[0].description}
      </p>
      
      <div className="flex justify-between mt-8 pt-6 border-t border-gray-200/50 dark:border-white/10 text-sm font-semibold opacity-90">
        <div className="flex flex-col">
          <span className="text-xs font-normal opacity-70">Presión</span>
          <span>{main.pressure} hPa</span>
        </div>
        <div className="flex flex-col">
           <span className="text-xs font-normal opacity-70">Humedad</span>
           <span>{main.humidity}%</span>
        </div>
        <div className="flex flex-col">
           <span className="text-xs font-normal opacity-70">Viento</span>
           <span>{wind.speed} m/s</span>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;