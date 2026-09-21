import {  useNavigate } from "react-router";
import { Pencil, Trash2 } from "lucide-react";
import UserAvatar from "./UserAvatar";
import RoleBadge from "./RoleBadge";
import StatusBadge from "../common/StatusBadge";

export default function UsersTable({ users, onEdit, onDelete, deletingId }) {
  const navigate = useNavigate();

  if (users.length === 0) {
    return <p className="py-10 text-center text-muted-foreground">No users found.</p>;
  }

  return (
    <>
      {/* Mobile: stacked cards */}
      <div className="space-y-3 md:hidden">
        {users.map((user) => (
          <div key={user._id} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <UserAvatar src={user.avatarUrl} alt={user.name} />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="truncate font-medium text-card-foreground">{user.name}</p>
                  <StatusBadge active={user.isActive} />
                </div>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <RoleBadge role={user.role} />
                  {user.phone && <span className="text-xs text-muted-foreground">{user.phone}</span>}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <button
                onClick={() => navigate(`/admin/users/${user._id}`)}
                className="cursor-pointer text-xs font-medium text-primary hover:underline"
              >
                View details
              </button>
              <div className="flex gap-1">
                <button
                  onClick={() => onEdit(user)}
                  aria-label="Edit user"
                  className="cursor-pointer rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => onDelete(user._id)}
                  disabled={deletingId === user._id}
                  aria-label="Delete user"
                  className="cursor-pointer rounded-lg p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-border bg-card md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <UserAvatar src={user.avatarUrl} alt={user.name} />
                    <div>
                      <p className="font-medium text-card-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                      <button
                        onClick={() => navigate(`/admin/users/${user._id}`)}
                        className="cursor-pointer text-xs font-medium text-secondary hover:underline"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <RoleBadge role={user.role} />
                </td>
                <td className="px-4 py-3 text-muted-foreground">{user.phone ?? "—"}</td>
                <td className="px-4 py-3">
                  <StatusBadge active={user.isActive} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(user)}
                      aria-label="Edit user"
                      className="cursor-pointer rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(user._id)}
                      disabled={deletingId === user._id}
                      aria-label="Delete user"
                      className="cursor-pointer rounded-lg p-2 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}