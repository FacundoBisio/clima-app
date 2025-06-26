import { useEffect, useState } from "react";

export const useDarkMode = (sunrise, sunset, timezone) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (!sunrise || !sunset || !timezone) return;
    const now = Math.floor(Date.now() / 1000);
    const localTime = now + timezone;
    setIsDark(localTime < sunrise || localTime > sunset);
  }, [sunrise, sunset, timezone]);

  return isDark;
};
