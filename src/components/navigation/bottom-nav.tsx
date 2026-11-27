import { useRef, useState } from 'react';
import { Link, useLocation, useRouterState } from '@tanstack/react-router';
import { Library, Clapperboard, Moon, Sun, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppChat } from '@/components/whatsapp-chat';
import { useAppTheme } from '@/hooks/use-app-theme';
import { applyTheme, nextTheme } from '@/lib/theme';

export function BottomNav() {
  const pathname = useLocation({ select: location => location.pathname });
  const movies = pathname === '/movies' || pathname.startsWith('/movies/');
  const pendingPath = useRouterState({ select: state => state.status === 'pending' || state.isLoading ? state.location.pathname : null });
  const pendingMovies = pendingPath === '/movies' || pendingPath?.startsWith('/movies/');
  const entertainmentPending = Boolean(pendingPath && pendingMovies);
  const libraryPending = Boolean(pendingPath && !pendingMovies);
  const selectedMovies = pendingPath ? Boolean(pendingMovies) : movies;
  const theme = useAppTheme();
  const [helpOpen, setHelpOpen] = useState(false);
  const helpTrigger = useRef<HTMLButtonElement>(null);
  const themeLabel = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  return <>
    <nav className="app-bottom-nav" aria-label="Main navigation">
      <div className="app-bottom-nav__inner">
        <Button asChild variant="source" size="source" className="app-bottom-tab" data-active={!selectedMovies}>
          <Link to="/" preload="intent" aria-busy={libraryPending} aria-current={!movies ? 'page' : undefined}><span className="app-bottom-tab__icon">{libraryPending ? <LoaderCircle className="animate-spin motion-reduce:animate-none" /> : <Library />}</span><span>Library</span></Link>
        </Button>
        <Button asChild variant="source" size="source" className="app-bottom-tab" data-active={selectedMovies}>
          <Link to="/movies" preload="intent" aria-busy={entertainmentPending} aria-current={movies ? 'page' : undefined}><span className="app-bottom-tab__icon">{entertainmentPending ? <LoaderCircle className="animate-spin motion-reduce:animate-none" /> : <Clapperboard />}</span><span>Entertainment</span></Link>
        </Button>
        <Button variant="source" size="source" className="app-bottom-tab" title={themeLabel} aria-label={themeLabel} onClick={() => applyTheme(nextTheme(theme))}>
          <span className="app-bottom-tab__icon">{theme === 'dark' ? <Sun /> : <Moon />}</span><span>Theme</span>
        </Button>
        <Button ref={helpTrigger} variant="source" size="source" className="app-bottom-tab" title="WhatsApp Help" aria-label="WhatsApp Help" aria-haspopup="dialog" aria-expanded={helpOpen} aria-controls="africavotes-chat" data-active={helpOpen} onClick={() => setHelpOpen(value => !value)}>
          <span className="app-bottom-tab__icon"><i className="fa-brands fa-whatsapp" aria-hidden="true" /></span><span>Help</span>
        </Button>
      </div>
    </nav>
    {helpOpen && <div className="app-help-backdrop" aria-hidden="true" onClick={() => setHelpOpen(false)} />}
    <WhatsAppChat open={helpOpen} onOpenChange={setHelpOpen} triggerRef={helpTrigger} />
  </>;
}
