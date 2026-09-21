import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} from "../services/users.service";

export function useUsers({ page = 1, search = "", role = "" } = {}) {
  const query = useQuery({
    queryKey: ["users", page, search, role],
    queryFn: () => getAllUsers({ page, search, role }),
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });

  return {
    users: query.data?.data ?? [],
    pageInfo: query.data?.page ?? { currentPage: 1, limit: 20, NoOfPages: 1 },
    results: query.data?.results ?? 0,
    isPending: query.isPending,
    error: query.error,
  };
}

export function useUser(userId) {
  const query = useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });

  return {
    user: query.data?.data,
    isPending: query.isPending,
    error: query.error,
  };
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload) => createUser(payload),
    onSuccess: () => {
      toast.success("User created");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate: mutation.mutate, isPending: mutation.isPending, error: mutation.error };
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ userId, ...fields }) => updateUser(userId, fields),
    onSuccess: () => {
      toast.success("User updated");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate: mutation.mutate, isPending: mutation.isPending, error: mutation.error };
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (userId) => deleteUser(userId),
    onSuccess: () => {
      toast.success("User deleted");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate: mutation.mutate, isPending: mutation.isPending, error: mutation.error };
}