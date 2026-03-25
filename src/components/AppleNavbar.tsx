import { Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "Assistant" },
  { href: "/auth", label: "Login" },
];

export function AppleNavbar() {
  const location = useLocation();

  return (
    <div className="sticky top-4 z-50 mx-auto mb-8 w-full max-w-6xl px-4 sm:px-6">
      <nav className="mx-auto flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <span className="font-display text-base font-semibold text-foreground">Descision AI</span>
        </Link>

        <div className="flex items-center gap-1 rounded-full bg-white/5 p-1">
          {links.map((link) => {
            const active = location.pathname === link.href;

            return (
              <Link
                key={link.href}
                to={link.href}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                  active ? "bg-white/15 text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
