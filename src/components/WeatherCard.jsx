import React from 'react';
import { motion } from 'framer-motion';

const WeatherCard = ({ data }) => {
  const { name, main, weather, wind } = data;
  const icon = weather[0].icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-b from-blue-50 to-blue-100 bg-opacity-80 text-blue-900 rounded-xl p-6 shadow-lg w-full max-w-sm text-center"
    >
      <h2 className="text-2xl font-semibold">{name}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather icon"
        className="mx-auto"
      />
      <p className="text-xl font-bold">{main.temp.toFixed(1)}°C</p>
      <p className="text-sm">{main.feels_like.toFixed(1)}°C</p>
      <p className="capitalize">{weather[0].description}</p>
      <div className="flex justify-between mt-4 text-sm">
        <span>Presión: {main.pressure} hPa</span>
        <span>Humedad: {main.humidity}%</span>
        <span>Viento: {wind.speed} m/s</span>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
