import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
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
  const loading = useRouterState({ select: (state) => state.isLoading });
  const dark = useAppTheme(true) === 'dark';

  return (
    <div className={`freshflix-shell${dark ? "" : " freshflix-light"}`}>
      {loading && <div className="freshflix-route-progress" role="progressbar" aria-label="Loading page" />}
      <Navbar />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}