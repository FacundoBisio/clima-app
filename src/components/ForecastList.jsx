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
      days[date] = {
        tempSum: item.main.temp,
        count: 1,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      };
    } else {
      days[date].tempSum += item.main.temp;
      days[date].count += 1;
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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 w-full max-w-[800px]">
      {forecastDays.map((day, i) => (
        <ForecastCard key={i} {...day} i={i} />
      ))}
    </div>
  );
};

export default ForecastList;
