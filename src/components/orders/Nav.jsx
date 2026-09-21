import { NavLink } from "react-router";

const LINKS = [
  { label: "Orders", to: "/admin/orders", end: true },
  { label: "Failed Orders", to: "/admin/orders/failed" },
  { label: "Refunded Orders", to: "/admin/orders/refunded" },
];

export default function ToggleOrderPages() {
  return (
    <nav className="flex flex-wrap gap-2">
      {LINKS.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.end}
          className={({ isActive }) =>
            `rounded-full px-3 py-1.5 text-sm font-medium transition ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`
          }
        >
          {l.label}
        </NavLink>
      ))}
    </nav>
  );
}