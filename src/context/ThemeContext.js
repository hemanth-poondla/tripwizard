import { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("default");

  const updateTheme = (vibe) => {
    if (!vibe) return;

    const v = vibe.toLowerCase();
    if (v.includes("adventure") || v.includes("wild")) setTheme("adventure");
    else if (v.includes("relax") || v.includes("beach")) setTheme("relaxation");
    else if (v.includes("history") || v.includes("temple")) setTheme("culture");
    else if (v.includes("party") || v.includes("night")) setTheme("nightlife");
    else setTheme("default");
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
