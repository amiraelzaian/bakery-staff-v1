import { useQuery } from "@tanstack/react-query";
import { getDeliveries } from "../services/delivery.service"; 

export function useDeliveryStats() {
  const query = useQuery({
    queryKey: ["orders", "delivery", "stats"],
    queryFn: getDeliveries,
    staleTime: 2 * 60 * 1000,
  });

  const orders = query.data?.data ?? [];

  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const completedThisWeek = orders.filter(
    (o) => o.status === "delivered" && new Date(o.deliveredAt ?? o.updatedAt) >= startOfWeek
  ).length;

  const currentlyAssigned = orders.filter((o) =>
    ["out_for_delivery"].includes(o.status)
  ).length;

  return {
    completedThisWeek,
    currentlyAssigned,
    isPending: query.isPending,
    error: query.error,
  };
}