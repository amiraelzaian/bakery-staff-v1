import { useState } from "react";
import { useProductReviews, useDeleteReview } from "../../hooks/useProducts";
import ReviewsList from "./ReviewsList";
import Pagination from "../common/Pagination";
import ConfirmDeleteModal from "../common/ConfirmDeleteModal";

export default function ProductReviewsSection({ productId }) {
  const [page, setPage] = useState(1);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const { reviews, pageInfo, results, isPending, error } = useProductReviews({
    page,
    product: productId,
  });
  const { mutate: deleteReview, isPending: deletePending } = useDeleteReview();

  const confirmDelete = () => {
    deleteReview(deleteTargetId, { onSuccess: () => setDeleteTargetId(null) });
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="font-semibold text-card-foreground">Reviews</h2>
        <span className="text-sm text-muted-foreground">{results} total</span>
      </div>

      {isPending ? (
        <p className="py-8 text-center text-sm text-muted-foreground">Loading reviews...</p>
      ) : error ? (
        <p className="py-8 text-center text-sm text-muted-foreground">Couldn't load reviews.</p>
      ) : (
        <>
          <ReviewsList
            reviews={reviews}
            onDelete={setDeleteTargetId}
            deletingId={null}
          />
          <div className="mt-3">
            <Pagination pageInfo={pageInfo} onPageChange={setPage} />
          </div>
        </>
      )}

      <ConfirmDeleteModal
        open={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={confirmDelete}
        isPending={deletePending}
        title="Delete review"
        message="This will permanently remove the review. This action cannot be undone."
      />
    </div>
  );
}