    import React from 'react';

export const WeatherCardSkeleton = () => (
  <div className="bg-white/20 dark:bg-gray-800/40 rounded-xl p-6 w-full max-w-sm h-80 animate-pulse mx-auto backdrop-blur-sm">
    <div className="h-6 bg-gray-300/50 dark:bg-gray-600/50 rounded w-3/4 mx-auto mb-4"></div>
    <div className="h-32 w-32 bg-gray-300/50 dark:bg-gray-600/50 rounded-full mx-auto mb-4"></div>
    <div className="h-8 bg-gray-300/50 dark:bg-gray-600/50 rounded w-1/2 mx-auto mb-2"></div>
    <div className="h-4 bg-gray-300/50 dark:bg-gray-600/50 rounded w-1/3 mx-auto"></div>
  </div>
);

export const ForecastSkeleton = () => (
  <div className="w-full max-w-[800px] mt-6 animate-pulse">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-gray-100/50 dark:bg-gray-700/50 rounded-xl h-40 w-full"></div>
      ))}
    </div>
  </div>
);