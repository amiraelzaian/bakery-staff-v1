import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getDeliveries, markOrderAsDelivered } from "../services/delivery.service";
import { useAuthStore } from "../stores/authStore";

export function useDeliveries() {
  const deliveryId = useAuthStore((s) => s.user?._id);

  const query = useQuery({
    queryKey: ["deliveries", deliveryId],
    queryFn: () => getDeliveries(),
    enabled: !!deliveryId,
  });

  useEffect(() => {
    if (query.error) toast.error("Couldn't load your deliveries");
  }, [query.error]);

  return {
    deliveries: query.data?.data ?? [],
    isPending: query.isPending,
    error: query.error,
    refetch: query.refetch,
  };
}

export function useMarkOrderAsDelivered() {
  const deliveryId = useAuthStore((s) => s.user?._id);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (orderId) => markOrderAsDelivered(orderId, deliveryId),
    onSuccess: () => {
      toast.success("Order marked as delivered");
      queryClient.invalidateQueries({ queryKey: ["deliveries"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    pendingOrderId: mutation.variables,
    error: mutation.error,
  };
}