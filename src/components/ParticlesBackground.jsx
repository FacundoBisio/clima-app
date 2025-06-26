import React from 'react';
import { loadFull } from 'tsparticles';
import { Particles } from 'react-tsparticles';

const ParticlesBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        particles: {
          number: { value: 50 },
          size: { value: 3 },
          move: {
            enable: true,
            speed: 0.4,
          },
          opacity: { value: 0.5 },
          shape: { type: 'circle' },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: 'repulse' },
          },
          modes: {
            repulse: {
              distance: 50,
              duration: 0.4,
            },
          },
        },
      }}
    />
  );
};

export default ParticlesBackground;
