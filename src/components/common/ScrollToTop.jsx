import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop({ containerRef, threshold = 300 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => setVisible(el.scrollTop > threshold);
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [containerRef, threshold]);

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`absolute bottom-6 right-6 z-40 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground hover:shadow-md ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <ArrowUp size={16} />
    </button>
  );
}