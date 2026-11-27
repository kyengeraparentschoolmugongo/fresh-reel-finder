export type Theme = 'light' | 'dark';
export const THEME_KEY = 'ft-theme';

// Runs before first paint so returning visitors never see a flash of the wrong theme.
export const themeBootstrap = `(function(){try{var t=localStorage.getItem('${THEME_KEY}')||localStorage.getItem('freshflix-theme');if(t!=='light')document.documentElement.classList.add('dark');}catch(e){document.documentElement.classList.add('dark');}})();`;

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  try { localStorage.setItem(THEME_KEY, theme); localStorage.setItem('freshflix-theme', theme); } catch { /* storage unavailable */ }
  window.dispatchEvent(new Event('app-theme-change'));
}

export const nextTheme = (theme: Theme): Theme => (theme === 'dark' ? 'light' : 'dark');
