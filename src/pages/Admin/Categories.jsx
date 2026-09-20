import { useState } from "react";
import { Plus } from "lucide-react";
import { useCategories, useDeleteCategory } from "../../hooks/useCategories";
import CategoriesTable from "../../components/categories/CategoriesTable";
import SearchInput from "../../components/common/SearchInput";
import Pagination from "../../components/common/Pagination";
import CategoryFormModal from "../../components/categories/CategoryFormModal";
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal";

export default function Categories() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const { categories, pageInfo, results, isPending, error } = useCategories({ page, search });
  const { mutate: deleteCategory, isPending: deletePending } = useDeleteCategory();

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const openCreateForm = () => {
    setEditingCategory(null);
    setFormOpen(true);
  };

  const openEditForm = (cat) => {
    setEditingCategory(cat);
    setFormOpen(true);
  };

  const confirmDelete = () => {
    deleteCategory(deleteTargetId, { onSuccess: () => setDeleteTargetId(null) });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Categories</h1>
          <p className="text-sm text-muted-foreground">{results} total categories</p>
        </div>
        <button
          onClick={openCreateForm}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      <SearchInput value={search} onChange={handleSearch} placeholder="Search categories..." />

      {isPending ? (
        <p className="py-10 text-center text-muted-foreground">Loading categories...</p>
      ) : error ? (
        <p className="py-10 text-center text-muted-foreground">Couldn't load categories.</p>
      ) : (
        <>
          <CategoriesTable
            categories={categories}
            onEdit={openEditForm}
            onDelete={setDeleteTargetId}
            deletingId={null}
          />
          <Pagination pageInfo={pageInfo} onPageChange={setPage} />
        </>
      )}

      <CategoryFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        category={editingCategory}
      />

      <ConfirmDeleteModal
        open={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={confirmDelete}
        isPending={deletePending}
        title="Delete category"
        message="This will permanently remove the category. This action cannot be undone."
      />
    </div>
  );
}