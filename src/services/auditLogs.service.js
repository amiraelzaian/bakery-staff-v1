import { apiClient } from "./client";

export async function getAuditLogs({ page = 1, search = "", targetType = "" } = {}) {
  const params = new URLSearchParams({ page });
  if (search) params.set("keyword", search);
  if (targetType) params.set("targetType", targetType);

  const data = await apiClient(`/audit-logs?${params.toString()}`); 
  return data;
}