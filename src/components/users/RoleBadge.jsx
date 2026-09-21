import { ROLE_BADGE_CLASSES } from "./roleConfig";

export default function RoleBadge({ role }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
        ROLE_BADGE_CLASSES[role] ?? "bg-muted text-muted-foreground"
      }`}
    >
      {role}
    </span>
  );
}