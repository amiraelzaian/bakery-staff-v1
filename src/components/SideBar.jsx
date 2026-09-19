import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Logo from "./Logo";

export default function SideBar({links = [] }) {
   const [expanded, setExpanded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e) => e.key === "Escape" && setExpanded(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  return (
    <div className="w-0 shrink-0 md:w-16">
      {/* overlay */}
      <div
        onClick={() => setExpanded(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 ${
          expanded ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* phones only: floating open button */}
      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-label="Open sidebar"
          className="fixed left-3 top-3 z-40 cursor-pointer rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
        >
          <PanelLeftOpen size={22} />
        </button>
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col overflow-hidden border-border bg-card transition-[width,visibility] duration-200 ${
          expanded
            ? "visible w-64 border-r shadow-xl"
            : "  visible w-16 border-r"
        }`}
      >
        <div
          className={`flex h-16 shrink-0 items-center border-b border-border px-3 ${
            expanded ? "justify-between" : "justify-center"
          }`}
        >
          {expanded && <Logo />}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            aria-expanded={expanded}
            className="cursor-pointer rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {expanded ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
          </button>
        </div>

        <nav
          aria-label="Admin"
          className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden px-2 py-4"
        >
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              title={!expanded ? label : undefined}
              aria-label={label}
              className={({ isActive }) =>
                `flex items-center rounded-lg py-2 text-sm transition-colors ${
                  expanded ? "gap-3 px-3" : "justify-center"
                } ${
                  isActive
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`
              }
            >
              <Icon size={18} className="shrink-0" />
              {expanded && (
                <span className="truncate whitespace-nowrap">{label}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </div>
  );
}