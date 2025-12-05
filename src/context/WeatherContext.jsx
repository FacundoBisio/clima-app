import React, { createContext, useContext, useState } from 'react';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  // Estado inicial vacío
  const [searchParams, setSearchParams] = useState(null);

  const searchCity = (city) => {
    setSearchParams({ type: 'city', city });
  };

  const searchLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalización no soportada");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSearchParams({
          type: 'coords',
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
        alert("No se pudo obtener la ubicación");
      }
    );
  };

  return (
    <WeatherContext.Provider value={{ searchParams, searchCity, searchLocation }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => useContext(WeatherContext);