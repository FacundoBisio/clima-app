import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadBasic } from "tsparticles-basic"; 
// Nota: Si tienes problemas con loadBasic, intenta importar { loadFull } de "tsparticles"

const WeatherParticles = ({ weatherCondition }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadBasic(engine);
  }, []);

  // Configuración base
  let options = {
    fullScreen: { enable: true, zIndex: 0 }, // Z-index bajo para estar detrás del contenido
    particles: {
      number: { value: 0 }, // Por defecto nada
    }
  };

  // Configuración de Lluvia
  if (['Rain', 'Drizzle', 'Thunderstorm'].includes(weatherCondition)) {
    options = {
      ...options,
      particles: {
        number: { value: 100, density: { enable: true, area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "line" },
        opacity: { value: 0.4 },
        size: { value: { min: 0.1, max: 0.5 } },
        move: {
          enable: true,
          speed: 25, // Velocidad alta para lluvia
          direction: "bottom",
          random: false,
          straight: true,
          outModes: { default: "out" },
        },
      },
    };
  }

  // Configuración de Nieve
  if (weatherCondition === 'Snow') {
    options = {
      ...options,
      particles: {
        number: { value: 80, density: { enable: true, area: 800 } },
        color: { value: "#fff" },
        shape: { type: "circle" },
        opacity: { value: 0.8 },
        size: { value: { min: 2, max: 5 } },
        move: {
          enable: true,
          speed: 3, // Lento para nieve
          direction: "bottom",
          random: false,
          straight: false,
          outModes: { default: "out" },
        },
        wobble: { enable: true, distance: 10, speed: 10 } // Efecto de bamboleo
      },
    };
  }

  // Si está despejado o nublado simple, devolvemos null para no cargar partículas
  if (!['Rain', 'Drizzle', 'Thunderstorm', 'Snow'].includes(weatherCondition)) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
       <Particles id="tsparticles-weather" init={particlesInit} options={options} />
    </div>
  );
};

export default WeatherParticles;