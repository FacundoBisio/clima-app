import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animatedIcons from "../assets/animatedIcons";

const ForecastCard = ({ date, temp, icon, description, i }) => {
  const animation = animatedIcons[icon] || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.2 }}
      className="bg-gradient-to-b from-gray-100 to-gray-400 bg-opacity-80 text-blue-900 rounded-xl p-4 text-center shadow dark:from-gray-800 dark:to-gray-700 dark:text-white"
    >
      <p className="font-semibold">{date}</p>

      {animation ? (
        <Lottie animationData={animation} className="h-16 w-16 mx-auto" loop autoplay />
      ) : (
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather icon"
          className="mx-auto h-16 w-16"
        />
      )}

      <p className="text-sm capitalize">{description}</p>
      <p className="font-bold">{temp}°C</p>
    </motion.div>
  );
};

export default ForecastCard;
  