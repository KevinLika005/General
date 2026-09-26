import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';

export function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const Icon = isDark ? Moon : Sun;
  const actionLabel = isDark ? t('common.theme.switchToLight') : t('common.theme.switchToDark');
  const currentThemeLabel = isDark ? t('common.theme.dark') : t('common.theme.light');

  return (
    <button
      aria-label={actionLabel}
      aria-pressed={isDark}
      className="inline-flex h-10 w-10 items-center justify-center border border-border bg-surface-card text-navy transition hover:border-primary hover:bg-surface-subtle"
      onClick={toggleTheme}
      title={actionLabel}
      type="button"
    >
      <span className="sr-only">
        {t('common.theme.label')}: {currentThemeLabel}
      </span>
      <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
    </button>
  );
}
