import { useState } from "react";
import { useAuditLogs } from "../../hooks/useAuditLogs";
import AuditLogItem from "../../components/auditLogs/AuditLogItem";
import { TARGET_TYPE_TABS } from "../../components/auditLogs/actionConfig";
import SearchInput from "../../components/common/SearchInput";
import Pagination from "../../components/common/Pagination";

export default function AuditLogs() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [targetType, setTargetType] = useState("");

  const { logs, pageInfo, results, isPending, error } = useAuditLogs({ page, search, targetType });

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleTabChange = (value) => {
    setTargetType(value);
    setPage(1);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-foreground">Audit Logs</h1>
        <p className="text-sm text-muted-foreground">{results} logged actions</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {TARGET_TYPE_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              className={`cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium transition ${
                targetType === tab.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
       
      </div>

      {isPending ? (
        <p className="py-10 text-center text-muted-foreground">Loading logs...</p>
      ) : error ? (
        <p className="py-10 text-center text-muted-foreground">Couldn't load logs.</p>
      ) : logs.length === 0 ? (
        <p className="py-10 text-center text-muted-foreground">No activity yet.</p>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
          {logs.map((log) => (
            <AuditLogItem key={log._id} log={log} />
          ))}
        </div>
      )}

     {logs.length>0&& <Pagination pageInfo={pageInfo} onPageChange={setPage} />}
    </div>
  );
}