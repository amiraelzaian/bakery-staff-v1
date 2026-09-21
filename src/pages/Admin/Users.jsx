import { useState } from "react";
import { Plus } from "lucide-react";
import { useUsers, useDeleteUser } from "../../hooks/useUsers";
import UsersTable from "../../components/users/UsersTable";
import { ROLE_TABS } from "../../components/users/roleConfig";
import SearchInput from "../../components/common/SearchInput";
import Pagination from "../../components/common/Pagination";
import UserFormModal from "../../components/users/UserFormModal";
import ConfirmDeleteModal from "../../components/common/ConfirmDeleteModal";

export default function Users() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const { users, pageInfo, results, isPending, error } = useUsers({ page, search, role });
  const { mutate: deleteUser, isPending: deletePending } = useDeleteUser();

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleRoleChange = (value) => {
    setRole(value);
    setPage(1);
  };

  const openCreateForm = () => {
    setEditingUser(null);
    setFormOpen(true);
  };

  const openEditForm = (user) => {
    setEditingUser(user);
    setFormOpen(true);
  };

  const confirmDelete = () => {
    deleteUser(deleteTargetId, { onSuccess: () => setDeleteTargetId(null) });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Users</h1>
          <p className="text-sm text-muted-foreground">{results} total users</p>
        </div>
        <button
          onClick={openCreateForm}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <Plus size={16} />
          Add User
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {ROLE_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleRoleChange(tab.value)}
              className={`cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium transition ${
                role === tab.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="sm:w-64">
          <SearchInput value={search} onChange={handleSearch} placeholder="Search users..." />
        </div>
      </div>

      {isPending ? (
        <p className="py-10 text-center text-muted-foreground">Loading users...</p>
      ) : error ? (
        <p className="py-10 text-center text-muted-foreground">Couldn't load users.</p>
      ) : (
        <>
          <UsersTable
            users={users}
            onEdit={openEditForm}
            onDelete={setDeleteTargetId}
            deletingId={null}
          />

          {users.length>=20&&<Pagination pageInfo={pageInfo} onPageChange={setPage} />}
        </>
      )}

      <UserFormModal open={formOpen} onClose={() => setFormOpen(false)} user={editingUser} />

      <ConfirmDeleteModal
        open={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={confirmDelete}
        isPending={deletePending}
        title="Delete user"
        message="This will permanently remove the user. This action cannot be undone."
      />
    </div>
  );
}