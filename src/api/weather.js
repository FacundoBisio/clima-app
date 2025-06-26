  export const fetchForecast = async (city, units, apiKey) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`
    );
    if (!res.ok) throw new Error("Forecast fetch failed");
    return res.json();
  };

  export const fetchWeatherByCoords = async (lat, lon, units, apiKey) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
    );
    if (!res.ok) throw new Error("Weather by coordinates fetch failed");
    return res.json();
  };

  export const fetchGeoSuggestions = async (query, apiKey) => {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
    );
    if (!res.ok) throw new Error("Geolocation suggestion fetch failed");
    return res.json();
  };