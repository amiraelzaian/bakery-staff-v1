import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Menu, X } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useAuthStore } from "../stores/authStore";

export default function Header({ links = [], expanded = false }) {
  const [open, setOpen] = useState(false);
  const logout = useAuthStore((s) => s.logout);
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const hasLinks = links.length > 0;

  const handleLogout = () => {
    logout();
    queryClient.clear(); 
  };

  // close the mobile menu on every route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // close the mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4">
      {!expanded && <Logo />}

      {/* Desktop nav */}
      <nav className="hidden gap-1 md:flex" aria-label="Main">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>

      {/* Right group */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Logout"
          className={`items-center gap-2 rounded-md p-2 text-sm font-medium text-red-600 transition-colors hover:text-red-500 dark:text-red-400 ${
            hasLinks ? "hidden md:flex" : "flex"
          }`}
        >
          <LogOut size={18} />
          <span className="hidden md:inline">Logout</span>
        </button>

        <ThemeToggle />

        {hasLinks && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}
      </div>

      {/* Mobile dropdown */}
      {hasLinks && (
        <div
          id="mobile-menu"
          className={`absolute inset-x-0 top-full grid border-b border-border bg-card shadow-md transition-all duration-300 ease-in-out md:hidden ${
            open
              ? "visible grid-rows-[1fr] opacity-100"
              : "invisible grid-rows-[0fr] opacity-0"
          }`}
        >
          <nav className="min-h-0 overflow-hidden" aria-label="Mobile">
            <div className="flex flex-col gap-1 px-4 py-3">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) =>
                    `rounded-md p-3 text-sm transition-colors ${
                      isActive
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-md p-3 text-left text-sm font-medium text-red-600 transition-colors hover:bg-muted dark:text-red-400"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}