import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("lexi-theme") : null;
    const dark = stored ? stored === "dark" : true;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("lexi-theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/60 backdrop-blur transition-all hover:border-primary/50 hover:shadow-soft"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 text-foreground transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 text-foreground transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
