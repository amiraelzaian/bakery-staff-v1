import { Pencil, Trash2 } from "lucide-react";

function StatusBadge({ expired }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        expired ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
      }`}
    >
      {expired ? "Expired" : "Active"}
    </span>
  );
}

function RowActions({ coupon, onEdit, onDelete }) {
  return (
    <div className="flex gap-1">
      <button
        onClick={() => onEdit(coupon)}
        aria-label={`Edit ${coupon.name}`}
        className="cursor-pointer rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
      >
        <Pencil size={16} />
      </button>
      <button
        onClick={() => onDelete(coupon)}
        aria-label={`Delete ${coupon.name}`}
        className="cursor-pointer rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-red-600"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export default function CouponsTable({ coupons, onEdit, onDelete }) {
  const now = new Date();

  return (
    <>
      {/* Mobile: cards */}
      <div className="space-y-3 md:hidden">
       {coupons.map((c) => {
            const expired = new Date(c.expire) < now;
            return (
                <div key={c._id} className="rounded-2xl border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                    <p className="truncate font-semibold text-card-foreground">{c.name}</p>
                    <p className="text-sm text-muted-foreground">{c.discount}% off</p>
                    </div>
                    <StatusBadge expired={expired} />
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                    <span className="text-xs text-muted-foreground">
                    Expires {new Date(c.expire).toLocaleDateString()}
                    </span>
                    <RowActions coupon={c} onEdit={onEdit} onDelete={onDelete} />
                </div>
                </div>
            );
            })}
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-border bg-card md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="px-4 py-3 font-medium">Code</th>
              <th className="px-4 py-3 font-medium">Discount</th>
              <th className="px-4 py-3 font-medium">Expires</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {coupons.map((c) => {
              const expired = new Date(c.expire) < now;
              return (
                <tr key={c._id}>
                  <td className="px-4 py-3 font-semibold text-card-foreground">
                    {c.name}
                  </td>
                  <td className="px-4 py-3 text-card-foreground">{c.discount}%</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(c.expire).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge expired={expired} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <RowActions coupon={c} onEdit={onEdit} onDelete={onDelete} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}