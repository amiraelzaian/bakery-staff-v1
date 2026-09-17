import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

type Role = "ADMIN" | "BAKER" | "DELIVERY";

type ProtectedRouteProps = {
  allowedRoles: Role[];
};

export default function ProtectedRoute({
  allowedRoles,
}: ProtectedRouteProps) {
  const { user } = useAuthStore();

  // User is not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User is logged in but doesn't have permission
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // User is logged in and has the correct role
  return <Outlet />;
}