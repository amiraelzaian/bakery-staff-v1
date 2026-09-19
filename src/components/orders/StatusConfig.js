export const STATUS_CONFIG = {
  pending: { label: "Pending", classes: "bg-stone-100 text-stone-600" },
  accepted: { label: "Accepted", classes: "bg-blue-100 text-blue-700" },
  preparing: { label: "Preparing", classes: "bg-amber-100 text-amber-700" },
  ready: { label: "Ready", classes: "bg-emerald-100 text-emerald-700" },
  out_for_delivery: { label: "Out for Delivery", classes: "bg-indigo-100 text-indigo-700" },
  delivered: { label: "Delivered", classes: "bg-stone-100 text-stone-500" },
  picked_up: { label: "Picked Up", classes: "bg-stone-100 text-stone-500" },
  cancelled: { label: "Cancelled", classes: "bg-red-100 text-red-600" },
};

export const FILTER_TABS = [
  { value: "all", label: "All" },
  { value: "accepted", label: "Accepted" },
  { value: "preparing", label: "Preparing" },
  { value: "ready", label: "Ready" },
];