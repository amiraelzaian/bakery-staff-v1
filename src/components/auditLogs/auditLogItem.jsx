import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ACTION_CONFIG, TONE_CLASSES } from "./actionConfig";

function formatFieldValue(value) {
  if (Array.isArray(value)) {
    return value.map((v) => `${v.name}: ${v.price}`).join(", ");
  }
  if (typeof value === "string" && value.startsWith("http")) {
    return "Image updated";
  }
  return String(value);
}

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function AuditLogItem({ log }) {
  const [open, setOpen] = useState(false);
  const config = ACTION_CONFIG[log.action] ?? {
    label: log.action,
    icon: ChevronDown,
    tone: "update",
  };
  const Icon = config.icon;
  const changes = log.details?.changes;
  const entries = changes ? Object.entries(changes).filter(([key]) => key !== "imagePublicId") : [];

  return (
    <div className="relative flex gap-3">
      <div className="flex flex-col items-center">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${TONE_CLASSES[config.tone]}`}
        >
          <Icon size={15} />
        </span>
        <span className="w-px flex-1 bg-border" />
      </div>

      <div className="flex-1 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <p className="text-sm text-card-foreground">
            <span className="font-medium">{config.label}</span>{" "}
            {changes?.name && (
              <span className="text-muted-foreground">"{changes.name}"</span>
            )}
          </p>
          <span className="text-xs text-muted-foreground">{timeAgo(log.createdAt)}</span>
        </div>

        <p className="mt-0.5 text-xs text-muted-foreground">
          {log.targetType} · ID ending {log.targetId.slice(-6)}
        </p>

        {entries.length > 0 && (
          <>
            <button
              onClick={() => setOpen((v) => !v)}
              className="mt-1.5 flex cursor-pointer items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
              {open ? "Hide details" : "View details"}
            </button>

            {open && (
              <div className="mt-2 space-y-1 rounded-lg border border-border bg-muted/50 p-3 text-xs">
                {entries.map(([key, value]) => (
                  <div key={key} className="flex gap-2">
                    <span className="w-24 shrink-0 font-medium capitalize text-muted-foreground">
                      {key}
                    </span>
                    <span className="text-card-foreground">{formatFieldValue(value)}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}