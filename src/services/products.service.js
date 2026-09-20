import { apiClient } from "./client";

// payload: { productImage, name, description, price, categoryId, sizes, stockQuantity, isAvailable }
export async function createProduct({ productImage, sizes, ...fields }) {
  const formData = new FormData();
  if (productImage) formData.append("productImage", productImage);
  if (sizes) formData.append("sizes", JSON.stringify(sizes));

  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) formData.append(key, value);
  });

  const data = await apiClient(`/products`, {
    method: "POST",
    body: formData,
  });
  return data;
}

export async function updateProduct(productId, { productImage, sizes, ...fields }) {
  const formData = new FormData();
  if (productImage) formData.append("productImage", productImage);
  if (sizes) formData.append("sizes", JSON.stringify(sizes));

  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) formData.append(key, value);
  });

  const data = await apiClient(`/products/${productId}`, {
    method: "PATCH",
    body: formData,
  });
  return data;
}

export async function deleteProduct(productId) {
  const data = await apiClient(`/products/${productId}`, {
    method: "DELETE",
  });
  return data;
}

export async function getProduct(productId) {
  const data = await apiClient(`/products/${productId}`);
  return data;
}

export async function getProductsForAdmin({ page = 1, search = "", categoryId = "" } = {}) {
  const params = new URLSearchParams({ page });
  if (search) params.set("keyword", search);
  if (categoryId) params.set("categoryId", categoryId);

  const data = await apiClient(`/products/admin?${params.toString()}`);
  return data;
}