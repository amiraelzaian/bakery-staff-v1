import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

function OfferStatus({ offer }) {
  const now = new Date();
  const start = new Date(offer.startDate);
  const end = new Date(offer.endDate);

  let label = "Active";
  let cls = "bg-green-100 text-green-700";
  if (now < start) {
    label = "Upcoming";
    cls = "bg-blue-100 text-blue-700";
  } else if (now > end) {
    label = "Ended";
    cls = "bg-red-100 text-red-700";
  } else if (!offer.isActive) {
    label = "Inactive";
    cls = "bg-secondary text-secondary-foreground";
  }

  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${cls}`}>
      {label}
    </span>
  );
}

function ScopeText({ offer }) {
  if (offer.category) return "1 category";
  return `${offer.products?.length ?? 0} product${offer.products?.length === 1 ? "" : "s"}`;
}

function RowActions({ offer, onEdit, onDelete }) {
  return (
    <div className="flex gap-1">
      <button
        onClick={() => onEdit(offer)}
        aria-label={`Edit ${offer.name}`}
        className="cursor-pointer rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
      >
        <Pencil size={16} />
      </button>
      <button
        onClick={() => onDelete(offer)}
        aria-label={`Delete ${offer.name}`}
        className="cursor-pointer rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-red-600"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export default function OffersList({ offers, onEdit, onDelete }) {
    const navigate=useNavigate();
  return (
    <>
      {/* Mobile: cards */}
      <div className="space-y-3 md:hidden">
        {offers.map((o) => (
          <div key={o._id} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex flex-col items-start">
                <p className="truncate font-semibold text-card-foreground">{o.name}</p>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {o.description}
                </p>
              <button className="text-xs text-secondary cursor-pointer" onClick={()=>navigate(`/admin/seasonal-offers/${o._id}`)}>View details</button>
              </div>
              <OfferStatus offer={o} />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="font-medium text-card-foreground">
                {o.discountPercentage}% off
              </span>
              <span>·</span>
              <span><ScopeText offer={o} /></span>
              <span>·</span>
              <span>
                {new Date(o.startDate).toLocaleDateString()} –{" "}
                {new Date(o.endDate).toLocaleDateString()}
              </span>
            </div>

            <div className="mt-3 flex justify-end border-t border-border pt-3">
              <RowActions offer={o} onEdit={onEdit} onDelete={onDelete} />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-border bg-card md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="px-4 py-3 font-medium">Offer</th>
              <th className="px-4 py-3 font-medium">Discount</th>
              <th className="px-4 py-3 font-medium">Applies to</th>
              <th className="px-4 py-3 font-medium">Dates</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {offers.map((o) => (
              <tr key={o._id}>
                <td className="max-w-[220px] px-4 py-3">
                  <p className="truncate font-semibold text-card-foreground">{o.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{o.description}</p>
             <button className="text-xs text-secondary cursor-pointer" onClick={()=>navigate(`/admin/seasonal-offers/${o._id}`)}>View details</button>

                </td>
                <td className="px-4 py-3 text-card-foreground">{o.discountPercentage}%</td>
                <td className="px-4 py-3 text-muted-foreground"><ScopeText offer={o} /></td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(o.startDate).toLocaleDateString()} –{" "}
                  {new Date(o.endDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <OfferStatus offer={o} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    <RowActions offer={o} onEdit={onEdit} onDelete={onDelete} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}