"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(
  sectionIds: string[],
  aliasMap: Record<string, string> = {}
): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || "hero");
  const idsKey = sectionIds.join(",");
  const aliasKey = JSON.stringify(aliasMap);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const parsedAliases = JSON.parse(aliasKey) as Record<string, string>;
    const observedIds = Array.from(
      new Set([...(idsKey ? idsKey.split(",") : []), ...Object.keys(parsedAliases)])
    );
    const elements = observedIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const visibleHeights = new Map<string, number>();

    const updateActive = () => {
      if (window.scrollY < 100 && observedIds[0]) {
        const mapped = parsedAliases[observedIds[0]] || observedIds[0];
        setActiveId((prev) => (prev === mapped ? prev : mapped));
        return;
      }

      let bestRawId = "";
      let bestScore = -1;
      for (const el of elements) {
        const visibleHeight = visibleHeights.get(el.id) ?? 0;
        if (visibleHeight <= 0) continue;
        if (visibleHeight > bestScore) {
          bestScore = visibleHeight;
          bestRawId = el.id;
        }
      }

      if (bestRawId) {
        const nextActive = parsedAliases[bestRawId] || bestRawId;
        setActiveId((prev) => (prev === nextActive ? prev : nextActive));
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Gunakan intersectionRect dari browser tanpa memicu layout reflow manual
          visibleHeights.set(
            entry.target.id,
            entry.isIntersecting ? Math.max(1, entry.intersectionRect.height) : 0
          );
        }
        updateActive();
      },
      {
        rootMargin: "-20% 0px -30% 0px",
        threshold: [0, 0.05, 0.25],
      }
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
    };
  }, [idsKey, aliasKey]);

  return activeId;
}
