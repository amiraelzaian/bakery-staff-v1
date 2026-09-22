import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getMe, updateMe, changePassword } from "../services/profile.service";

export function useMe() {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
  });
  return { user: query.data?.data, isPending: query.isPending, error: query.error };
}

export function useUpdateMe() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload) => updateMe(payload),
    onSuccess: () => {
      toast.success("Profile updated");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutate: mutation.mutate, isPending: mutation.isPending };
}

export function useChangePassword() {
  const mutation = useMutation({
   
    mutationFn: ({ userId, payload }) => changePassword(userId, payload),
    onSuccess: () => toast.success("Password changed"),
    onError: (err) => toast.error(err.message),
  });
  return { mutate: mutation.mutate, isPending: mutation.isPending };
}