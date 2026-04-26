import { Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <div className="sticky top-4 z-50 mx-auto mb-8 w-full max-w-6xl px-4 sm:px-6">
      <nav className="mx-auto flex items-center justify-between rounded-2xl border border-border/20 bg-card/60 px-4 py-3 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <span className="font-display text-base font-semibold text-foreground">Descision AI</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-2 sm:flex">
          <div className="flex items-center gap-1 rounded-full bg-muted/40 p-1">
            {links.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                    active ? "bg-primary/15 text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/30 bg-muted/30 text-muted-foreground transition-colors hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/30 bg-muted/30 text-muted-foreground"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((p) => !p)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/30 bg-muted/30 text-muted-foreground"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-2 flex flex-col gap-1 rounded-2xl border border-border/20 bg-card/90 p-2 backdrop-blur-xl sm:hidden"
          >
            {links.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`rounded-xl px-4 py-2.5 text-sm transition-colors ${
                    active ? "bg-primary/15 text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
