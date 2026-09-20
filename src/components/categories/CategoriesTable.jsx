import { Link } from "react-router";
import { Pencil, Trash2 } from "lucide-react";
import CategoryImage from "./CategoryImage";
import StatusBadge from "../common/StatusBadge";

export default function CategoriesTable({ categories, onEdit, onDelete, deletingId }) {
  if (categories.length === 0) {
    return <p className="py-10 text-center text-muted-foreground">No categories found.</p>;
  }

  return (
    <>
      {/* Mobile: stacked cards */}
      <div className="space-y-3 md:hidden">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="rounded-2xl border border-border bg-card p-4"
          >
            <div className="flex items-start gap-3">
              <CategoryImage src={cat.imageUrl} alt={cat.name} />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate font-medium text-card-foreground">{cat.name}</p>
                  <StatusBadge active={cat.isActive} />
                </div>
                <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                  {cat.description}
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <div className="flex flex-col gap-1">
                <Link
                  to={`/admin/products?category=${cat._id}`}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  View items
                </Link>
                <span className="text-xs text-muted-foreground">
                  {new Date(cat.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() => onEdit(cat)}
                  aria-label="Edit category"
                  className="cursor-pointer rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => onDelete(cat._id)}
                  disabled={deletingId === cat._id}
                  aria-label="Delete category"
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
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Created</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <CategoryImage src={cat.imageUrl} alt={cat.name} />
                    <div>
                      <p className="font-medium text-card-foreground">{cat.name}</p>
                      <p className="line-clamp-1 text-xs text-muted-foreground">
                        {cat.description}
                      </p>
                      <Link
                        to={`/admin/products?category=${cat._id}`}
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        View items
                      </Link>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge active={cat.isActive} />
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(cat.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(cat)}
                      aria-label="Edit category"
                      className="cursor-pointer rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(cat._id)}
                      disabled={deletingId === cat._id}
                      aria-label="Delete category"
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