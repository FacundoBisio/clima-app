import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import moment from 'moment';
import 'moment/locale/es';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-3 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
        <p className="font-bold text-gray-800 dark:text-gray-200 mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Temp: <span className="font-bold text-gray-900 dark:text-white">{payload[0].value}°C</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const ForecastChart = ({ list }) => {
  const processData = (fullList) => {
    const dailyData = fullList.reduce((acc, item) => {
      const date = moment(item.dt_txt).format('YYYY-MM-DD');
      if (!acc[date]) {
        acc[date] = { tempSum: 0, count: 0, date: item.dt_txt };
      }
      acc[date].tempSum += item.main.temp;
      acc[date].count += 1;
      return acc;
    }, {});

    return Object.values(dailyData)
      .slice(0, 5)
      .map(day => ({
        date: moment(day.date).locale('es').format('ddd D'),
        temp: Math.round(day.tempSum / day.count),
      }));
  };

  const chartData = processData(list);

  return (
    <div className="w-full h-full min-h-[250px] bg-white/30 dark:bg-gray-800/30 rounded-2xl p-4 backdrop-blur-md border border-white/10 shadow-inner flex flex-col">
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Tendencia de Temperatura</h3>
      </div>
      
      <div className="flex-grow w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              domain={['dataMin - 2', 'dataMax + 2']} 
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area 
              type="monotone" 
              dataKey="temp" 
              stroke="#3b82f6" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTemp)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastChart;