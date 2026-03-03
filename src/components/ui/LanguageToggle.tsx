import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const LANGS = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
] as const;

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const current = i18n.language;

  const next = current === "fr" ? "en" : "fr";
  const nextLabel = LANGS.find((l) => l.code === next)!.label;

  return (
    <button
      onClick={() => i18n.changeLanguage(next)}
      aria-label={`Switch language to ${nextLabel}`}
      className="inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground/5 px-3 ring-1 ring-foreground/10 hover:bg-foreground/10 transition-colors text-xs font-semibold tracking-wide text-foreground/80 select-none"
    >
      <Globe className="h-3.5 w-3.5" />
      <span>{LANGS.find((l) => l.code === current)!.label}</span>
    </button>
  );
}
