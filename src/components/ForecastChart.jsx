// src/components/ForecastChart.jsx
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import moment from 'moment';
import 'moment/locale/es';

// Componente de Tooltip Personalizado
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const formattedDate = moment(label).utcOffset(-180).locale('es').format('ddd D MMM');

    const tempMax = payload.find(p => p.dataKey === 'maxTemp');
    const tempMin = payload.find(p => p.dataKey === 'minTemp');

    return (
      <div className="custom-tooltip bg-white bg-opacity-90 p-3 rounded-md shadow-lg border border-gray-200 dark:bg-gray-800 dark:to-gray-700 dark:text-white">
        <p className="label font-bold text-blue-900 dark:from-gray-800 dark:to-gray-700 dark:text-white">{formattedDate}</p>
        {tempMax && <p className="desc text-red-600 dark:text-red-400">Temperatura Máxima: {tempMax.value}°C</p>}
        {tempMin && <p className="desc text-blue-600 dark:text-blue-400">Temperatura Mínima: {tempMin.value}°C</p>}
      </div>
    );
  }
  return null;
};

const ForecastChart = ({ list }) => {
  const getDailyForecastData = (fullList) => {
    const dailyDataMap = new Map();
    fullList.forEach(item => {
      const dateKey = moment(item.dt_txt).utcOffset(-180).format('YYYY-MM-DD');
      
      if (!dailyDataMap.has(dateKey)) {
        dailyDataMap.set(dateKey, {
          date: moment(item.dt_txt).toDate(),
          minTemp: item.main.temp_min,
          maxTemp: item.main.temp_max,
        });
      } else {
        const existingData = dailyDataMap.get(dateKey);
        existingData.minTemp = Math.min(existingData.minTemp, item.main.temp_min);
        existingData.maxTemp = Math.max(existingData.maxTemp, item.main.temp_max);
      }
    });

    return Array.from(dailyDataMap.values())
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .filter(day => moment(day.date).isSameOrAfter(moment(), 'day'))
      .slice(0, 5)
      .map(day => ({
        ...day,
        formattedDate: moment(day.date).locale('es').format('ddd D MMM'),
      }));
  };

  const dailyForecastData = getDailyForecastData(list);

  if (!dailyForecastData || dailyForecastData.length === 0) {
    return <p className="text-center text-gray-300 mt-8 dark:from-gray-800 dark:to-gray-700 dark:text-white">No hay datos de pronóstico para el gráfico.</p>;
  }

  return (
    // Contenedor principal del gráfico con estilos base.
    // La altura se gestiona desde el componente padre (App.jsx) con h-[300px] md:h-[350px].
    // Este div tiene h-full para ocupar todo el espacio que App.jsx le asigne.
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 bg-opacity-80 p-4 rounded-xl shadow mt-6 w-full h-full mb-5 dark:from-gray-800 dark:to-gray-700 dark:text-white">
      <h3 className="text-blue-900 font-bold text-center mb-2 dark:text-blue-400">Pronóstico Diario</h3>
      
      {/* Contenedor explícito con altura fija para ResponsiveContainer.
          Esto resuelve el error 'style' y permite la adaptabilidad. */}
      <div style={{ width: '100%', height: '250px' }}> {/* <--- Altura fija explícita para ResponsiveContainer */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={dailyForecastData} 
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            // Ya no es necesario width ni height aquí, ResponsiveContainer los manejará
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
            <XAxis 
              dataKey="formattedDate" 
              tickLine={false} 
              axisLine={{ stroke: '#cccccc' }} 
              className="text-sm font-semibold"
            />
            <YAxis 
              unit="°C" 
              tickLine={false} 
              axisLine={false} 
              domain={['dataMin - 5', 'dataMax + 5']}
              className="text-sm"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />

            <Line
              type="monotone"
              dataKey="maxTemp"
              stroke="#e03e3e"
              strokeWidth={3}
              dot={{ r: 4, fill: '#e03e3e' }}
              activeDot={{ r: 6 }}
              name="Máxima"
            />
            <Line
              type="monotone"
              dataKey="minTemp"
              stroke="#3a60a7"
              strokeWidth={3}
              dot={{ r: 4, fill: '#3a60a7' }}
              activeDot={{ r: 6 }}
              name="Mínima"
            />
          </LineChart>
        </ResponsiveContainer>
      </div> {/* Fin del div con altura fija para ResponsiveContainer */}
    </div>
  );
};

export default ForecastChart;
