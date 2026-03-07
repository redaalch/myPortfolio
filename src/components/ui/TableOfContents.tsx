import { useEffect, useState, useRef, useCallback } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  /** CSS selector for the container whose headings to track */
  contentSelector?: string;
  /** Heading levels to include (default: h2, h3) */
  levels?: string;
}

function extractHeadings(contentSelector: string, levels: string): TocItem[] {
  const container = document.querySelector(contentSelector);
  if (!container) return [];

  const els = container.querySelectorAll(levels);
  const items: TocItem[] = [];

  els.forEach((el) => {
    if (el.id) {
      items.push({
        id: el.id,
        text: el.textContent ?? "",
        level: Number(el.tagName[1]),
      });
    }
  });

  return items;
}

export default function TableOfContents({
  contentSelector = ".blog-prose",
  levels = "h2, h3",
}: TableOfContentsProps) {
  const [headings] = useState<TocItem[]>(() => extractHeadings(contentSelector, levels));
  const [activeId, setActiveId] = useState<string>(() => headings[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection observer to track active heading
  const setupObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const callback: IntersectionObserverCallback = (entries) => {
      // Find the first heading that is intersecting (from top)
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0.1,
    });

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings]);

  useEffect(() => {
    if (headings.length === 0) return;
    return setupObserver();
  }, [headings, setupObserver]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="toc-nav">
      <ul className="space-y-1 text-sm">
        {headings.map(({ id, text, level }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(id);
                if (el) {
                  const prefersReduced = window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches;
                  el.scrollIntoView({
                    behavior: prefersReduced ? "auto" : "smooth",
                    block: "start",
                  });
                  // Update URL hash without scroll jump
                  window.history.replaceState(null, "", `#${id}`);
                  setActiveId(id);
                }
              }}
              className={`block py-1 transition-colors duration-200 border-l-2 ${
                level === 3 ? "pl-6" : "pl-3"
              } ${
                activeId === id
                  ? "border-purple-500 text-purple-600 dark:text-purple-400 font-medium"
                  : "border-transparent text-foreground/50 hover:text-foreground/80 hover:border-foreground/20"
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
