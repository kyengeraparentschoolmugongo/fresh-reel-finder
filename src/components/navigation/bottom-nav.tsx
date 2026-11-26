import { useRef, useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { Library, Clapperboard, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhatsAppChat } from '@/components/whatsapp-chat';
import { useAppTheme } from '@/hooks/use-app-theme';
import { applyTheme, nextTheme } from '@/lib/theme';

export function BottomNav() {
  const pathname = useLocation({ select: location => location.pathname });
  const movies = pathname === '/movies' || pathname.startsWith('/movies/');
  const theme = useAppTheme();
  const [helpOpen, setHelpOpen] = useState(false);
  const helpTrigger = useRef<HTMLButtonElement>(null);
  const themeLabel = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  return <>
    <nav className="app-bottom-nav" aria-label="Main navigation">
      <div className="app-bottom-nav__inner">
        <Button asChild variant="source" size="source" className="app-bottom-tab" data-active={!movies}>
          <Link to="/" aria-current={!movies ? 'page' : undefined}><span className="app-bottom-tab__icon"><Library /></span><span>Library</span></Link>
        </Button>
        <Button asChild variant="source" size="source" className="app-bottom-tab" data-active={movies}>
          <Link to="/movies" aria-current={movies ? 'page' : undefined}><span className="app-bottom-tab__icon"><Clapperboard /></span><span>Entertainment</span></Link>
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
