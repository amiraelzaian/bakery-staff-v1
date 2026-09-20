import { ImageOff } from "lucide-react";

export default function CategoryImage({ src, alt, size = 40 }) {
  if (!src) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground"
      >
        <ImageOff size={size * 0.45} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      style={{ width: size, height: size }}
      className="shrink-0 rounded-lg object-cover"
    />
  );
}