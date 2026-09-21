import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createOffer, deleteOffer, getOffer, getOffers, updateOffer } from "../services/offers.service";


export function useOffers({ page = 1 } = {}) {
  const query = useQuery({
    queryKey: ["offers", "list", page],
    queryFn: () => getOffers({ page }),
    staleTime: 2 * 60 * 1000,
    placeholderData: (prev) => prev,
  });

  return {
    offers: query.data?.data ?? [],
    pageInfo: query.data?.page ?? { currentPage: 1, limit: 20, NoOfPages: 1 },
    results: query.data?.results ?? 0,
    isPending: query.isPending,
    error: query.error,
  };
}


export function useOffer(offerId) {
  const query = useQuery({
    queryKey: ["offers", "detail", offerId],
    queryFn: () => getOffer(offerId),
    enabled: !!offerId,
  });

  return {
    offer: query.data?.data,
    isPending: query.isPending,
    error: query.error,
  };
}


export function useCreateOffer() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (offer) => createOffer(offer), // { name, description, discountPercentage,startDate, endDate, products=[] || categoryId }
    onSuccess: () => {
      toast.success("Offer created");
      queryClient.invalidateQueries({ queryKey: ["offers"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate: mutation.mutate, isPending: mutation.isPending, error: mutation.error };
}



export function useUpdateOffer() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ offerId, payload }) => updateOffer(offerId, payload),
    onSuccess: () => {
      toast.success("Offer updated");
      queryClient.invalidateQueries({ queryKey: ["offers"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate: mutation.mutate, isPending: mutation.isPending, error: mutation.error };
}



export function useDeleteOffer() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (offerId) => deleteOffer(offerId),
    onSuccess: () => {
      toast.success("Offer deleted");
      queryClient.invalidateQueries({ queryKey: ["offers"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate: mutation.mutate, isPending: mutation.isPending, error: mutation.error };
}