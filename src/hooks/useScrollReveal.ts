import { useEffect, useRef, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    // Skip animation for users who prefer reduced motion
    if (visible) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
    // `visible` is intentionally omitted – we only read it to bail out early
    // when reduced-motion is active; the observer should not re-attach.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold]);

  return { ref, visible };
}
