// src/utils/getWeatherIcon.js
import forecastIcons from './forecast-icons';

export function getWeatherIcon(code, isDay = true) {
  const key = code === "800" ? `800${isDay ? "d" : "n"}` : code;
  return forecastIcons[key] || "/icons/default.svg";
}