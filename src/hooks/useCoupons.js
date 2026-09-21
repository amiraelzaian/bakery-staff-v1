import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
} from "../services/coupons.service";

export function useCoupons({ page = 1 } = {}) {
  const query = useQuery({
    queryKey: ["coupons", "list", page],
    queryFn: () => getCoupons({ page }),
    staleTime: 2 * 60 * 1000,
    placeholderData: (prev) => prev,
  });

  return {
    coupons: query.data?.data ?? [],
    pageInfo: query.data?.page ?? { currentPage: 1, limit: 20, NoOfPages: 1 },
    results: query.data?.results ?? 0,
    isPending: query.isPending,
    error: query.error,
  };
}


export function useCoupon(couponId) {
  const query = useQuery({
    queryKey: ["coupons", "detail", couponId],
    queryFn: () => getCoupon(couponId),
    enabled: !!couponId,
  });

  return {
    coupon: query.data?.data,
    isPending: query.isPending,
    error: query.error,
  };
}


export function useCreateCoupon() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (coupon) => createCoupon(coupon), // { name, expire, discount }
    onSuccess: () => {
      toast.success("Coupon created");
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate: mutation.mutate, isPending: mutation.isPending, error: mutation.error };
}



export function useUpdateCoupon() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ couponId, payload }) => updateCoupon(couponId, payload),
    onSuccess: () => {
      toast.success("Coupon updated");
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate: mutation.mutate, isPending: mutation.isPending, error: mutation.error };
}



export function useDeleteCoupon() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (couponId) => deleteCoupon(couponId),
    onSuccess: () => {
      toast.success("Coupon deleted");
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate: mutation.mutate, isPending: mutation.isPending, error: mutation.error };
}