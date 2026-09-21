import { apiClient } from "./client";

export async function getCoupons({ page = 1 } = {}) {
  const params = new URLSearchParams({ page });
  return apiClient(`/coupons?${params.toString()}`);
}

export async function getCoupon(couponId) {
  return apiClient(`/coupons/${couponId}`);
}

export async function createCoupon({ name, expire, discount }) {
  return apiClient(`/coupons`, {
    method: "POST",
    body: JSON.stringify({ name, expire, discount }),
  });
}

export async function updateCoupon(couponId, payload) {
  return apiClient(`/coupons/${couponId}`, {
    method: "PATCH",
    body: JSON.stringify(payload), // was { payload }
  });
}

export async function deleteCoupon(couponId) {
  return apiClient(`/coupons/${couponId}`, { method: "DELETE" });
}