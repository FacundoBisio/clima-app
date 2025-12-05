import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const ThemeToggle = ({ theme, toggleTheme }) => {
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isDark ? 'bg-gray-700' : 'bg-blue-400'
      }`}
      aria-label="Toggle Dark Mode"
    >
      <span className="sr-only">Cambiar tema</span>
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className={`absolute left-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transform ${
          isDark ? 'translate-x-8' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <MoonIcon className="h-4 w-4 text-gray-800" />
        ) : (
          <SunIcon className="h-4 w-4 text-yellow-500" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;