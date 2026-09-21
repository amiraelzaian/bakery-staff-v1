import { useEffect, useState } from "react";
import { X } from "lucide-react";

function ModalShell({ title, onClose, children }) {
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
        className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-lg"
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

// yyyy-mm-dd for <input type="date">
const toDateInput = (d) => (d ? new Date(d).toISOString().slice(0, 10) : "");

export function CouponFormModal({ coupon, isSubmitting, onSubmit, onClose }) {
  const isEdit = !!coupon;
  const [name, setName] = useState(coupon?.name ?? "");
  const [expire, setExpire] = useState(toDateInput(coupon?.expire));
  const [discount, setDiscount] = useState(coupon?.discount ?? "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const value = Number(discount);
    if (!name.trim()) return setError("Coupon name is required.");
    if (!expire) return setError("Expiry date is required.");
    if (!value || value < 1 || value > 100)
      return setError("Discount must be between 1 and 100.");

    setError("");
    onSubmit({ name: name.trim().toUpperCase(), expire, discount: value });
  };

  return (
    <ModalShell title={isEdit ? "Edit coupon" : "New coupon"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">Code</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="SUMMER10"
            className={`${inputClass} uppercase`}
            autoFocus
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Discount (%)</label>
            <input
              type="number"
              min="1"
              max="100"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="10"
              className={inputClass}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Expires</label>
            <input
              type="date"
              value={expire}
              onChange={(e) => setExpire(e.target.value)}
              className={inputClass}
            />
          </div>
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
            {isSubmitting ? "Saving..." : isEdit ? "Save changes" : "Create coupon"}
          </button>
        </div>
      </form>
    </ModalShell>
  );
}

export function DeleteCouponModal({ coupon, isDeleting, onConfirm, onClose }) {
  return (
    <ModalShell title="Delete coupon" onClose={onClose}>
      <p className="text-sm text-muted-foreground">
        Are you sure you want to delete{" "}
        <span className="font-semibold text-card-foreground">{coupon.name}</span>?
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