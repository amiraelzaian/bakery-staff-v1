import { useQuery } from "@tanstack/react-query";
import { getMyDeliveriesAsBaker } from "../services/orders.service";

export function useBakerStats() {
  const query = useQuery({
    queryKey: ["orders", "baker", "stats"],
    queryFn: getMyDeliveriesAsBaker,
    staleTime: 2 * 60 * 1000,
  });

  const orders = query.data?.data ?? [];

  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const acceptedThisWeek = orders.filter(
    (o) => o.status !== "pending" && new Date(o.updatedAt) >= startOfWeek
  ).length;

  const currentlyAssigned = orders.filter((o) =>
    ["accepted", "preparing", "ready"].includes(o.status)
  ).length;

  return {
    acceptedThisWeek,
    currentlyAssigned,
    isPending: query.isPending,
    error: query.error,
  };
}