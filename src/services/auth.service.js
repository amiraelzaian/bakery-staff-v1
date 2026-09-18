import { apiClient } from "./client";

export async function login(email, password) {
  const data = await apiClient("/auth/staff/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return data;
}

export async function googleLogin(credential) {
  const data = await apiClient("/auth/staff/google", {
    method: "POST",
    body: JSON.stringify({ credential }),
  });
  return data;
}