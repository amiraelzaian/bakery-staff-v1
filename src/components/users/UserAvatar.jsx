import { User } from "lucide-react";

export default function UserAvatar({ src, alt, size = 40 }) {
  if (!src) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground"
      >
        <User size={size * 0.5} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      style={{ width: size, height: size }}
      className="shrink-0 rounded-full object-cover"
    />
  );
}