import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LS_THEME_KEY = "theme";

type Theme = "dark" | "light";

export interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const lsTheme = localStorage.getItem(LS_THEME_KEY);

    if ((lsTheme && lsTheme === "dark") || lsTheme === "light") {
      return lsTheme;
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  });

  const _setTheme = (theme: Theme) => {
    setTheme(theme);
    localStorage.setItem(LS_THEME_KEY, theme);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === "dark",
        setTheme: _setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

class ThemeError extends Error {
  constructor() {
    super("Theme not provided");
  }
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new ThemeError();
  return ctx;
}

export function useIsDark() {
  const { isDark } = useTheme();
  return isDark;
}

export function useToggleTheme() {
  const { setTheme, theme } = useTheme();
  return () => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };
}
