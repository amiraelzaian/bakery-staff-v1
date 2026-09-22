export function RangeToggle({ range, onChange }) {
  const RANGES = [
    { value: "today", label: "Today" },
    { value: "week", label: "This week" },
    { value: "month", label: "This month" },
    { value: "all", label: "All time" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {RANGES.map((r) => (
        <button
          key={r.value}
          onClick={() => onChange(r.value)}
          className={`cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium transition ${
            range === r.value
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}

export function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold text-card-foreground">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function ChartCard({ title, children, isPending, error, empty }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <h3 className="mb-3 font-semibold text-card-foreground">{title}</h3>
      {isPending ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Loading...</p>
      ) : error ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Couldn't load data.</p>
      ) : empty ? (
        <p className="py-10 text-center text-sm text-muted-foreground">No data for this range.</p>
      ) : (
        children
      )}
    </div>
  );
}