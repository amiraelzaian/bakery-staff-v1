import { useState } from "react";
import { useOrders } from "../../hooks/useOrders";
import OrdersTable from "../../components/orders/OrdersTable";
import { ORDER_STATUS_TABS } from "../../components/orders/OrderStatusConfig";
import SearchInput from "../../components/common/SearchInput";
import Pagination from "../../components/common/Pagination";
import { useDebounce } from "../../hooks/useDebounce";

export default function Orders() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const debouncedSearch = useDebounce(search.trim());

  const { orders, pageInfo, results, isPending, error } = useOrders({
    page,
    orderId: debouncedSearch,
    status,
  });

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setPage(1);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground">Orders</h1>
        <p className="text-sm text-muted-foreground">{results} total orders</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {ORDER_STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleStatusChange(tab.value)}
              className={`cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium transition ${
                status === tab.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="sm:w-64">
          <SearchInput
            value={search}
            onChange={handleSearch}
            placeholder="Search by order ID..."
          />
        </div>
      </div>

      {isPending ? (
        <p className="py-10 text-center text-muted-foreground">Loading orders...</p>
      ) : error ? (
        <p className="py-10 text-center text-muted-foreground">Couldn't load orders.</p>
      ) : (
        <>
          <OrdersTable orders={orders} />
          <Pagination pageInfo={pageInfo} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}