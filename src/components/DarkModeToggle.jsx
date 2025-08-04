import React from "react";
import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
} from "@material-tailwind/react";
import {
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

export default function DarkModeSpeedDial({ isDark, toggleDark }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <SpeedDial open={open} handler={setOpen} className="relative">
        <SpeedDialHandler>
          <IconButton size="lg" className="rounded-full bg-blue-500 text-white shadow-lg hover:scale-110 transition-transform">
            {isDark ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </IconButton>
        </SpeedDialHandler>
        <SpeedDialContent className="flex flex-col items-end">
          <SpeedDialAction onClick={toggleDark} className="bg-gray-100 dark:bg-gray-800">
            {isDark ? (
              <SunIcon className="h-6 w-6 text-yellow-500" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-800" />
            )}
          </SpeedDialAction>
        </SpeedDialContent>
      </SpeedDial>
    </div>
  );
}
