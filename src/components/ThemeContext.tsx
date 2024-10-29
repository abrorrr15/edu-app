import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext<any>(null);

const fontTypes: any = {
  sansSerif: "sans-serif",
  serif: "serif",
  monospace: "monospace",
  italic: "italic"
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemTheme = useColorScheme();
  const [isDarkTheme, setIsDarkTheme] = useState(systemTheme === "dark");
  const [fontType, setFontType] = useState("sansSerif");

  // Sync with system theme changes
  useEffect(() => {
    setIsDarkTheme(systemTheme === "dark");
  }, [systemTheme]);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const value = {
    isDarkTheme,
    fontType: fontTypes[fontType],
    setFontType,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
