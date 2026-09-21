function formatAmount(amount) {
  return `${amount} EGP`;
}

export default function TransactionsList({ transactions, emptyLabel }) {
  if (transactions.length === 0) {
    return <p className="py-10 text-center text-muted-foreground">{emptyLabel}</p>;
  }

  return (
    <div className="space-y-3">
      {transactions.map((tx) => (
        <div key={tx._id} className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-medium text-card-foreground">{tx.transactionId}</p>
              <p className="text-xs text-muted-foreground">{tx.merchantOrderId}</p>
            </div>
            <span className="font-semibold text-card-foreground">{formatAmount(tx.amount)}</span>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">{tx.reason}</p>

          <p className="mt-2 text-xs text-muted-foreground">
            {new Date(tx.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}