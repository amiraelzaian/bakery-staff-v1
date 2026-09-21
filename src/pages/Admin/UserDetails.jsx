import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Pencil, Trash2, ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import { useUser, useDeleteUser } from "../../hooks/useUsers";
import UserAvatar from "../../components/users/UserAvatar";
import RoleBadge from "../../components/users/RoleBadge";
import StatusBadge from "../../components/common/StatusBadge";
import UserFormModal from "../../components/users/UserFormModal";
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal";

export default function UserDetails() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user, isPending, error } = useUser(userId);
  const { mutate: deleteUser, isPending: deletePending } = useDeleteUser();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const confirmDelete = () => {
    deleteUser(userId, { onSuccess: () => navigate("/admin/users") });
  };

  if (isPending) {
    return <p className="py-10 text-center text-muted-foreground">Loading user...</p>;
  }

  if (error || !user) {
    return (
      <div className="py-10 text-center">
        <p className="text-muted-foreground">User not found.</p>
        <Link to="/admin/users" className="mt-2 inline-block text-sm text-primary hover:underline">
          Back to users
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/admin/users"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline"
      >
        <ArrowLeft size={14} />
        Back to users
      </Link>

      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row">
        <UserAvatar src={user.avatarUrl} alt={user.name} size={80} />

        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h1 className="text-xl font-bold text-card-foreground">{user.name}</h1>
              <div className="mt-1 flex items-center gap-2">
                <RoleBadge role={user.role} />
                <StatusBadge active={user.isActive} />
              </div>
            </div>
          </div>

          <div className="mt-3 space-y-1 text-sm text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <Mail size={14} />
              {user.email}
            </p>
            {user.phone && (
              <p className="flex items-center gap-1.5">
                <Phone size={14} />
                {user.phone}
              </p>
            )}
            {user.address && (
              <p className="flex items-center gap-1.5">
                <MapPin size={14} />
                {user.address.street}, {user.address.city}, {user.address.governorate}
                {user.address.zipCode && ` — ${user.address.zipCode}`}
              </p>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setEditOpen(true)}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              <Pencil size={14} />
              Edit
            </button>
            <button
              onClick={() => setDeleteOpen(true)}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-destructive transition hover:bg-destructive/10"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Provider</p>
          <p className="mt-1 font-semibold capitalize text-card-foreground">{user.provider}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Joined</p>
          <p className="mt-1 font-semibold text-card-foreground">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Last updated</p>
          <p className="mt-1 font-semibold text-card-foreground">
            {new Date(user.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <UserFormModal open={editOpen} onClose={() => setEditOpen(false)} user={user} />

      <ConfirmDeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        isPending={deletePending}
        title="Delete user"
        message={`This will permanently remove "${user.name}". This action cannot be undone.`}
      />
    </div>
  );
}