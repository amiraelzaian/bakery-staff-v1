import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useUsersByRole } from "../../hooks/useUsers";

export default function AssignStaffModal({
  title,
  role, 
  confirmLabel,
  isSubmitting,
  onConfirm, 
  onClose,
}) {
  const [selectedId, setSelectedId] = useState("");
  const { users, isPending, error } = useUsersByRole(role);

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
            className="cursor-pointer text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {isPending ? (
          <p className="py-4 text-sm text-muted-foreground">Loading {role}s...</p>
        ) : error ? (
          <p className="py-4 text-sm text-muted-foreground">Couldn't load {role}s.</p>
        ) : users.length === 0 ? (
          <p className="py-4 text-sm text-muted-foreground">No {role}s found.</p>
        ) : (
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
          >
            <option value="">Select a {role}...</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
                {u.phone ? `  ${u.phone}` : ""}
              </option>
            ))}
          </select>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(selectedId)}
            disabled={!selectedId || isSubmitting}
            className="cursor-pointer rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}