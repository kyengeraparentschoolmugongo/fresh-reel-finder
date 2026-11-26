import { Link } from "@tanstack/react-router";
import { Search, Download } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InstallCard } from '@/components/navigation/install-card';
import logo from "@/assets/movies/freshflix-wordmark.png.asset.json";

export function Navbar() {
  const [installOpen, setInstallOpen] = useState(false);
  return (
    <header className="glass-bar fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-16 items-center justify-between px-5 sm:px-10">
        <Link to="/movies" aria-label="FRESHFLIX home" className="flex items-center">
          <img src={logo.url} alt="FRESHFLIX" width={600} height={143} className="h-8 w-auto sm:h-9" />
        </Link>
        <div className="relative flex items-center gap-1 text-sm">
          <Button asChild variant="source" size="source"><Link
            to="/movies/search"
            search={{ q: "" }}
            aria-label="Search movies"
            className="nav-pill"
            activeProps={{ className: "nav-pill-active" }}
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
          </Link></Button>
          <Button variant="source" size="source" className="nav-pill" aria-label="Install the app" title="Install the app" aria-haspopup="dialog" aria-expanded={installOpen} onClick={() => setInstallOpen(value => !value)}><Download /></Button>
          <InstallCard open={installOpen} onClose={() => setInstallOpen(false)} />
        </div>
      </nav>
    </header>
  );
}