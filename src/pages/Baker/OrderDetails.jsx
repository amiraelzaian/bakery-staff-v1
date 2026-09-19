import { useParams, Link } from "react-router";
import {
  useBakerOrders,
  useMarkOrderPreparing,
  useMarkOrderReady,
} from "../../hooks/useBaker";
import { STATUS_CONFIG } from "../../components/orders/StatusConfig";

export default function OrderDetails() {
  const { id } = useParams();
  const { orders, isPending } = useBakerOrders();
  const { mutate: startPreparing, isPending: preparingPending } = useMarkOrderPreparing();
  const { mutate: markReady, isPending: readyPending } = useMarkOrderReady();


  if (isPending) {
    return <p className="py-10 text-center text-muted-foreground">Loading order...</p>;
  }

  const order = orders.find((o) => o._id === id);

  if (!order) {
    return (
      <div className="py-10 text-center">
        <p className="text-muted-foreground">Order not found.</p>
        <Link to="/baker/orders" className="mt-2 inline-block text-sm text-amber-700 hover:underline">
          Back to orders
        </Link>
      </div>
    );
  }

  const config = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;

  return (
    <div className="space-y-6">
      <Link to="/baker/orders" className="text-sm text-muted-foreground hover:underline">
        ← Back to orders
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">
          #{order._id.slice(-6).toUpperCase()}
        </h1>
        <span className={`rounded-full px-3 py-1 text-sm font-medium ${config.classes}`}>
          {config.label}
        </span>
      </div>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-md">
        <h2 className="mb-3 font-semibold text-foreground">Items</h2>
        <ul className="divide-y divide-muted">
          {order.cartItems.map((item) => (
            <li key={item._id} className="flex items-center justify-between py-2 text-sm">
              <span>
                {item.quantity}× {item.name}
                {item.size && <span className="text-muted-foreground"> ({item.size})</span>}
              </span>
              <span className="font-medium text-muted-foreground">{item.price} EGP</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 text-sm shadow-md">
        <h2 className="mb-3 font-semibold text-foreground">Order Summary</h2>
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
          <div className="mt-2 flex justify-between border-t border-muted pt-2 font-semibold text-muted-foreground">
            <span>Total</span>
            <span>{order.totalOrderPrice} EGP</span>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 text-sm shadow-md">
        <h2 className="mb-3 font-semibold text-foreground">Delivery & Payment</h2>
        <div className="space-y-1 text-muted-foreground">
          <div className="flex justify-between">
            <span>Method</span>
            <span className="capitalize">{order.deliveryMethod}</span>
          </div>
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

      {order.status === "accepted" && (
        <button
          onClick={() => startPreparing(order._id)}
          disabled={preparingPending}
           className="cursor-pointer mt-3 w-full rounded-xl bg-secondary py-2 text-sm font-semibold text-white transition hover:bg-secondary/70 disabled:opacity-50"
        >
          {preparingPending ? "Starting..." : "Start Preparing"}
        </button>
      )}

      {order.status === "preparing" && (
        <button
          onClick={() => markReady(order._id)}
          disabled={readyPending}
          className="w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {readyPending ? "Marking..." : "Mark as Ready"}
        </button>
      )}
    </div>
  );
}