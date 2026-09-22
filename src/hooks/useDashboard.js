import { useQuery } from "@tanstack/react-query";
import {
  getRevenue,
  getSales,
  getBestSellingProducts,
  getOrderStatusBreakdown,
  getAverageOrderValue,
  getNewCustomersOverTime,
  getActiveOffers,
  getTopRatedProducts,
} from "../services/dashboard.service";

const STALE_TIME = 2 * 60 * 1000;

export function useRevenue(range) {
  const query = useQuery({
    queryKey: ["dashboard", "revenue", range],
    queryFn: () => getRevenue({ range }),
    staleTime: STALE_TIME,
  });
  return {
    revenue: query.data?.data ?? { totalRevenue: 0, totalOrders: 0 },
    isPending: query.isPending,
    error: query.error,
  };
}

export function useSales(range) {
  const query = useQuery({
    queryKey: ["dashboard", "sales", range],
    queryFn: () => getSales({ range }),
    staleTime: STALE_TIME,
  });
  return { sales: query.data?.data ?? [], isPending: query.isPending, error: query.error };
}

export function useBestSellingProducts(range) {
  const query = useQuery({
    queryKey: ["dashboard", "best-selling", range],
    queryFn: () => getBestSellingProducts({ range }),
    staleTime: STALE_TIME,
  });
  return { products: query.data?.data ?? [], isPending: query.isPending, error: query.error };
}

export function useOrderStatusBreakdown(range) {
  const query = useQuery({
    queryKey: ["dashboard", "order-status", range],
    queryFn: () => getOrderStatusBreakdown({ range }),
    staleTime: STALE_TIME,
  });
  return {
    statusCounts: query.data?.data ?? [],
    isPending: query.isPending,
    error: query.error,
  };
}

export function useAverageOrderValue(range) {
  const query = useQuery({
    queryKey: ["dashboard", "avg-order-value", range],
    queryFn: () => getAverageOrderValue({ range }),
    staleTime: STALE_TIME,
  });
  return {
    averageOrderValue: query.data?.data ?? { averageValue: 0, totalOrders: 0 },
    isPending: query.isPending,
    error: query.error,
  };
}

export function useNewCustomersOverTime(range) {
  const query = useQuery({
    queryKey: ["dashboard", "new-customers", range],
    queryFn: () => getNewCustomersOverTime({ range }),
    staleTime: STALE_TIME,
  });
  return {
    newCustomers: query.data?.data ?? [],
    isPending: query.isPending,
    error: query.error,
  };
}

export function useActiveOffers() {
  const query = useQuery({
    queryKey: ["dashboard", "active-offers"],
    queryFn: getActiveOffers,
    staleTime: STALE_TIME,
  });
  return {
    offersCount: query.data?.data?.count ?? 0,
    offers: query.data?.data?.offers ?? [],
    isPending: query.isPending,
    error: query.error,
  };
}

export function useTopRatedProducts() {
  const query = useQuery({
    queryKey: ["dashboard", "top-rated-products"],
    queryFn: getTopRatedProducts,
    staleTime: STALE_TIME,
  });
  return { products: query.data?.data ?? [], isPending: query.isPending, error: query.error };
}