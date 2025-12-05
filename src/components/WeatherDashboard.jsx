import React from 'react';
import { motion } from 'framer-motion';
import WeatherCard from './WeatherCard';
import WeatherStats from './WeatherStats';
import ForecastList from './ForecastList';
import ForecastChart from './ForecastChart';

const WeatherDashboard = ({ weatherData }) => {
  return (
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
      
      <section className="w-full bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/10">
        <h3 className="text-xl font-bold mb-6 pl-2 border-l-4 border-blue-500 text-gray-800 dark:text-white">Pronóstico a 5 días</h3>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch">
           <div className="flex flex-col justify-center">
             <ForecastList list={weatherData.forecast.list} />
           </div>
           <div className="h-full min-h-[280px]">
             <ForecastChart list={weatherData.forecast.list} />
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default WeatherDashboard;