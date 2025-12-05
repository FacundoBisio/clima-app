import { useQuery } from '@tanstack/react-query';
import { getWeatherByCity, getWeatherByCoords } from '../services/weatherService';

export const useWeather = (searchParams) => {
  return useQuery({
    queryKey: ['weather', searchParams],
    queryFn: () => {
      if (searchParams.type === 'coords') {
        return getWeatherByCoords(searchParams.lat, searchParams.lon);
      }
      if (searchParams.type === 'city' && searchParams.city) {
        return getWeatherByCity(searchParams.city);
      }
      return null;
    },
    enabled: !!searchParams, // Solo se ejecuta si hay parámetros
    staleTime: 1000 * 60 * 10, // Los datos se consideran frescos por 10 minutos
    retry: 1,
  });
};