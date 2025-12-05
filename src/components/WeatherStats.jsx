import React from 'react';
import { 
  EyeIcon, 
  CloudIcon, 
  ScaleIcon, 
  SunIcon, 
  ArrowDownIcon, 
  ArrowUpIcon 
} from '@heroicons/react/24/outline';
import moment from 'moment';
import 'moment/locale/es';

const StatItem = ({ icon: Icon, label, value, unit }) => (
  <div className="flex flex-col items-center p-4 bg-white/30 dark:bg-gray-800/30 rounded-xl backdrop-blur-md border border-white/10 shadow-sm">
    <div className="flex items-center gap-2 mb-2 text-gray-700 dark:text-gray-300">
      <Icon className="h-5 w-5" />
      <span className="text-sm font-medium">{label}</span>
    </div>
    <p className="text-lg font-bold text-gray-900 dark:text-white">
      {value} <span className="text-xs font-normal opacity-70">{unit}</span>
    </p>
  </div>
);

const WeatherStats = ({ data }) => {
  if (!data) return null;

  const { main, visibility, wind, sys } = data;
  
  // Formateo de horas
  const sunrise = moment.unix(sys.sunrise).format('HH:mm');
  const sunset = moment.unix(sys.sunset).format('HH:mm');

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      <StatItem icon={CloudIcon} label="Humedad" value={main.humidity} unit="%" />
      <StatItem icon={ScaleIcon} label="Presión" value={main.pressure} unit="hPa" />
      <StatItem icon={EyeIcon} label="Visibilidad" value={(visibility / 1000).toFixed(1)} unit="km" />
      <StatItem icon={SunIcon} label="Amanecer" value={sunrise} unit="hs" />
      <StatItem icon={ArrowDownIcon} label="Atardecer" value={sunset} unit="hs" />
      <StatItem 
        icon={ArrowUpIcon} 
        label="Viento" 
        value={wind.speed} 
        unit="m/s" 
      />
    </div>
  );
};

export default WeatherStats;