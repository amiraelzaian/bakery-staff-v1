import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getCategoriesForAdmin,
} from "../services/categories.service";




export function useCategories({page=1,search=""}={}) {
  const query = useQuery({
    queryKey: ["categories",'admin',page,search],
    queryFn:()=> getCategoriesForAdmin({page,search}),
    staleTime: 5 * 60 * 1000,
    placeholderData:(prev)=>prev,
  });

  return {
    categories: query.data?.data ?? [],
    pageInfo: query.data?.page ?? { currentPage: 1, limit: 20, NoOfPages: 1 },
    results: query.data?.results ?? 0,
    isPending: query.isPending,
    isFetching: query.isFetching,
    error: query.error,
}
}



export function useCategory(catId) {
  const query = useQuery({
    queryKey: ["categories", catId],
    queryFn: () => getCategory(catId),
    enabled: !!catId,
  });

  return {
    category: query.data?.data,
    isPending: query.isPending,
    error: query.error,
  };
}



export function useCreateCategory() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => createCategory(payload), // { categoryImage, name, description }
    onSuccess: () => {
      toast.success("Category created");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}



export function useUpdateCategory() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ catId, ...fields }) => updateCategory(catId, fields),
    onSuccess: () => {
      toast.success("Category updated");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}




export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (catId) => deleteCategory(catId),
    onSuccess: () => {
      toast.success("Category deleted");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    mutate: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}