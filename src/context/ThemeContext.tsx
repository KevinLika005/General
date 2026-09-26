import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  applyThemeToDocument,
  getStoredTheme,
  resolveTheme,
  setStoredTheme,
  subscribeToStoredThemeChanges,
  subscribeToSystemTheme,
  type Theme,
} from '../utils/theme';

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [storedTheme, setStoredThemeState] = useState<Theme | null>(() => getStoredTheme());
  const [theme, setThemeState] = useState<Theme>(() => resolveTheme(getStoredTheme()));

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  useEffect(() => {
    if (storedTheme !== null) {
      return;
    }

    return subscribeToSystemTheme((nextTheme) => {
      setThemeState(nextTheme);
    });
  }, [storedTheme]);

  useEffect(
    () =>
      subscribeToStoredThemeChanges((nextStoredTheme) => {
        setStoredThemeState(nextStoredTheme);
        setThemeState(resolveTheme(nextStoredTheme));
      }),
    [],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      isDark: theme === 'dark',
      setTheme: (nextTheme) => {
        setStoredTheme(nextTheme);
        setStoredThemeState(nextTheme);
        setThemeState(nextTheme);
      },
      toggleTheme: () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';

        setStoredTheme(nextTheme);
        setStoredThemeState(nextTheme);
        setThemeState(nextTheme);
      },
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
