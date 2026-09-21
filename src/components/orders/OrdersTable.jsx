import { useNavigate } from "react-router";
import OrderStatusBadge from "./OrderStatusBadge";

function itemsSummary(cartItems) {
  const first = cartItems[0];
  const extra = cartItems.length - 1;
  return `${first.quantity}× ${first.name}${extra > 0 ? ` +${extra} more` : ""}`;
}

export default function OrdersTable({ orders }) {
  const navigate = useNavigate();

  if (orders.length === 0) {
    return <p className="py-10 text-center text-muted-foreground">No orders found.</p>;
  }

  return (
    <>
      {/* Mobile: stacked cards */}
      <div className="space-y-3 md:hidden">
        {orders.map((order) => (
          <div
            key={order._id}
          
            className="w-full  rounded-2xl border border-border bg-card p-4 text-left"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium text-muted-foreground">
                #{order._id}
              </p>
              <OrderStatusBadge status={order.status} />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{itemsSummary(order.cartItems)}</p>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span className="capitalize">{order.deliveryMethod}</span>
              <span className="font-medium text-card-foreground">{order.totalOrderPrice} EGP</span>
            </div>
            <button className="text-xs text-secondary cursor-pointer"   onClick={() => navigate(`/admin/orders/${order._id}`)}>View details</button>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-border bg-card md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Items</th>
              <th className="px-4 py-3 font-medium">Method</th>
              <th className="px-4 py-3 font-medium">Payment</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <tr
                key={order._id}
                onClick={() => navigate(`/admin/orders/${order._id}`)}
                className="cursor-pointer hover:bg-muted/50"
              >
                <td className="px-4 py-3 font-medium text-card-foreground">
                  #{order._id.slice(-6).toUpperCase()}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{itemsSummary(order.cartItems)}</td>
                <td className="px-4 py-3 capitalize text-muted-foreground">{order.deliveryMethod}</td>
                <td className="px-4 py-3 capitalize text-muted-foreground">
                  {order.paymentMethod} · {order.paymentStatus}
                </td>
                <td className="px-4 py-3 font-medium text-card-foreground">
                  {order.totalOrderPrice} EGP
                </td>
                <td className="px-4 py-3">
                  <OrderStatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}