import { Outlet } from "react-router";
import ToggleOrderPages from "../../components/orders/Nav";

export default function OrdersLayout() {
  return (
    <div className="space-y-4">
      <ToggleOrderPages />
      <Outlet />
    </div>
  );
}