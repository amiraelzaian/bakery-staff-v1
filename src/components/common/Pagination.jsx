export default function Pagination({ pageInfo, onPageChange }) {
  const { currentPage, NoOfPages } = pageInfo;

  if (NoOfPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-border pt-3 text-sm text-muted-foreground">
      <span>
        Page {currentPage} of {NoOfPages}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="cursor-pointer rounded-lg border border-border px-3 py-1.5 font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= NoOfPages}
          className="cursor-pointer rounded-lg border border-border px-3 py-1.5 font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}