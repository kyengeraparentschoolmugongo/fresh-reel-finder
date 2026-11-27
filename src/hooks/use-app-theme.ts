import { useEffect, useState } from 'react';
import { THEME_KEY, type Theme } from '@/lib/theme';

export function useAppTheme(defaultDark = true) {
  const [theme, setTheme] = useState<Theme>(defaultDark ? 'dark' : 'light');
  useEffect(() => {
    const sync = () => {
      try {
        const saved = localStorage.getItem(THEME_KEY) ?? localStorage.getItem('freshflix-theme');
        setTheme(saved === 'dark' || saved === 'light' ? saved : defaultDark ? 'dark' : 'light');
      } catch { setTheme(defaultDark ? 'dark' : 'light'); }
    };
    sync();
    window.addEventListener('app-theme-change', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('app-theme-change', sync);
      window.removeEventListener('storage', sync);
    };
  }, [defaultDark]);
  return theme;
}
