


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getAllOrders,
  getOrder,
  acceptOrder,
  assignOrderToDelivery,
  markOrderAsPickedUp,
  getRefundedOrders,
  getFailedOrders,
} from "../services/orders.service";

export function useOrders({ page = 1, orderId = "", status = "" } = {}) {
  const query = useQuery({
    queryKey: ["orders", "admin", page, orderId, status],
    queryFn: () => getAllOrders({ page, orderId, status }),
    placeholderData: (prev) => prev,
    retry: false,
    staleTime: 2 * 60 * 1000,
  });

  return {
    orders: query.data?.data ?? [],
    pageInfo: query.data?.page ?? { currentPage: 1, limit: 20, NoOfPages: 1 },
    results: query.data?.results ?? 0,
    isPending: query.isPending,
    error: query.error,
  };
}

export function useOrder(orderId) {
  const query = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getOrder(orderId),
    enabled: !!orderId,
    
  });

  return {
    order: query.data?.data,
    isPending: query.isPending,
    error: query.error,
  };
}

export function useAcceptOrder() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ orderId, bakerId }) => acceptOrder(orderId, bakerId),
    onSuccess: () => {
      toast.success("Order accepted");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate: mutation.mutate, isPending: mutation.isPending, error: mutation.error };
}

export function useAssignOrderToDelivery() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ orderId, deliveryId }) => assignOrderToDelivery(orderId, deliveryId),
    onSuccess: () => {
      toast.success("Order assigned to delivery");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate: mutation.mutate, isPending: mutation.isPending, error: mutation.error };
}

export function useMarkOrderAsPickedUp() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (orderId) => markOrderAsPickedUp(orderId),
    onSuccess: () => {
      toast.success("Order marked as picked up");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate: mutation.mutate, isPending: mutation.isPending, error: mutation.error };
}

export function useRefundedOrders() {
  const query = useQuery({
    queryKey: ["orders", "refunded"],
    queryFn: getRefundedOrders,
    staleTime: 2 * 60 * 1000,
  });

  return {
    transactions: query.data?.data ?? [],
    results: query.data?.results ?? 0,
    isPending: query.isPending,
    error: query.error,
  };
}

export function useFailedOrders() {
  const query = useQuery({
    queryKey: ["orders", "failed"],
    queryFn: getFailedOrders,
    staleTime: 2 * 60 * 1000,
  });

  return {
    transactions: query.data?.data ?? [],
    results: query.data?.results ?? 0,
    isPending: query.isPending,
    error: query.error,
  };
}