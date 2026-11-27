import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/movies/Navbar";
import { useAppTheme } from '@/hooks/use-app-theme';
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/movies")({
  staticData: { sitemap: false },
  head: () => ({
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Manrope:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: MovieLayout,
});

function MovieLayout() {
  const dark = useAppTheme() === 'dark';

  return (
    <div className={`freshflix-shell${dark ? "" : " freshflix-light"}`}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}