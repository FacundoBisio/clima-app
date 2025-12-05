import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WeatherProvider } from './context/WeatherContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Importar

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WeatherProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </WeatherProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// Registrar para que funcione offline y sea instalable
serviceWorkerRegistration.register();