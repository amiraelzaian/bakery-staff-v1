
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Logo from "./Logo";

export default function SideBar({expanded,setExpanded, links = [] }) {
 
  const { pathname } = useLocation();

  // close after navigating (also covers Back/Forward)
  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  // close with Escape
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e) => e.key === "Escape" && setExpanded(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  return (
    // Fixed 64px slot: the only space the layout ever sees,
    // so the page content never moves when the drawer opens.
    <div className="w-16 shrink-0">
      {/* Overlay */}
      <div
        onClick={() => setExpanded(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 ${
          expanded ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Fixed sidebar: grows OVER the content */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col overflow-hidden border-r border-border bg-card transition-[width] duration-200 ${
          expanded ? "w-64 shadow-xl" : "w-16"
        }`}
      >
        {/* Top: logo + toggle */}
        <div
          className={`flex h-16 shrink-0 items-center border-b border-border px-3 ${
            expanded ? "justify-between" : "justify-center"
          }`}
        >
          {expanded &&  <span className="whitespace-nowrap font-lovers-quarrel text-2xl font-bold text-primary md:text-4xl">
        Golden Crumbs
      </span>}
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

        {/* Links */}
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