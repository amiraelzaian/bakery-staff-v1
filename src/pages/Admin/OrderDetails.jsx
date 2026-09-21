import { useParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useOrder } from "../../hooks/useOrders";
import OrderStatusBadge from "../../components/orders/OrderStatusBadge";
import { ORDER_STATUS_LABELS } from "../../components/orders/OrderStatusConfig";

export default function OrderDetails() {
  const { orderId } = useParams();
  const { order, isPending, error } = useOrder(orderId);

  if (isPending) {
    return <p className="py-10 text-center text-muted-foreground">Loading order...</p>;
  }

  if (error || !order) {
    return (
      <div className="py-10 text-center">
        <p className="text-muted-foreground">Order not found.</p>
        <Link to="/admin/orders" className="mt-2 inline-block text-sm text-primary hover:underline">
          Back to orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/admin/orders"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline"
      >
        <ArrowLeft size={14} />
        Back to orders
      </Link>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <h1 className="text-xl font-bold text-muted-foreground">
          #{order._id}
        </h1>
        <OrderStatusBadge status={order.status} />
      </div>

      <section className="rounded-2xl border border-border bg-card p-5">
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

      <section className="rounded-2xl border border-border bg-card p-5 text-sm">
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

      <section className="rounded-2xl border border-border bg-card p-5 text-sm">
        <h2 className="mb-3 font-semibold text-card-foreground">Delivery & Payment</h2>
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
          {order.kashierTransactionId && (
            <div className="flex justify-between">
              <span>Transaction ID</span>
              <span>{order.kashierTransactionId}</span>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 text-sm">
        <h2 className="mb-3 font-semibold text-card-foreground">People</h2>
        <div className="flex flex-col gap-2 text-muted-foreground">
            <AssigneeRow label="Customer" person={order.user} />
            {order.assignedBakerId && (
            <AssigneeRow label="Baker" person={order.assignedBakerId} />
            )}
            {order.assignedDeliveryId && (
            <AssigneeRow label="Delivery" person={order.assignedDeliveryId} />
            )}
  </div>
</section>

      <section className="rounded-2xl border border-border bg-card p-5 text-sm">
        <h2 className="mb-3 font-semibold text-card-foreground">Status History</h2>
        <div className="space-y-3">
          {order.statusHistory.map((entry) => (
            <div key={entry._id} className="flex items-center justify-between">
              <span className="text-card-foreground">
                {ORDER_STATUS_LABELS[entry.status] ?? entry.status}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(entry.changedAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


function AssigneeRow({ label, person }) {
 
  const isObject = typeof person === "object";
  const id = isObject ? person._id : person;

  return (
    <div className="flex flex-col gap-2 ">
      <span>{label}</span>
      <div className="text-right">
        {isObject && person.name && (
          <p className="font-medium text-card-foreground">{person.name}</p>
        )}
        {isObject && person.phone && <p className="text-xs">{person.phone}</p>}
        <p className="text-xs">ID: {id}</p>
      </div>
    </div>
  );
}