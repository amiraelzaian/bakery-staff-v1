import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductsForAdmin,
  getReviewsForProductForAdmin,
  deleteReviewForAdmin,
} from "../services/products.service";


export function useProducts({ page = 1, search = "", categoryId = "" } = {}) {
  const query = useQuery({
    queryKey: ["products", "admin", page, search, categoryId],
    queryFn: () => getProductsForAdmin({ page, search, categoryId }),
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev, // keep old page visible while next page loads
  });

  return {
    products: query.data?.data ?? [],
    pageInfo: query.data?.page ?? { currentPage: 1, limit: 20, NoOfPages: 1 },
    results: query.data?.results ?? 0,
    isPending: query.isPending,
    isFetching: query.isFetching,
    error: query.error,
  };
}

export function useProduct(productId) {
  const query = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId,
  });

  return {
    product: query.data?.data,
    isPending: query.isPending,
    error: query.error,
  };
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => createProduct(payload),
    onSuccess: () => {
      toast.success("Product created");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ productId, ...fields }) => updateProduct(productId, fields),
    onSuccess: () => {
      toast.success("Product updated");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (productId) => deleteProduct(productId),
    onSuccess: () => {
      toast.success("Product deleted");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}


export function useProductReviews({ page = 1, search = "", product = "" } = {}){
   const query = useQuery({
    queryKey: ["reviews", "admin", page, search, product],
    queryFn: () => getReviewsForProductForAdmin({ page, search, product }),
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev, 
  });

  return {
    reviews: query.data?.data ?? [],
    pageInfo: query.data?.page ?? { currentPage: 1, limit: 20, NoOfPages: 1 },
    results: query.data?.results ?? 0,
    isPending: query.isPending,
    isFetching: query.isFetching,
    error: query.error,
  };

}

export function useDeleteReview(){
   const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (reviewId) => deleteReviewForAdmin(reviewId),
    onSuccess: () => {
      toast.success("Review deleted");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };

}