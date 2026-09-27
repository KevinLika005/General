export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'general-trading-theme';
export const DEFAULT_THEME: Theme = 'light';

const LIGHT_THEME_COLOR = '#f2f1ee';
const DARK_THEME_COLOR = '#181614';

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark';
}

export function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(storedTheme) ? storedTheme : null;
  } catch {
    return null;
  }
}

export function setStoredTheme(theme: Theme) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage failures so restricted browsers cannot blank the app.
  }
}

export function getSystemTheme(): Theme {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return DEFAULT_THEME;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function resolveTheme(storedTheme: Theme | null = getStoredTheme()): Theme {
  return storedTheme ?? getSystemTheme();
}

export function getThemeColor(theme: Theme) {
  return theme === 'dark' ? DARK_THEME_COLOR : LIGHT_THEME_COLOR;
}

export function syncThemeColorMeta(theme: Theme) {
  if (typeof document === 'undefined') {
    return;
  }

  const themeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');

  if (!themeMeta) {
    return;
  }

  const nextColor =
    theme === 'dark'
      ? themeMeta.dataset.dark || getThemeColor('dark')
      : themeMeta.dataset.light || getThemeColor('light');

  themeMeta.setAttribute('content', nextColor);
}

export function applyThemeToDocument(theme: Theme) {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;

  root.dataset.theme = theme;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;

  syncThemeColorMeta(theme);
}

export function subscribeToSystemTheme(callback: (theme: Theme) => void) {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleChange = (event: MediaQueryListEvent) => callback(event.matches ? 'dark' : 'light');

  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }

  mediaQuery.addListener(handleChange);
  return () => mediaQuery.removeListener(handleChange);
}

export function subscribeToStoredThemeChanges(callback: (theme: Theme | null) => void) {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) {
      return;
    }

    callback(isTheme(event.newValue) ? event.newValue : null);
  };

  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
}
