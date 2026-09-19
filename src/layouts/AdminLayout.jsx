import { Outlet } from "react-router";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tags,
  UserCog,
  TicketPercent,
  BarChart3,
  ScrollText,
  HandCoins,
} from "lucide-react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useState } from "react";

// every `to` must match a <Route path> in AppRoutes exactly
const ADMIN_NAV = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Orders", to: "/admin/orders", icon: ShoppingCart },
  { label: "Products", to: "/admin/products", icon: Package },
  { label: "Categories", to: "/admin/categories", icon: Tags },
  { label: "Employees", to: "/admin/employees", icon: UserCog },
  { label: "Coupons", to: "/admin/coupons", icon: TicketPercent },
  { label: "Offers", to: "/admin/seasonal-offers", icon: HandCoins },
  { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
  { label: "Audit Logs", to: "/admin/audit-logs", icon: ScrollText },
];

export default function AdminLayout() {
   const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex h-screen bg-background">
      {/* Admin only: owns its own open/closed state */}
      <SideBar links={ADMIN_NAV} expanded={expanded} setExpanded={setExpanded}/>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* no links: admin navigates with the sidebar */}
        <Header  expanded={expanded}/>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}