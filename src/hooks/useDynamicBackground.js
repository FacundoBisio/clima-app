import { useMemo } from 'react';

export const useDynamicBackground = (theme, weatherData) => {
  return useMemo(() => {
    if (theme === 'dark') return 'bg-gradient-to-br from-gray-900 via-slate-900 to-black';
    
    const main = weatherData?.current?.weather?.[0]?.main;
    
    switch (main) {
      case 'Clear': return 'bg-gradient-to-br from-blue-400 to-orange-200';
      case 'Clouds': return 'bg-gradient-to-br from-slate-300 to-gray-400';
      case 'Rain': 
      case 'Drizzle': return 'bg-gradient-to-b from-slate-700 to-slate-900';
      case 'Thunderstorm': return 'bg-gradient-to-br from-indigo-900 to-purple-900';
      case 'Snow': return 'bg-gradient-to-br from-blue-50 to-blue-200';
      default: return 'bg-gradient-to-br from-blue-500 to-cyan-400';
    }
  }, [theme, weatherData]);
};