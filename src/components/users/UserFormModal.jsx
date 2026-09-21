import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Modal from "../common/Modal";
import { useCreateUser, useUpdateUser } from "../../hooks/useUsers";

const ROLE_OPTIONS = ["admin", "baker", "delivery", "customer"];

const emptyForm = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  role: "customer",
  phone: "",
  isActive: true,
  governorate: "",
  city: "",
  street: "",
  zipCode: "",
};

export default function UserFormModal({ open, onClose, user }) {
  const isEdit = Boolean(user);
  const [form, setForm] = useState(emptyForm);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const { mutate: createUser, isPending: creating, error } = useCreateUser();
  const { mutate: updateUser, isPending: updating, error: updatingError } = useUpdateUser();
  const isPending = creating || updating;

  useEffect(() => {
    if (!open) return;

    setPasswordError("");
    setShowPassword(false);
    setShowPasswordConfirm(false);

    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        password: "",
        passwordConfirm: "",
        role: user.role,
        phone: user.phone ?? "",
        isActive: user.isActive,
        governorate: user.address?.governorate ?? "",
        city: user.address?.city ?? "",
        street: user.address?.street ?? "",
        zipCode: user.address?.zipCode ?? "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [open, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordError("");

    if (!isEdit && form.password !== form.passwordConfirm) {
      setPasswordError("Password doesn't match Password Confirm");
      return;
    }

    const payload = {
      name: form.name,
      email: form.email,
      role: form.role,
      phone: form.phone || undefined,
      isActive: form.isActive,
    };

    if (!isEdit || form.password) {
      payload.password = form.password;
      payload.passwordConfirm = form.passwordConfirm;
    }

    if (form.governorate || form.city || form.street || form.zipCode) {
      payload.address = {
        governorate: form.governorate,
        city: form.city,
        street: form.street,
        zipCode: form.zipCode,
      };
    }

    if (isEdit) {
      updateUser({ userId: user._id, ...payload }, { onSuccess: onClose });
    } else {
      createUser(payload, { onSuccess: onClose });
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? "Edit User" : "Add User"} maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="flex max-h-[70vh] flex-col">
        <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto pr-1">
          <div>
            <label htmlFor="user-name" className="mb-1 block text-sm font-medium text-foreground">
              Name
            </label>
            <input
              id="user-name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="user-email" className="mb-1 block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="user-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
                className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label htmlFor="user-phone" className="mb-1 block text-sm font-medium text-foreground">
                Phone
              </label>
              <input
                id="user-phone"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <div>
            <label htmlFor="user-password" className="mb-1 block text-sm font-medium text-foreground">
              Password {isEdit && <span className="text-muted-foreground">(leave blank to keep unchanged)</span>}
            </label>
            <div className="relative">
              <input
                id="user-password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                required={!isEdit}
                minLength={6}
                className="w-full rounded-lg border border-border bg-input px-3 py-2 pr-10 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {!isEdit && (
            <div>
              <label htmlFor="user-password-confirm" className="mb-1 block text-sm font-medium text-foreground">
                Password Confirm
              </label>
              <div className="relative">
                <input
                  id="user-password-confirm"
                  type={showPasswordConfirm ? "text" : "password"}
                  value={form.passwordConfirm}
                  onChange={(e) => setForm((f) => ({ ...f, passwordConfirm: e.target.value }))}
                  required={!isEdit}
                  minLength={6}
                  className="w-full rounded-lg border border-border bg-input px-3 py-2 pr-10 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm((v) => !v)}
                  aria-label={showPasswordConfirm ? "Hide password" : "Show password"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground"
                >
                  {showPasswordConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1 text-xs text-red-500">{passwordError}</p>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="user-role" className="mb-1 block text-sm font-medium text-foreground">
                Role
              </label>
              <select
                id="user-role"
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm capitalize text-foreground outline-none focus:ring-2 focus:ring-ring"
              >
                {ROLE_OPTIONS.map((r) => (
                  <option key={r} value={r} className="capitalize">
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                  className="h-4 w-4 accent-primary"
                />
                Active
              </label>
            </div>
          </div>

          <div className="rounded-lg border border-border p-3">
            <p className="mb-2 text-sm font-medium text-foreground">Address (optional)</p>
            <div className="grid grid-cols-2 gap-2">
              <input
                placeholder="Governorate"
                value={form.governorate}
                onChange={(e) => setForm((f) => ({ ...f, governorate: e.target.value }))}
                className="rounded-lg border border-border bg-input px-3 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                className="rounded-lg border border-border bg-input px-3 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                placeholder="Street"
                value={form.street}
                onChange={(e) => setForm((f) => ({ ...f, street: e.target.value }))}
                className="rounded-lg border border-border bg-input px-3 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                placeholder="Zip code"
                value={form.zipCode}
                onChange={(e) => setForm((f) => ({ ...f, zipCode: e.target.value }))}
                className="rounded-lg border border-border bg-input px-3 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        {error && <p className="text-center text-xs text-red-500">{error.message}</p>}
        {updatingError && <p className="text-center text-xs text-red-500">{updatingError.message}</p>}

        <div className="mt-4 flex justify-end gap-2 border-t border-border pt-4">
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
            {isPending ? "Saving..." : isEdit ? "Save changes" : "Create user"}
          </button>
        </div>
      </form>
    </Modal>
  );
}