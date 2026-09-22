import { apiClient } from "./client";

export async function getMe() {
  return apiClient("/users/getMe");
}

export async function updateMe(payload) {
  return apiClient("/users/updateMe", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function changePassword(userId,payload) {
  return apiClient(`/users/change-user-pass/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(payload), // { currentPassword, newPassword, confirm }
  });
}