import React from 'react';
import { motion } from 'framer-motion';

const ForecastCard = ({ date, temp, icon, description, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.2 }}
    className="bg-gradient-to-b from-blue-50 to-blue-100 bg-opacity-80 text-blue-900 rounded-xl p-4 text-center shadow"
  >
    <p className="font-semibold">{date}</p>
    <img
      src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
      alt="weather icon"
      className="mx-auto"
    />
    <p className="text-sm capitalize">{description}</p>
    <p className="font-bold">{temp}°C</p>
  </motion.div>
);

export default ForecastCard;
