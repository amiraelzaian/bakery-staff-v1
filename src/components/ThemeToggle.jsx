

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";

export default function ThemeToggle() {
  const {resolvedTheme,setTheme}=useTheme();




  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card p-0">
      <button
        onClick={() => setTheme("light")}
        className={`rounded-full p-2 transition ${
          resolvedTheme === "light"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Light mode"
      >
        <Sun className="h-4 w-4" />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`rounded-full p-2 transition ${
          resolvedTheme === "dark"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Dark mode"
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
}