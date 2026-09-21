import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";
import { useProduct, useDeleteProduct } from "../../hooks/useProducts";
import ProductImage from "../../components/products/ProductImage";
import StatusBadge from "../../components/common/StatusBadge";
import { getDisplayPrice } from "../../components/products/priceHelper";
import ProductFormModal from "../../components/products/ProductFormModal";
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { product, isPending, error } = useProduct(productId);
  const { mutate: deleteProduct, isPending: deletePending } = useDeleteProduct();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const confirmDelete = () => {
    deleteProduct(productId, {
      onSuccess: () => navigate("/admin/products"),
    });
  };

  if (isPending) {
    return <p className="py-10 text-center text-muted-foreground">Loading product...</p>;
  }

  if (error || !product) {
    return (
      <div className="py-10 text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Link to="/admin/products" className="mt-2 inline-block text-sm text-primary hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  const hasSizes = product.sizes?.length > 0;

  return (
    <div className="space-y-6">
      <Link
        to="/admin/products"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline"
      >
        <ArrowLeft size={14} />
        Back to products
      </Link>

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row">
        <ProductImage src={product.imageUrl} alt={product.name} size={96} />

        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h1 className="text-xl font-bold text-card-foreground">{product.name}</h1>
              <p className="text-sm text-muted-foreground">
                {product.categoryId?.name ?? "Uncategorized"}
              </p>
            </div>
            <StatusBadge
              active={product.isAvailable}
              activeLabel="Available"
              inactiveLabel="Unavailable"
            />
          </div>

          <p className="mt-3 text-sm text-card-foreground">{product.description}</p>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setEditOpen(true)}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              <Pencil size={14} />
              Edit
            </button>
            <button
              onClick={() => setDeleteOpen(true)}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-destructive transition hover:bg-destructive/10"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Price</p>
          <p className="mt-1 font-semibold text-card-foreground">{getDisplayPrice(product)}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Stock</p>
          <p className="mt-1 font-semibold text-card-foreground">{product.stockQuantity}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Sold</p>
          <p className="mt-1 font-semibold text-card-foreground">{product.soldQuantity ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Created</p>
          <p className="mt-1 font-semibold text-card-foreground">
            {new Date(product.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {hasSizes && (
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-3 font-semibold text-card-foreground">Sizes & Pricing</h2>
          <div className="divide-y divide-border">
            {product.sizes.map((size) => (
              <div key={size.name} className="flex items-center justify-between py-2 text-sm">
                <span className="capitalize text-card-foreground">{size.name}</span>
                <span className="font-medium text-card-foreground">{size.price} EGP</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <ProductFormModal open={editOpen} onClose={() => setEditOpen(false)} product={product} />

      <ConfirmDeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        isPending={deletePending}
        title="Delete product"
        message={`This will permanently remove "${product.name}". This action cannot be undone.`}
      />
    </div>
  );
}