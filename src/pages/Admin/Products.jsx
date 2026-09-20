import { useState } from "react";
import { useSearchParams } from "react-router";
import { Plus } from "lucide-react";
import { useProducts, useDeleteProduct } from "../../hooks/useProducts";
import ProductsTable from "../../components/products/ProductsTable";
import SearchInput from "../../components/common/SearchInput";
import Pagination from "../../components/common/Pagination";
import ProductFormModal from "../../components/products/ProductFormModal";
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal";

export default function Products() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category") ?? "";

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const { products, pageInfo, results, isPending, error } = useProducts({ page, search, categoryId });
  const { mutate: deleteProduct, isPending: deletePending } = useDeleteProduct();

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const openCreateForm = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const confirmDelete = () => {
    deleteProduct(deleteTargetId, { onSuccess: () => setDeleteTargetId(null) });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground">{results} total products</p>
        </div>
        <button
          onClick={openCreateForm}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      <SearchInput value={search} onChange={handleSearch} placeholder="Search products..." />

      {isPending ? (
        <p className="py-10 text-center text-muted-foreground">Loading products...</p>
      ) : error ? (
        <p className="py-10 text-center text-muted-foreground">Couldn't load products.</p>
      ) : (
        <>
          <ProductsTable
            products={products}
            onEdit={openEditForm}
            onDelete={setDeleteTargetId}
            deletingId={null}
          />
          <Pagination pageInfo={pageInfo} onPageChange={setPage} />
        </>
      )}

      <ProductFormModal open={formOpen} onClose={() => setFormOpen(false)} product={editingProduct} />

      <ConfirmDeleteModal
        open={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={confirmDelete}
        isPending={deletePending}
        title="Delete product"
        message="This will permanently remove the product. This action cannot be undone."
      />
    </div>
  );
}