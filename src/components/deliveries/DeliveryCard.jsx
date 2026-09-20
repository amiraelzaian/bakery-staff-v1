import { Link } from "react-router";
import { STATUS_CONFIG } from "../orders/StatusConfig";

function formatItem(item) {
  return `${item.quantity}× ${item.name}${item.size ? ` (${item.size})` : ""}`;
}

export default function DeliveryCard({ order, onMarkDelivered, deliveredPending }) {
  const status = order.status;
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  const orderNumber = order._id.slice(-6).toUpperCase();
  const visibleItems = order.cartItems.slice(0, 3);
  const extraCount = order.cartItems.length - visibleItems.length;
  const address = order.deliveryAddress;
  const customer=order.user;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div>
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-card-foreground">#{orderNumber}</h3>
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
            {config.label}
          </span>
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          {order.cartItems.length} item{order.cartItems.length !== 1 ? "s" : ""} · Delivery
        </p>


        {customer && (
          <div className="mt-2 rounded-lg bg-muted p-2 text-sm flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">Customer contact info:</p>
            <p className="font-medium text-card-foreground">{customer.name}</p>
            {customer?.phone && (
              <a href={`tel:${customer?.phone}`} className="text-primary hover:underline">
                {customer.phone}
              </a>
            )}
            {customer?.email && (
              <a href={`mailTo:${customer?.email}`} className="text-primary hover:underline">
                {customer.email}
              </a>
            )}
          </div>
        )}
        {address && (
          <p className="mt-2 text-sm text-card-foreground">
            {address.street}, {address.city}, {address.governorate}
          </p>
        )}

        <ul className="mt-3 space-y-1 text-sm text-card-foreground">
          {visibleItems.map((item) => (
            <li key={item._id}>{formatItem(item)}</li>
          ))}
          {extraCount > 0 && <li className="text-muted-foreground">+{extraCount} more</li>}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="font-semibold text-card-foreground">{order.totalOrderPrice} EGP</span>
        <Link
          to={`/delivery/deliveries/${order._id}`}
          className="text-xs font-medium text-primary hover:underline"
        >
          View details
        </Link>
      </div>

      {status === "out_for_delivery" && (
        <button
          onClick={() => onMarkDelivered(order._id)}
          disabled={deliveredPending}
          className="mt-3 w-full cursor-pointer rounded-xl bg-primary py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          {deliveredPending ? "Marking..." : "Mark as Delivered"}
        </button>
      )}

      {status === "delivered" && (
        <div className="mt-3 w-full rounded-xl bg-muted py-2 text-center text-sm font-semibold text-muted-foreground">
          Delivered
        </div>
      )}
    </div>
  );
}