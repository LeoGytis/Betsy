import { useEffect, useState } from "react";
import "../styles/switch.css";

const ThemeSwitch = () => {
  const getInitialTheme = () => {
    const userPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return userPrefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme);

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      document.querySelector("html")?.setAttribute("data-theme", newTheme);
      return newTheme;
    });
  };

  return (
    <div className="absolute -top-14 right-0">
      <input
        onChange={handleToggle}
        className="switch-checkbox"
        id="switch"
        type="checkbox"
        checked={theme === "dark"}
      />
      <label className="switch-label" htmlFor={`switch`}>
        <span className="switch-button" />
      </label>
    </div>
  );
};

export default ThemeSwitch;
