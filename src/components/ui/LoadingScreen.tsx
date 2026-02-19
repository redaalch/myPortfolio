import { useEffect, useState } from "react";
import logoSrc from "@/assets/logo.avif";

interface LoadingScreenProps {
  /**
   * Minimum display time in ms (default: 300).
   * Prevents a jarring flash on fast connections while still
   * dismissing as soon as the page is genuinely ready.
   */
  minDuration?: number;
}

export default function LoadingScreen({ minDuration = 300 }: LoadingScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const start = Date.now();
    let cancelled = false;

    // Real readiness: fonts rendered + all initial resources loaded
    // (covers preloaded hero image, JS chunks, CSS)
    const pageLoaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((r) => window.addEventListener("load", () => r(), { once: true }));

    const ready = Promise.all([document.fonts.ready, pageLoaded]);

    ready.then(() => {
      if (cancelled) return;
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, minDuration - elapsed);

      setTimeout(() => {
        if (!cancelled) setFadeOut(true);
      }, remaining);
      setTimeout(() => {
        if (!cancelled) setHidden(true);
      }, remaining + 600); // 600ms matches CSS transition
    });

    return () => {
      cancelled = true;
    };
  }, [minDuration]);

  if (hidden) return null;

  return (
    <div className={`loading-screen${fadeOut ? " fade-out" : ""}`}>
      <div className="loader-container">
        <div className="loader-box" />
        <div className="loader-box" />
        <div className="loader-box" />
        <div className="loader-box" />
        <div className="loader-box" />
        <img
          src={logoSrc}
          alt=""
          width={60}
          height={60}
          className="loader-logo"
          draggable={false}
        />
      </div>
    </div>
  );
}
