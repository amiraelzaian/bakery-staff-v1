import { apiClient } from "./client";

function withRange(path, range) {
  const params = new URLSearchParams();
  if (range) params.set("range", range);
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}

export async function getRevenue({ range = "" } = {}) {
  return apiClient(withRange("/admin-dashboard/revenue", range));
}

export async function getSales({ range = "" } = {}) {
  return apiClient(withRange("/admin-dashboard/sales", range));
}

export async function getBestSellingProducts({ range = "" } = {}) {
  return apiClient(withRange("/admin-dashboard/best-selling", range));
}

export async function getOrderStatusBreakdown({ range = "" } = {}) {
  return apiClient(withRange("/admin-dashboard/order-status", range));
}

export async function getAverageOrderValue({ range = "" } = {}) {
  return apiClient(withRange("/admin-dashboard/avg-order-val", range));
}

export async function getNewCustomersOverTime({ range = "" } = {}) {
  return apiClient(withRange("/admin-dashboard/new-customers", range));
}

export async function getActiveOffers() {
  return apiClient("/admin-dashboard/active-offers");
}

export async function getTopRatedProducts() {
  return apiClient("/admin-dashboard/top-products");
}