import { apiClient } from "./client";

export async function getOffers({ page = 1 } = {}) {
  const params = new URLSearchParams({ page });
  return apiClient(`/seasonal-offers?${params.toString()}`);
}

export async function getOffer(offerId) {
  return apiClient(`/seasonal-offers/${offerId}`);
}

export async function createOffer(payload) {
  return apiClient("/seasonal-offers", {
    method: "POST",
    body: JSON.stringify(payload), // was { payload }
  });
}

export async function updateOffer(offerId, payload) {
  return apiClient(`/seasonal-offers/${offerId}`, {
    method: "PATCH",
    body: JSON.stringify(payload), 
  });
}

export async function deleteOffer(offerId) {
  return apiClient(`/seasonal-offers/${offerId}`, { method: "DELETE" });
}