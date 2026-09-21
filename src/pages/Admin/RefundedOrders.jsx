import { useRefundedOrders } from "../../hooks/useOrders";
import TransactionsList from "../../components/orders/TransactionsList";

export default function RefundedOrders() {
  const { transactions, results, isPending, error } = useRefundedOrders();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground">Refunded Transactions</h1>
        <p className="text-sm text-muted-foreground">{results} refunded transactions</p>
      </div>

      {isPending ? (
        <p className="py-10 text-center text-muted-foreground">Loading...</p>
      ) : error ? (
        <p className="py-10 text-center text-muted-foreground">Couldn't load refunded transactions.</p>
      ) : (
        <TransactionsList transactions={transactions} emptyLabel="No refunded transactions." />
      )}
    </div>
  );
}