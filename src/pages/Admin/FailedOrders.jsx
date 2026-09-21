import { useFailedOrders } from "../../hooks/useOrders";
import TransactionsList from "../../components/orders/TransactionsList";

export default function FailedOrders() {
  const { transactions, results, isPending, error } = useFailedOrders();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground">Failed Transactions</h1>
        <p className="text-sm text-muted-foreground">{results} failed transactions</p>
      </div>

      {isPending ? (
        <p className="py-10 text-center text-muted-foreground">Loading...</p>
      ) : error ? (
        <p className="py-10 text-center text-muted-foreground">Couldn't load failed transactions.</p>
      ) : (
        <TransactionsList transactions={transactions} emptyLabel="No failed transactions." />
      )}
    </div>
  );
}