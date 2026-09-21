import { Star, Trash2 } from "lucide-react";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "fill-secondary text-secondary" : "text-border"}
        />
      ))}
    </div>
  );
}

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  
  const days = Math.floor(diffMs / 86400000);
  if (days < 1) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

export default function ReviewsList({ reviews, onDelete, deletingId }) {
  if (reviews.length === 0) {
    return <p className="py-8 text-center text-sm text-muted-foreground">No reviews yet.</p>;
  }

  return (
    <div className="divide-y divide-border">
      {reviews.map((review) => (
        <div key={review._id} className="flex items-start justify-between gap-3 py-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium text-card-foreground">{review.user?.name ?? "Anonymous"}</p>
              <StarRating rating={review.rating} />
              <span className="text-xs text-muted-foreground">{timeAgo(review.createdAt)}</span>
            </div>
            {review.comment && (
              <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>
            )}
          </div>

          <button
            onClick={() => onDelete(review._id)}
            disabled={deletingId === review._id}
            aria-label="Delete review"
            className="shrink-0 cursor-pointer rounded-lg p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
          >
            <Trash2 size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}