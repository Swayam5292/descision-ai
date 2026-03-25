import { Moon, Sparkles, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const links = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "Assistant" },
  { href: "/auth", label: "Login" },
];

const THEME_KEY = "descision-ai-theme";

function resolveInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const saved = window.localStorage.getItem(THEME_KEY);
  if (saved === "dark" || saved === "light") return saved;

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function AppleNavbar() {
  const location = useLocation();
  const [theme, setTheme] = useState<Theme>(resolveInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <div className="sticky top-4 z-50 mx-auto mb-8 w-full max-w-7xl px-4 sm:px-6">
      <nav className="glass mx-auto flex items-center justify-between rounded-2xl px-4 py-3 shadow-lg shadow-black/5">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <span className="font-display text-base font-semibold text-foreground">Descision AI</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-muted/50 p-1">
            {links.map((link) => {
              const active = location.pathname === link.href;

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`rounded-full px-4 py-1.5 text-sm transition-all ${
                    active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </nav>
    </div>
  );
}
