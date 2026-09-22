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
import { useRef, useState } from "react";
import { ScrollToTop } from "../components/common/ScrollToTop";

const ADMIN_NAV = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Orders", to: "/admin/orders", icon: ShoppingCart },
  { label: "Products", to: "/admin/products", icon: Package },
  { label: "Categories", to: "/admin/categories", icon: Tags },
  { label: "Users", to: "/admin/users", icon: UserCog },
  { label: "Coupons", to: "/admin/coupons", icon: TicketPercent },
  { label: "Offers", to: "/admin/seasonal-offers", icon: HandCoins },
  { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
  { label: "Audit Logs", to: "/admin/audit-logs", icon: ScrollText },
];

export default function AdminLayout() {
   const [expanded, setExpanded] = useState(false);
     const scrollRef = useRef(null);

 return (
    <div className="flex h-screen bg-background custom-scrollbar">
      <SideBar links={ADMIN_NAV} expanded={expanded} setExpanded={setExpanded} />
      <div className="relative flex min-w-0 flex-1 flex-col">
        <Header expanded={expanded} />
        <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
        <ScrollToTop containerRef={scrollRef} />
      </div>
    </div>
  );
}