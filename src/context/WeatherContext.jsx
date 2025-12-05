import React, { createContext, useContext, useState } from 'react';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState(null);

  const searchCity = (city) => {
    setSearchParams({ type: 'city', city });
  };

  const searchLocation = () => {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización.");
      return;
    }

    // OPCIONES AJUSTADAS PARA MÓVIL
    const options = {
      enableHighAccuracy: false, // Falso para usar red/wifi (más rápido y compatible)
      timeout: 10000,            // Damos 10 segundos de tiempo (antes 5)
      maximumAge: 30000          // Aceptamos una caché de hasta 30 seg
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSearchParams({
          type: 'coords',
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        // Mostramos el error real para que puedas depurar en el celu
        console.error("Geo Error:", error);
        let msg = `Error (${error.code}): ${error.message}`;
        
        if (error.code === 1) msg = "Permiso denegado. Revisa la configuración del sitio en Chrome (candadito).";
        else if (error.code === 2) msg = "Ubicación no disponible (¿GPS apagado?).";
        else if (error.code === 3) msg = "Se agotó el tiempo esperando al GPS.";

        alert(msg);
      },
      options
    );
  };

  return (
    <WeatherContext.Provider value={{ searchParams, searchCity, searchLocation }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => useContext(WeatherContext);