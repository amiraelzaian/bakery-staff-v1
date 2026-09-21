import { ORDER_STATUS_LABELS } from "./OrderStatusConfig";

const TONE = {
  pending: "bg-muted text-muted-foreground",
  accepted: "bg-secondary/20 text-secondary-foreground",
  preparing: "bg-secondary/30 text-secondary-foreground",
  ready: "bg-accent/15 text-accent",
  out_for_delivery: "bg-accent/20 text-accent",
  delivered: "bg-accent/25 text-accent",
  picked_up: "bg-accent/25 text-accent",
  cancelled: "bg-destructive/15 text-destructive",
};

export default function OrderStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        TONE[status] ?? "bg-muted text-muted-foreground"
      }`}
    >
      {ORDER_STATUS_LABELS[status] ?? status}
    </span>
  );
}