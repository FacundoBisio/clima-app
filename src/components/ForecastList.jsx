//src/components/ForecastList.jsx
import React from 'react';
import ForecastCard from './ForecastCard';

const getNext4Days = (list) => {
  const days = {};

  list.forEach((item) => {
    const date = new Date(item.dt_txt).toLocaleDateString('es-AR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });

  if (!days[date]) {
    const hour = new Date(item.dt_txt).getHours();
    if (hour === 12) { // Tomamos el ícono del mediodía
      days[date] = {
        tempSum: item.main.temp,
        count: 1,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      };
    } else {
      days[date] = {
        tempSum: item.main.temp,
        count: 1,
        icon: null,
        description: '',
      };
    }
  } else {
    days[date].tempSum += item.main.temp;
    days[date].count += 1;
    const hour = new Date(item.dt_txt).getHours();
    if (hour === 12 && !days[date].icon) {
      days[date].icon = item.weather[0].icon;
      days[date].description = item.weather[0].description;
    }
  }
  });

  return Object.entries(days)
    .slice(1, 5)
    .map(([date, { tempSum, count, icon, description }]) => ({
      date,
      temp: Math.round(tempSum / count),
      icon,
      description,
    }));
};

const ForecastList = ({ list }) => {
  const forecastDays = getNext4Days(list);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 w-full max-w-[800px] dark:from-gray-800 dark:to-gray-700 dark:text-white">
      {forecastDays.map((day, i) => (
        <ForecastCard key={i} {...day} i={i} />
      ))}
    </div>
  );
};

export default ForecastList;
