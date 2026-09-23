import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useCategories } from "../../hooks/useCategories";
import { useProducts } from "../../hooks/useProducts";

function ModalShell({ title, onClose, children, wide }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className={`w-full ${wide ? "max-w-lg" : "max-w-md"} max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-5 shadow-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-card-foreground">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="cursor-pointer text-muted-foreground hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}


const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

const toDateInput = (d) => (d ? new Date(d).toISOString().slice(0, 10) : "");

export function OfferFormModal({ offer, isSubmitting, onSubmit, onClose }) {
  const isEdit = !!offer;

  const [name, setName] = useState(offer?.name ?? "");
  const [description, setDescription] = useState(offer?.description ?? "");
  const [discountPercentage, setDiscountPercentage] = useState(
    offer?.discountPercentage ?? ""
  );
  const [startDate, setStartDate] = useState(toDateInput(offer?.startDate));
  const [endDate, setEndDate] = useState(toDateInput(offer?.endDate));

  const [mode, setMode] = useState(offer?.category ? "category" : "products");
  const [categoryId, setCategoryId] = useState(offer?.category ?? "");
  const [productIds, setProductIds] = useState(offer?.products ?? []);

  const [error, setError] = useState("");

  const { categories, isPending: categoriesLoading } = useCategories();
  const { products, isPending: productsLoading } = useProducts();

  const toggleProduct = (id) => {
    setProductIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return setError("Offer name is required.");
    if (!description.trim()) return setError("Description is required.");

    const discount = Number(discountPercentage);
    if (!discount || discount < 1 || discount > 100)
      return setError("Discount must be between 1 and 100.");

    if (!startDate || !endDate) return setError("Start and end dates are required.");
    if (new Date(endDate) < new Date(startDate))
      return setError("End date must be after the start date.");

    if (mode === "category" && !categoryId)
      return setError("Choose a category.");
    if (mode === "products" && productIds.length === 0)
      return setError("Select at least one product.");

    setError("");

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      discountPercentage: discount,
      startDate,
      endDate,
      category: mode === "category" ? categoryId : null,
      products: mode === "products" ? productIds : [],
    });
  };

  return (
    <ModalShell title={isEdit ? "Edit offer" : "New offer"} onClose={onClose} wide>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Eid Collection"
            className={inputClass}
            autoFocus
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Special discounts on our Eid favorites"
            rows={2}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Discount (%)</label>
            <input
              type="number"
              min="1"
              max="100"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              placeholder="20"
              className={inputClass}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Start date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">End date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Apply to: category or products */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Applies to</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode("category")}
              className={`flex-1 cursor-pointer rounded-lg border px-3 py-2 text-sm font-medium transition ${
                mode === "category"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              A category
            </button>
            <button
              type="button"
              onClick={() => setMode("products")}
              className={`flex-1 cursor-pointer rounded-lg border px-3 py-2 text-sm font-medium transition ${
                mode === "products"
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              Specific products
            </button>
          </div>

          {mode === "category" ? (
            categoriesLoading ? (
              <p className="text-sm text-muted-foreground">Loading categories...</p>
            ) : (
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className={inputClass}
              >
                <option value="">Select a category...</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            )
          ) : productsLoading ? (
            <p className="text-sm text-muted-foreground">Loading products...</p>
          ) : (
            <div className="max-h-48 space-y-1 overflow-y-auto rounded-lg border border-border p-2">
              {products.map((p) => (
                <label
                  key={p._id}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-secondary"
                >
                  <input
                    type="checkbox"
                    checked={productIds.includes(p._id)}
                    onChange={() => toggleProduct(p._id)}
                  />
                  <span className="text-card-foreground">{p.name}</span>
                </label>
              ))}
              {productIds.length > 0 && (
                <p className="px-2 pt-1 text-xs text-muted-foreground">
                  {productIds.length} selected
                </p>
              )}
            </div>
          )}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : isEdit ? "Save changes" : "Create offer"}
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

export function DeleteOfferModal({ offer, isDeleting, onConfirm, onClose }) {
  return (
    <ModalShell title="Delete offer" onClose={onClose}>
      <p className="text-sm text-muted-foreground">
        Are you sure you want to delete{" "}
        <span className="font-semibold text-card-foreground">{offer.name}</span>?
        This can't be undone.
      </p>
      <div className="mt-5 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="cursor-pointer rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className="cursor-pointer rounded-full bg-red-600 px-4 py-1.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </ModalShell>
  );
}