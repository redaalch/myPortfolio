import { useEffect, useState } from "react";
import logoSrc from "@/assets/logo.avif";

interface LoadingScreenProps {
  /** Minimum display time in ms (default: 1800) */
  minDuration?: number;
}

export default function LoadingScreen({
  minDuration = 1800,
}: LoadingScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), minDuration);
    const hideTimer = setTimeout(() => setHidden(true), minDuration + 600); // 600ms = CSS transition
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
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
        <img src={logoSrc} alt="" className="loader-logo" draggable={false} />
      </div>
    </div>
  );
}
