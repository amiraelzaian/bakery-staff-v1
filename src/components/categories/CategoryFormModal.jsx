import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import CategoryImage from "./CategoryImage";
import { useCreateCategory, useUpdateCategory } from "../../hooks/useCategories";

const emptyForm = { name: "", description: "" };

export default function CategoryFormModal({ open, onClose, category }) {
  const isEdit = Boolean(category);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const { mutate: createCategory, isPending: creating,error } = useCreateCategory();
  const { mutate: updateCategory, isPending: updating,error:updatingError } = useUpdateCategory();
  const isPending = creating || updating;

  // populate form when opening for edit, reset when opening for create
  useEffect(() => {
    if (!open) return;
    setForm(
      category
        ? { name: category.name, description: category.description }
        : emptyForm
    );
    setFile(null);
    setPreview(category?.imageUrl ?? null);
  }, [open, category]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { name: form.name, description: form.description };
    if (file) payload.categoryImage = file;

    if (isEdit) {
      updateCategory({ catId: category._id, ...payload }, { onSuccess: onClose });
    } else {
      createCategory(payload, { onSuccess: onClose });
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? "Edit Category" : "Add Category"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3">
          <CategoryImage src={preview} alt="Category preview" size={56} />
          <label className="cursor-pointer text-sm font-medium text-primary hover:underline">
            {preview ? "Change image" : "Upload image"}
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        <div>
          <label htmlFor="cat-name" className="mb-1 block text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="cat-name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
            className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label htmlFor="cat-desc" className="mb-1 block text-sm font-medium text-foreground">
            Description
          </label>
          <textarea
            id="cat-desc"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={3}
            required
            className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
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
            {isPending ? "Saving..." : isEdit ? "Save changes" : "Create category"}
          </button>
        </div>
      </form>
    </Modal>
  );
}