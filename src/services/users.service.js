import { apiClient } from "./client";

export async function createUser(payload) {
  const data = await apiClient(`/users`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data;
}

export async function updateUser(userId, payload) {
  const data = await apiClient(`/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return data;
}

export async function deleteUser(userId) {
  const data = await apiClient(`/users/${userId}`, {
    method: "DELETE",
  });
  return data;
}

export async function getUser(userId) {
  const data = await apiClient(`/users/${userId}`);
  return data;
}

export async function getAllUsers({ page = 1, search = "", role = "" } = {}) {
  const params = new URLSearchParams({ page });
  if (search) params.set("keyword", search);
  if (role) params.set("role", role);

  const data = await apiClient(`/users?${params.toString()}`);
  return data;
}


export async function getUsersByRole(role) {
  const params = new URLSearchParams({ role, limit: 100 });
  return apiClient(`/users?${params.toString()}`);
}