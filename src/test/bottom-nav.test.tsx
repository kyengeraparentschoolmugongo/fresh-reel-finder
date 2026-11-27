import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { applyTheme, themeBootstrap } from '@/lib/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import manifest from '../../public/manifest.webmanifest?raw';
const location = vi.hoisted(() => ({ pathname: '/' }));
vi.mock('@tanstack/react-router', () => ({
  useLocation: ({ select }: { select: (value: typeof location) => string }) => select(location),
  Link: ({ to, children, ...props }: { to: string; children?: React.ReactNode }) => <a href={to} {...props}>{children}</a>,
}));
afterEach(() => { cleanup(); localStorage.clear(); document.documentElement.classList.remove('dark'); location.pathname = '/'; });
function MovieThemeProbe() { return <output aria-label="Movie theme">{useAppTheme()}</output>; }
describe('Shared bottom navigation behavior', () => {
  it('uses the library homepage as the app launch and Library destination', () => {
    render(<BottomNav />);
    expect(JSON.parse(manifest).start_url).toBe('/');
    expect(screen.getByRole('link', { name: 'Library' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Library' })).toHaveAttribute('aria-current', 'page');
  });
  it('routes Entertainment to movies and keeps it selected on movie detail pages', () => {
    location.pathname = '/movies/movie/123'; render(<BottomNav />);
    expect(screen.getByRole('link', { name: 'Entertainment' })).toHaveAttribute('href', '/movies');
    expect(screen.getByRole('link', { name: 'Entertainment' })).toHaveAttribute('aria-current', 'page');
  });
  it('starts in dark mode and applies the bottom theme action to both sections, retaining it after remount', () => {
    render(<><BottomNav /><MovieThemeProbe /></>);
    expect(screen.getByLabelText('Movie theme')).toHaveTextContent('dark');
    fireEvent.click(screen.getByRole('button', { name: 'Switch to light theme' }));
    expect(document.documentElement).not.toHaveClass('dark');
    expect(screen.getByLabelText('Movie theme')).toHaveTextContent('light');
    expect(localStorage.getItem('ft-theme')).toBe('light');
    expect(localStorage.getItem('freshflix-theme')).toBe('light');
    cleanup(); location.pathname = '/movies'; render(<><BottomNav /><MovieThemeProbe /></>);
    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark theme' }));
    expect(document.documentElement).toHaveClass('dark');
    expect(screen.getByLabelText('Movie theme')).toHaveTextContent('dark');
  });
  it('opens Help, preserves the drafted message and WhatsApp destination, and restores focus when closed', () => {
    render(<BottomNav />); const help = screen.getByRole('button', { name: 'WhatsApp Help' });
    fireEvent.click(help);
    expect(screen.getByRole('dialog', { name: 'Chat with Fresh Teacher' })).toBeInTheDocument();
    fireEvent.change(screen.getByRole('textbox', { name: 'Message' }), { target: { value: 'Please help with notes' } });
    expect(screen.getByRole('button', { name: 'Send message on WhatsApp' })).toHaveAttribute('href', 'https://web.whatsapp.com/send?phone=+256786812837&text=Please%20help%20with%20notes');
    fireEvent.click(screen.getByRole('button', { name: 'Close chat' }));
    expect(help).toHaveFocus(); fireEvent.click(help);
    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveValue('Please help with notes');
    fireEvent.keyDown(document, { key: 'Escape' }); expect(help).toHaveAttribute('aria-expanded', 'false');
  });
  it('retains the legacy movie preference until an explicit theme choice replaces it', () => {
    localStorage.setItem('freshflix-theme', 'dark'); render(<MovieThemeProbe />);
    expect(screen.getByLabelText('Movie theme')).toHaveTextContent('dark');
    act(() => applyTheme('light'));
    expect(screen.getByLabelText('Movie theme')).toHaveTextContent('light');
  });
});

it('defaults to dark theme with no saved preference in either section', () => {
  localStorage.clear(); render(<MovieThemeProbe />);
  expect(screen.getByLabelText('Movie theme')).toHaveTextContent('dark');
  cleanup(); render(<BottomNav />);
  expect(screen.getByRole('button', { name: 'Switch to light theme' })).toBeInTheDocument();
});

it('boots dark mode before paint unless the saved preference is light', () => {
  localStorage.clear();
  new Function(themeBootstrap)();
  expect(document.documentElement).toHaveClass('dark');
  localStorage.setItem('ft-theme', 'light');
  document.documentElement.classList.remove('dark');
  new Function(themeBootstrap)();
  expect(document.documentElement).not.toHaveClass('dark');
});
