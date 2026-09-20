import { useMemo, useState } from "react";
import { useDeliveries, useMarkOrderAsDelivered } from "../../hooks/useDelivery";
import DeliveryCard from "../../components/deliveries/DeliveryCard";
import DeliveryFilterTabs from "../../components/deliveries/DeliveryFilterTabs";

export default function Deliveries() {
  const { deliveries, isPending, error, refetch } = useDeliveries();
  const [filter, setFilter] = useState("all");

  const {
    mutate: markDelivered,
    isPending: deliveredPending,
    pendingOrderId: deliveredId,
  } = useMarkOrderAsDelivered();

  const counts = useMemo(() => {
    return deliveries.reduce(
      (acc, order) => {
        acc.all += 1;
        acc[order.status] = (acc[order.status] ?? 0) + 1;
        return acc;
      },
      { all: 0 }
    );
  }, [deliveries]);

  const filteredDeliveries = useMemo(() => {
    if (filter === "all") return deliveries;
    return deliveries.filter((order) => order.status === filter);
  }, [deliveries, filter]);

  if (isPending) {
    return <p className="py-10 text-center text-muted-foreground">Loading deliveries...</p>;
  }

  if (error) {
    return (
      <div className="py-10 text-center">
        <p className="text-muted-foreground">Couldn't load your deliveries.</p>
        <button
          onClick={() => refetch()}
          className="mt-2 cursor-pointer text-sm font-medium text-primary hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">My Deliveries</h1>
        <span className="text-sm text-muted-foreground">
          {counts.all} active deliver{counts.all !== 1 ? "ies" : "y"}
        </span>
      </div>


      <DeliveryFilterTabs active={filter} onChange={setFilter} counts={counts} />

      {filteredDeliveries.length === 0 ? (
        <p className="py-10 text-center text-muted-foreground">No deliveries here yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDeliveries.map((order) => (
            <DeliveryCard
              key={order._id}
              order={order}
              onMarkDelivered={markDelivered}
              deliveredPending={deliveredPending && deliveredId === order._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}