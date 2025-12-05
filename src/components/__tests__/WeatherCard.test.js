import { render, screen } from '@testing-library/react';
import WeatherCard from '../WeatherCard';
import '@testing-library/jest-dom';

// Mock de Lottie para evitar errores de canvas en tests
jest.mock('lottie-react', () => () => <div data-testid="lottie-animation">Animation</div>);

const mockData = {
  name: 'Buenos Aires',
  main: {
    temp: 25,
    feels_like: 27,
    pressure: 1013,
    humidity: 60,
  },
  weather: [{ icon: '01d', description: 'cielo claro' }],
  wind: { speed: 5 },
};

test('Renderiza la información del clima correctamente', () => {
  render(<WeatherCard data={mockData} />);
  
  expect(screen.getByText('Buenos Aires')).toBeInTheDocument();
  expect(screen.getByText('25°C')).toBeInTheDocument();
  expect(screen.getByText(/cielo claro/i)).toBeInTheDocument();
  expect(screen.getByText('60%')).toBeInTheDocument();
});