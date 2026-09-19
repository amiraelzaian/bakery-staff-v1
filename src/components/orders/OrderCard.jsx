import { Link } from "react-router";
import { STATUS_CONFIG } from "./StatusConfig";

function formatItem(item) {
  return `${item.quantity}× ${item.name}${item.size ? ` (${item.size})` : ""}`;
}

export default function OrderCard({
  order,
  onStartPreparing,
  onMarkReady,
  preparingPending,
  readyPending,
}) {

  const status = order.status;
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  const orderNumber = order._id.slice(-6).toUpperCase();
  const visibleItems = order.cartItems.slice(0, 3);
  const extraCount = order.cartItems.length - visibleItems.length;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div>
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-foreground">#{orderNumber}</h3>
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${config.classes}`}>
            {config.label}
          </span>
        </div>

        <p className="mt-1 text-xs text-accent">
          {order.cartItems.length} item{order.cartItems.length !== 1 ? "s" : ""} ·{" "}
          {order.deliveryMethod === "delivery" ? "Delivery" : "Pickup"}
        </p>

        <ul className="mt-3 flex flex-col text-sm text-card-foreground">
          {visibleItems.map((item) => (
            <li key={item._id}>{formatItem(item)}</li>
          ))}
          {extraCount > 0 && <li className="text-stone-400">+{extraCount} more</li>}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
        <span className="font-semibold text-foreground">{order.totalOrderPrice} EGP</span>
        <Link
          to={`/baker/orders/${order._id}`}
          className="text-xs font-medium text-primary hover:underline"
        >
          View details
        </Link>
      </div>

      {status === "accepted" && (
        <button
          onClick={() => onStartPreparing(order._id)}
          disabled={preparingPending}
          className="cursor-pointer mt-3 w-full rounded-xl bg-secondary py-2 text-sm font-semibold text-white transition hover:bg-secondary/70 disabled:opacity-50"
        >
          {preparingPending ? "Starting..." : "Start Preparing"}
        </button>
      )}

      {status === "preparing" && (
        <button
          onClick={() => onMarkReady(order._id)}
          disabled={readyPending}
          className=" cursor-pointer mt-3 w-full rounded-xl bg-emerald-600 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
        >
          {readyPending ? "Marking..." : "Mark as Ready"}
        </button>
      )}

      {status === "ready" && (
        <div className="mt-3 w-full rounded-xl bg-green-300 py-2 text-center text-sm font-semibold text-emerald-700 hover:bg-greeen-500">
          Ready for pickup
        </div>
      )}
    </div>
  );
}