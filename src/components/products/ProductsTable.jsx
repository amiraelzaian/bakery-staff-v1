import { Pencil, Trash2 } from "lucide-react";
import ProductImage from "./ProductImage";
import StatusBadge from "../common/StatusBadge";
import { getDisplayPrice } from "./priceHelper";

export default function ProductsTable({ products, onEdit, onDelete, deletingId }) {
  if (products.length === 0) {
    return <p className="py-10 text-center text-muted-foreground">No products found.</p>;
  }

  return (
    <>
      {/* Mobile: stacked cards */}
      <div className="space-y-3 md:hidden">
        {products.map((product) => (
          <div key={product._id} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <ProductImage src={product.imageUrl} alt={product.name} />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate font-medium text-card-foreground">{product.name}</p>
                  <StatusBadge active={product.isAvailable} activeLabel="Available" inactiveLabel="Unavailable" />
                </div>
                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                  {product.description}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                  <span className="font-medium text-card-foreground">{getDisplayPrice(product)}</span>
                  <span>Stock: {product.stockQuantity}</span>
                  {product.categoryId?.name && <span>{product.categoryId.name}</span>}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <span className="text-xs text-muted-foreground">
                Sold {product.soldQuantity ?? 0}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => onEdit(product)}
                  aria-label="Edit product"
                  className="cursor-pointer rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => onDelete(product._id)}
                  disabled={deletingId === product._id}
                  aria-label="Delete product"
                  className="cursor-pointer rounded-lg p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-border bg-card md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <ProductImage src={product.imageUrl} alt={product.name} />
                    <div>
                      <p className="font-medium text-card-foreground">{product.name}</p>
                      <p className="line-clamp-1 text-xs text-muted-foreground">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {product.categoryId?.name ?? "—"}
                </td>
                <td className="px-4 py-3 font-medium text-card-foreground">
                  {getDisplayPrice(product)}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{product.stockQuantity}</td>
                <td className="px-4 py-3">
                  <StatusBadge active={product.isAvailable} activeLabel="Available" inactiveLabel="Unavailable" />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      aria-label="Edit product"
                      className="cursor-pointer rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(product._id)}
                      disabled={deletingId === product._id}
                      aria-label="Delete product"
                      className="cursor-pointer rounded-lg p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                    </button>
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