import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5 ring-1 ring-foreground/10 hover:bg-foreground/10 transition-colors"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-foreground/80" />
      ) : (
        <Moon className="h-4 w-4 text-foreground/80" />
      )}
    </button>
  );
}
