import Modal from "./Modal";

export default function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  isPending,
  title = "Delete item",
  message = "This action cannot be undone.",
}) {
  return (
    <Modal open={open} onClose={onClose} title={title} maxWidth="max-w-sm">
      <p className="text-sm text-muted-foreground">{message}</p>

      <div className="mt-5 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="cursor-pointer rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isPending}
          className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  );
}