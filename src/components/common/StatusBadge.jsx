export default function StatusBadge({ active, activeLabel = "Active", inactiveLabel = "Inactive" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        active ? "bg-accent/15 text-accent" : "bg-muted text-muted-foreground"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-accent" : "bg-muted-foreground"}`} />
      {active ? activeLabel : inactiveLabel}
    </span>
  );
}