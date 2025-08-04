// src/components/ParticlesBackground.jsx
import React from "react";
import Particles from "react-tsparticles";
import { loadBasic } from "tsparticles-basic";

const ParticlesBackground = () => {
  const particlesInit = async (engine) => {
    await loadBasic(engine);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: { value: "transparent" },
        },
        fullScreen: { enable: true, zIndex: -1 },
        particles: {
          number: { value: 60 },
          size: { value: 3 },
          opacity: { value: 0.5 },
          move: { enable: true, speed: 0.3 },
          shape: { type: "circle" },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" } },
          modes: { repulse: { distance: 40, duration: 0.4 } },
        },
      }}
    />
  );
};

export default ParticlesBackground;
