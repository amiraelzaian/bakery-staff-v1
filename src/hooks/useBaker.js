import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getMyDeliveriesAsBaker,
  markOrderAsPreparing,
  markOrderASReady,
} from "../services/orders.service";
import { useAuthStore } from "../stores/authStore";

// List of the logged-in baker's orders
export function useBakerOrders() {
  const bakerId = useAuthStore((s) => s.user?._id);
  console.log('bakerId',bakerId)

  const query = useQuery({
    queryKey: ["baker-orders", bakerId],
    queryFn: () => getMyDeliveriesAsBaker(),
    enabled: !!bakerId, 
  });

  // TanStack Query v5 has no onError on useQuery
  useEffect(() => {
    if (query.error) toast.error("Couldn't load your orders");
  }, [query.error]);

  console.log(query.status, query.fetchStatus, query.error?.message);
  return {
    orders: query.data?.data??[], 
    isPending: query.isPending,
    error: query.error,
    refetch: query.refetch,
  };
}



// Shared logic for both status buttons.

function useOrderStatusChange(serviceFn, successMessage) {
  const queryClient = useQueryClient();
  const bakerId = useAuthStore((s) => s.user?._id);

  const mutation = useMutation({
    mutationFn: (orderId) => serviceFn(bakerId, orderId),
    onSuccess: () => {
      toast.success(successMessage);
      queryClient.invalidateQueries({ queryKey: ["baker-orders"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    pendingOrderId: mutation.variables, // which order is being saved right now
    error: mutation.error,
  };
}


export function useMarkOrderPreparing() {
  return useOrderStatusChange(markOrderAsPreparing, "Order marked as preparing");
}


export function useMarkOrderReady() {
  return useOrderStatusChange(markOrderASReady, "Order marked as ready");
}