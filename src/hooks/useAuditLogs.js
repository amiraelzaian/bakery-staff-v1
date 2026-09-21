import { useQuery } from "@tanstack/react-query";
import { getAuditLogs } from "../services/auditLogs.service";

export function useAuditLogs({ page = 1, search = "", targetType = "" } = {}) {
  const query = useQuery({
    queryKey: ["audit-logs", page, search, targetType],
    queryFn: () => getAuditLogs({ page, search, targetType }),
    staleTime: 60 * 1000,
    placeholderData: (prev) => prev,
  });

  return {
    logs: query.data?.data ?? [],
    pageInfo: query.data?.page ?? { currentPage: 1, limit: 20, NoOfPages: 1 },
    results: query.data?.results ?? 0,
    isPending: query.isPending,
    error: query.error,
  };
}