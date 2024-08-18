import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = document.cookie.replace(
      /(?:(?:^|.*;\s*)theme\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme;
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme;
    document.cookie = `theme=${newTheme};path=/;max-age=31536000`;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
