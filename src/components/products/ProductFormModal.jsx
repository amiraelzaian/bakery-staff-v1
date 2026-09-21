import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import ProductImage from "./ProductImage";
import { useCreateProduct, useUpdateProduct } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";

const SIZE_OPTIONS = ["small", "medium", "large"];
const emptySize = { name: "small", price: "" };
const emptyForm = {
  name: "",
  description: "",
  categoryId: "",
  stockQuantity: "",
  price: "",
};

export default function ProductFormModal({ open, onClose, product }) {
  const isEdit = Boolean(product);
  const [form, setForm] = useState(emptyForm);
  const [useSizes, setUseSizes] = useState(false);
  const [sizes, setSizes] = useState([emptySize]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const { categories } = useCategories({ page: 1 });
  const { mutate: createProduct, isPending: creating,error } = useCreateProduct();
  const { mutate: updateProduct, isPending: updating,updatingError } = useUpdateProduct();
  const isPending = creating || updating;

  useEffect(() => {
    if (!open) return;

    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        categoryId: product.categoryId?._id ?? "",
        stockQuantity: product.stockQuantity ?? "",
        price: product.price ?? "",
      });
      const hasSizes = product.sizes?.length > 0;
      setUseSizes(hasSizes);
      setSizes(hasSizes ? product.sizes.map((s) => ({ name: s.name, price: s.price })) : [emptySize]);
      setPreview(product.imageUrl ?? null);
    } else {
      setForm(emptyForm);
      setUseSizes(false);
      setSizes([emptySize]);
      setPreview(null);
    }
    setFile(null);
  }, [open, product]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const updateSize = (index, key, value) => {
    setSizes((prev) => prev.map((s, i) => (i === index ? { ...s, [key]: value } : s)));
  };

 
  const nextAvailableSizeName = (currentSizes) =>
    SIZE_OPTIONS.find((opt) => !currentSizes.some((s) => s.name === opt)) ?? "";

  const addSize = () => {
    setSizes((prev) => {
      if (prev.length >= SIZE_OPTIONS.length) return prev; 
      return [...prev, { name: nextAvailableSizeName(prev), price: "" }];
    });
  };

  const removeSize = (index) => setSizes((prev) => prev.filter((_, i) => i !== index));

  const usedSizeNames = (excludeIndex) =>
    sizes.filter((_, i) => i !== excludeIndex).map((s) => s.name);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      description: form.description,
      categoryId: form.categoryId, 
      stockQuantity: Number(form.stockQuantity),
    };

    if (useSizes) {
      payload.sizes = sizes
        .filter((s) => s.name && s.price !== "")
        .map((s) => ({ name: s.name, price: Number(s.price) }));
    } else {
      payload.price = Number(form.price);
    }

    if (file) payload.productImage = file;

    if (isEdit) {
      updateProduct({ productId: product._id, ...payload }, { onSuccess: onClose });
    } else {
      createProduct(payload, { onSuccess: onClose });
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? "Edit Product" : "Add Product"}  maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="custom-scrollbar max-h-[70vh] space-y-4 overflow-y-auto pr-1">
        <div className="flex items-center gap-3">
          <ProductImage src={preview} alt="Product preview" size={56} />
          <label className="cursor-pointer text-sm font-medium text-primary hover:underline">
            {preview ? "Change image" : "Upload image"}
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        <div>
          <label htmlFor="prod-name" className="mb-1 block text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="prod-name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
            className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label htmlFor="prod-desc" className="mb-1 block text-sm font-medium text-foreground">
            Description
          </label>
          <textarea
            id="prod-desc"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={2}
            required
            className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="prod-category" className="mb-1 block text-sm font-medium text-foreground">
              Category
            </label>
            <select
              id="prod-category"
              value={form.categoryId}
              onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
              required
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="prod-stock" className="mb-1 block text-sm font-medium text-foreground">
              Stock quantity
            </label>
            <input
              id="prod-stock"
              type="number"
              min="0"
              value={form.stockQuantity}
              onChange={(e) => setForm((f) => ({ ...f, stockQuantity: e.target.value }))}
              required
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        <div className="rounded-lg border border-border p-3">
          <label className="flex items-center gap-2 text-sm font-medium text-foreground">
            <input
              type="checkbox"
              checked={useSizes}
              onChange={(e) => setUseSizes(e.target.checked)}
              className="h-4 w-4 accent-primary"
            />
            This product has multiple sizes
          </label>

          {useSizes ? (
            <div className="mt-3 space-y-2">
              {sizes.map((size, i) => (
                <div key={i} className="flex items-center gap-2">
                  <select
                    value={size.name}
                    onChange={(e) => updateSize(i, "name", e.target.value)}
                    className="flex-1 rounded-lg border border-border bg-input px-3 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  >
                    {SIZE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} disabled={usedSizeNames(i).includes(opt)}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min="0"
                    placeholder="Price"
                    value={size.price}
                    onChange={(e) => updateSize(i, "price", e.target.value)}
                    className="w-24 rounded-lg border border-border bg-input px-3 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button
                    type="button"
                    onClick={() => removeSize(i)}
                    disabled={sizes.length === 1}
                    className="cursor-pointer text-xs font-medium text-destructive disabled:opacity-40"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSize}
                disabled={sizes.length >= SIZE_OPTIONS.length}
                className="cursor-pointer text-xs font-medium text-primary hover:underline disabled:opacity-40 disabled:no-underline"
              >
                + Add size
              </button>
            </div>
          ) : (
            <div className="mt-3">
              <label htmlFor="prod-price" className="mb-1 block text-sm font-medium text-foreground">
                Price
              </label>
              <input
                id="prod-price"
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                required={!useSizes}
                className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          )}
        </div>
         {
        error&& <p className="text-center text-xs text-red-500">{error.message}</p>
       }
       {
        updatingError&& <p className="text-center text-xs text-red-500">{updatingError.message}</p>
       }

        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? "Saving..." : isEdit ? "Save changes" : "Create product"}
          </button>
        </div>
      </form>
    </Modal>
  );
}