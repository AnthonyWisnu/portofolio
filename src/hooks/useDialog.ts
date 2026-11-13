"use client";

import { useEffect, type RefObject } from "react";
import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";

const FOCUSABLE = 'button:not([disabled]), a[href], input:not([disabled]), [tabindex="0"]';

export function useDialog(
  dialog: RefObject<HTMLDivElement | null>,
  active: boolean,
  onClose: () => void,
  onStep: (step: number) => void,
) {
  const { lock } = useSmoothScroll();
  useEffect(() => {
    const element = dialog.current;
    if (!active || !element) return;
    const previousFocus = document.activeElement;
    const unlock = lock();
    const siblings = Array.from(document.body.children)
      .filter((child): child is HTMLElement => child instanceof HTMLElement && !child.contains(element));
    const previousInert = siblings.map((child) => child.inert);
    siblings.forEach((child) => { child.inert = true; });
    element.querySelector<HTMLElement>(FOCUSABLE)?.focus({ preventScroll: true });
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); }
      if (event.key === "ArrowRight") { event.preventDefault(); onStep(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); onStep(-1); }
      if (event.key !== "Tab") return;
      const items = Array.from(element.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      siblings.forEach((child, index) => { child.inert = previousInert[index]; });
      unlock();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [active, dialog, lock, onClose, onStep]);
}
