import { useEffect, useState } from "react";
import { useMe, useUpdateMe, useChangePassword } from "../../hooks/useProfile";
import { toast } from "sonner";
import PasswordInput from "./PasswordInput";

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

const emptyAddress = { governorate: "", city: "", street: "", zipCode: "" };

export default function ProfileForm({ children }) {
  const { user, isPending, error } = useMe();
  const update = useUpdateMe();
  const changePassword = useChangePassword();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(emptyAddress);

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setPhone(user.phone ?? "");
      setAddress({ ...emptyAddress, ...(user.address ?? {}) });
    }
  }, [user]);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  if (isPending) {
    return <p className="py-10 text-center text-muted-foreground">Loading profile...</p>;
  }
  if (error || !user) {
    return <p className="py-10 text-center text-muted-foreground">Couldn't load profile.</p>;
  }

  const initials = user.name
    ?.split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleSaveProfile = () => {
    update.mutate({ name, phone, address });
  };

  const handleChangePassword = () => {
    if (newPassword !== passwordConfirm) {
      toast.error("Passwords don't match");
      return;
    }
    changePassword.mutate(
      { userId: user._id, payload: { currentPassword, password: newPassword,  passwordConfirm } },
      {
        onSuccess: () => {
          setCurrentPassword("");
          setNewPassword("");
          setPasswordConfirm("");
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
            {initials}
          </div>
        )}
        <div>
          <h1 className="text-lg font-bold text-card-foreground">{user.name}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium capitalize text-secondary-foreground">
              {user.role}
            </span>
            <span className="text-xs text-muted-foreground">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {children}

      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-3 font-semibold text-card-foreground">Personal info</h2>
        <div className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Name</label>
              <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Phone</label>
              <input className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Email</label>
            <input className={inputClass} value={user.email} disabled />
          </div>

          <h3 className="pt-2 text-sm font-medium text-card-foreground">Address</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Governorate</label>
              <input
                className={inputClass}
                value={address.governorate}
                onChange={(e) => setAddress({ ...address, governorate: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">City</label>
              <input
                className={inputClass}
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Street</label>
              <input
                className={inputClass}
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Zip code</label>
              <input
                className={inputClass}
                value={address.zipCode}
                onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
              />
            </div>
          </div>

          <button
            onClick={handleSaveProfile}
            disabled={update.isPending}
            className="cursor-pointer rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {update.isPending ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-3 font-semibold text-card-foreground">Change password</h2>
            <div className="space-y-3">
  <PasswordInput
    placeholder="Current password"
    value={currentPassword}
    onChange={(e) => setCurrentPassword(e.target.value)}
  />
  <PasswordInput
    placeholder="New password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
  />
  <PasswordInput
    placeholder="Confirm new password"
    value={passwordConfirm}
    onChange={(e) => setPasswordConfirm(e.target.value)}
  />
          <button
            onClick={handleChangePassword}
            disabled={
              changePassword.isPending ||
              !currentPassword ||
              !newPassword ||
              !passwordConfirm
            }
            className="cursor-pointer rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {changePassword.isPending ? "Updating..." : "Update password"}
          </button>
        </div>
      </div>
    </div>
  );
}