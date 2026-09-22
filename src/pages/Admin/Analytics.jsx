import { useState } from "react";
import { RangeToggle, StatCard } from "../../components/dashboard/DashboardBits";
import {
  SalesChart,
  OrderStatusChart,
  BestSellingChart,
  NewCustomersChart,
} from "../../components/dashboard/DashboardCharts";
import { ActiveOffersList, TopRatedProductsList } from "../../components/dashboard/DashbaordLists";
import { useRevenue, useAverageOrderValue, useActiveOffers } from "../../hooks/useDashboard";

export default function Analytics() {
  const [range, setRange] = useState("week");

  const { revenue } = useRevenue(range);
  const { averageOrderValue } = useAverageOrderValue(range);
  const { offersCount } = useActiveOffers();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-foreground">Analytics</h1>
        <RangeToggle range={range} onChange={setRange} />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Revenue" value={`${revenue.totalRevenue} EGP`} />
        <StatCard label="Orders" value={revenue.totalOrders} />
        <StatCard label="Avg. order value" value={`${averageOrderValue.averageValue} EGP`} />
        <StatCard label="Active offers" value={offersCount} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SalesChart range={range} />
        <OrderStatusChart range={range} />
        <BestSellingChart range={range} />
        <NewCustomersChart range={range} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ActiveOffersList />
        <TopRatedProductsList />
      </div>
    </div>
  );
}