import { useParams, Link } from "react-router";
import { useDeliveries, useMarkOrderAsDelivered } from "../../hooks/useDelivery";
import { STATUS_CONFIG } from "../../components/orders/StatusConfig";

export default function DeliveryDetails() {
  const { orderId } = useParams();
  const { deliveries, isPending } = useDeliveries();
  const { mutate: markDelivered, isPending: deliveredPending } = useMarkOrderAsDelivered();

  if (isPending) {
    return <p className="py-10 text-center text-muted-foreground">Loading order...</p>;
  }

  const order = deliveries.find((o) => o._id === orderId);

  if (!order) {
    return (
      <div className="py-10 text-center">
        <p className="text-muted-foreground">Order not found.</p>
        <Link to="/delivery/deliveries" className="mt-2 inline-block text-sm text-primary hover:underline">
          Back to deliveries
        </Link>
      </div>
    );
  }

  const config = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;

  return (
    <div className="space-y-6">
      <Link to="/delivery/deliveries" className="text-sm text-muted-foreground hover:underline">
        ← Back to deliveries
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">
          #{order._id.slice(-6).toUpperCase()}
        </h1>
        <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
          {config.label}
        </span>
      </div>

      <section className="rounded-2xl border border-border bg-card p-4">
        <h2 className="mb-3 font-semibold text-card-foreground">Items</h2>
        <ul className="divide-y divide-border">
          {order.cartItems.map((item) => (
            <li key={item._id} className="flex items-center justify-between py-2 text-sm">
              <span>
                {item.quantity}× {item.name}
                {item.size && <span className="text-muted-foreground"> ({item.size})</span>}
              </span>
              <span className="font-medium text-card-foreground">{item.price} EGP</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 text-sm">
        <h2 className="mb-3 font-semibold text-card-foreground">Order Summary</h2>
        <div className="space-y-1 text-muted-foreground">
          <div className="flex justify-between">
            <span>Items</span>
            <span>{order.itemsPrice} EGP</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>{order.taxPrice} EGP</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>{order.shippingPrice} EGP</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-border pt-2 font-semibold text-card-foreground">
            <span>Total</span>
            <span>{order.totalOrderPrice} EGP</span>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 text-sm">
        <h2 className="mb-3 font-semibold text-card-foreground">Delivery & Payment</h2>
        <div className="space-y-1 text-muted-foreground">
          {order.deliveryAddress && (
            <div className="flex justify-between">
              <span>Address</span>
              <span className="text-right">
                {order.deliveryAddress.street}, {order.deliveryAddress.city},{" "}
                {order.deliveryAddress.governorate}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Payment</span>
            <span className="capitalize">
              {order.paymentMethod} · {order.paymentStatus}
            </span>
          </div>
        </div>
      </section>

      {order.status === "out_for_delivery" && (
        <button
          onClick={() => markDelivered(order._id)}
          disabled={deliveredPending}
          className="w-full cursor-pointer rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {deliveredPending ? "Marking..." : "Mark as Delivered"}
        </button>
      )}
    </div>
  );
}