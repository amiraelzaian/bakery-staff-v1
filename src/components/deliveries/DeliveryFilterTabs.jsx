const FILTER_TABS = [
  { value: "all", label: "All" },
  { value: "out_for_delivery", label: "Out for Delivery" },
  { value: "delivered", label: "Delivered" },
];

export default function DeliveryFilterTabs({ active, onChange, counts }) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition cursor-pointer ${
            active === tab.value
               ? "bg-primary text-primary-foreground"
              : "bg-secondary/80 text-white/95"
          }`}
        >
          {tab.label}
          {counts?.[tab.value] != null && (
            <span className="ml-1.5 text-xs opacity-70">{counts[tab.value]}</span>
          )}
        </button>
      ))}
    </div>
  );
}