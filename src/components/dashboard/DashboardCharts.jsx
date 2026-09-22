import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { ChartCard } from "./DashboardBits";
import { useSales, useOrderStatusBreakdown, useBestSellingProducts, useNewCustomersOverTime } from "../../hooks/useDashboard";
import { ORDER_STATUS_LABELS } from "../orders/OrderStatusConfig";

const COLORS = ["#f97316", "#3b82f6", "#22c55e", "#ef4444", "#a855f7", "#eab308", "#06b6d4"];

const formatDate = (d) =>
  new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" });

export function SalesChart({ range }) {
  const { sales, isPending, error } = useSales(range);
  const data = sales.map((s) => ({ ...s, label: formatDate(s.date) }));

  return (
    <ChartCard title="Revenue over time" isPending={isPending} error={error} empty={data.length === 0}>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="label" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip
            formatter={(value, name) => [value, name === "totalRevenue" ? "Revenue (EGP)" : "Orders"]}
            labelFormatter={(label) => label}
          />
          <Legend formatter={(v) => (v === "totalRevenue" ? "Revenue" : "Orders")} />
          <Line type="monotone" dataKey="totalRevenue" stroke="#f97316" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="totalOrders" stroke="#3b82f6" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function OrderStatusChart({ range }) {
  const { statusCounts, isPending, error } = useOrderStatusBreakdown(range);
  const data = statusCounts.map((s) => ({
    status: ORDER_STATUS_LABELS[s._id] ?? s._id,
    count: s.count,
  }));

  return (
    <ChartCard title="Orders by status" isPending={isPending} error={error} empty={data.length === 0}>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ left: 2 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis type="number" fontSize={12} allowDecimals={false} />
          <YAxis type="category" dataKey="status" fontSize={12} width={110} />
          <Tooltip />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function BestSellingChart({ range }) {
  const { products, isPending, error } = useBestSellingProducts(range);
  const data = products.map((p) => ({ name: p.name, sold: p.totalQuantitySold }));

  return (
    <ChartCard title="Best-selling products" isPending={isPending} error={error} empty={data.length === 0}>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} layout="vertical" margin={{ left: 3 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis type="number" fontSize={12} allowDecimals={false} />
          <YAxis type="category" dataKey="name" fontSize={12} width={110} />
          <Tooltip formatter={(v) => [v, "Sold"]} />
          <Bar dataKey="sold" fill="#f97316" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function NewCustomersChart({ range }) {
  const { newCustomers, isPending, error } = useNewCustomersOverTime(range);
  const data = newCustomers.map((c) => ({ ...c, label: formatDate(c.date) }));

  return (
    <ChartCard title="New customers over time" isPending={isPending} error={error} empty={data.length === 0}>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="label" fontSize={12} />
          <YAxis fontSize={12} allowDecimals={false} />
          <Tooltip formatter={(v) => [v, "New customers"]} />
          <Line type="monotone" dataKey="newCustomers" stroke="#22c55e" strokeWidth={2} dot />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}