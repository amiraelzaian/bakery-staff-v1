import { Outlet } from "react-router";
import {
  LayoutDashboard, Package, Tags, UserCog,
  TicketPercent, Sparkles, BarChart3, ScrollText,
} from "lucide-react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { useState } from "react";

const ADMIN_NAV = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", to: "/admin/products", icon: Package },
  { label: "Categories", to: "/admin/categories", icon: Tags },
  { label: "Employees", to: "/admin/employees", icon: UserCog },
  { label: "Coupons", to: "/admin/coupons", icon: TicketPercent },
  { label: "Offers", to: "/admin/seasonal-offers", icon: Sparkles },
  { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
  { label: "Audit Logs", to: "/admin/audit-logs", icon: ScrollText },
];

export default function AdminLayout() {
 

  return (
    <div className="flex h-screen bg-background">
      <SideBar links={ADMIN_NAV} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header  />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}