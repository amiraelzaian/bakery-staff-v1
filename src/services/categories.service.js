import { apiClient } from "./client";


export async function createCategory({ categoryImage, name, description }) {
  const formData = new FormData();
  if (categoryImage) formData.append("categoryImage", categoryImage);
  formData.append("name", name);
  formData.append("description", description);

  const data = await apiClient(`/categories`, {
    method: "POST",
    body: formData, 
  });
  return data;
}

export async function updateCategory(catId, { categoryImage, ...fields }) {
  const formData = new FormData();
  if (categoryImage) formData.append("categoryImage", categoryImage);
  Object.entries(fields).forEach(([key, value]) => formData.append(key, value));

  const data = await apiClient(`/categories/${catId}`, {
    method: "PATCH",
    body: formData,
  });
  return data;
}

export async function deleteCategory(catId) {
  const data = await apiClient(`/categories/${catId}`, {
    method: "DELETE",
  });
  return data;
}

export async function getCategory(catId) {
  const data = await apiClient(`/categories/${catId}`);
  return data;
}

export async function getCategoriesForAdmin({page=1,search=""}={}) {
    const params=new URLSearchParams({page})
    if(search) params.set("keyword",search)
  const data = await apiClient(`/categories/admin?${params.toString()}`);
  return data;
}