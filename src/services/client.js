import { useAuthStore } from "../stores/authStore"

const API_URL = import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:4000/api/v1"

console.log("API URL:", API_URL)

export async function apiClient(endpoint, options = {}) {
  const { token, logout } = useAuthStore.getState();

  const isFormData = options.body instanceof FormData;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(!isFormData && { "Content-Type": "application/json" }),
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
  })

  if (res.status === 401 && token) logout();

  if (res.status === 204) return null

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    const error = new Error(
      data?.errors?.[0]?.msg || data?.message || `Request failed: ${res.status}`
    )
    error.res = { status: res.status, data }
    throw error
  }

  return data
}