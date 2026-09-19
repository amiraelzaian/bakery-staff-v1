import { useMemo, useState } from "react";
import {
  useBakerOrders,
  useMarkOrderPreparing,
  useMarkOrderReady,
} from "../../hooks/useBaker";
import OrderCard from "../../components/orders/OrderCard";
import StatusFilterTabs from "../../components/orders/StatusFilterTabs";

export default function Orders() {
  const { orders, isPending, error, refetch } = useBakerOrders();
  const [filter, setFilter] = useState("all");

  const {
    mutate: startPreparing,
    isPending: preparingPending,
    pendingOrderId: preparingId,
  } = useMarkOrderPreparing();
  const {
    mutate: markReady,
    isPending: readyPending,
    pendingOrderId: readyId,
  } = useMarkOrderReady();

  // to get how many on each status
  const counts = useMemo(() => {
    return orders.reduce(
      (acc, order) => {
        acc.all += 1;
        acc[order.status] = (acc[order.status] ?? 0) + 1;
        return acc;
      },
      { all: 0 }
    );
  }, [orders]);



  const filteredOrders = useMemo(() => {
    if (filter === "all") return orders;
    return orders.filter((order) => order.status === filter);
  }, [orders, filter]);

  if (isPending) {
    return <p className="py-10 text-center text-stone-500">Loading orders...</p>;
  }

  if (error) {
    return (
      <div className="py-10 text-center">
        <p className="text-stone-500">Couldn't load your orders.</p>
        <button
          onClick={() => refetch()}
          className="mt-2 text-sm font-medium text-amber-700 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold ">My Orders</h1>
        <span className="text-sm text-secondary">
          {counts.all} active order{counts.all !== 1 ? "s" : ""}
        </span>
      </div>

      <StatusFilterTabs active={filter} onChange={setFilter} counts={counts} />

      {filteredOrders.length === 0 ? (
        <p className="py-10 text-center text-accent">No orders here yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onStartPreparing={startPreparing}
              onMarkReady={markReady}
              preparingPending={preparingPending && preparingId === order._id}
              readyPending={readyPending && readyId === order._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}