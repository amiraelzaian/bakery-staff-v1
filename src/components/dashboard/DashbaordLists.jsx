import { useActiveOffers, useTopRatedProducts } from "../../hooks/useDashboard";

export function ActiveOffersList() {
  const { offers, offersCount, isPending, error } = useActiveOffers();

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <h3 className="mb-3 font-semibold text-card-foreground">
        Active offers {offersCount ? `(${offersCount})` : ""}
      </h3>
      {isPending ? (
        <p className="py-6 text-center text-sm text-muted-foreground">Loading...</p>
      ) : error ? (
        <p className="py-6 text-center text-sm text-muted-foreground">Couldn't load offers.</p>
      ) : offers.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">No active offers.</p>
      ) : (
        <ul className="divide-y divide-border">
          {offers.map((o) => (
            <li key={o.name} className="flex items-center justify-between py-2 text-sm">
              <div>
                <p className="font-medium text-card-foreground">{o.name}</p>
                <p className="text-xs text-muted-foreground">
                  Ends {new Date(o.endDate).toLocaleDateString()}
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                {o.discountPercentage}% off
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function TopRatedProductsList() {
  const { products, isPending, error } = useTopRatedProducts();

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <h3 className="mb-3 font-semibold text-card-foreground">Top rated products</h3>
      {isPending ? (
        <p className="py-6 text-center text-sm text-muted-foreground">Loading...</p>
      ) : error ? (
        <p className="py-6 text-center text-sm text-muted-foreground">Couldn't load products.</p>
      ) : products.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">No rated products yet.</p>
      ) : (
        <ul className="divide-y divide-border">
          {products.map((p) => (
            <li key={p._id} className="flex items-center justify-between py-2 text-sm">
              <span className="text-card-foreground">{p.name}</span>
              <span className="text-muted-foreground">
                ★ {p.averageRating} · {p.totalReviews} review{p.totalReviews === 1 ? "" : "s"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}