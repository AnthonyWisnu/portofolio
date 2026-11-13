"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  external?: boolean;
  ariaLabel?: string;
  cursorLabel?: string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className,
  strength = 0.25,
  external = false,
  ariaLabel,
  cursorLabel,
}: MagneticButtonProps) {
  const reducedMotion = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bounds = useRef<DOMRect | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !wrapperRef.current) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    const rect = bounds.current;
    if (!rect) return;
    const offsetX = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const offsetY = (e.clientY - (rect.top + rect.height / 2)) * strength;
    wrapperRef.current.style.transform = `translate3d(${offsetX.toFixed(1)}px, ${offsetY.toFixed(1)}px, 0)`;
  };

  const handleMouseLeave = () => {
    if (!wrapperRef.current) return;
    wrapperRef.current.style.transform = "translate3d(0, 0, 0)";
    bounds.current = null;
  };

  const sharedProps = {
    className: cn(
      "inline-flex items-center justify-center gap-2 transition-transform duration-200 ease-out",
      className
    ),
    "aria-label": ariaLabel,
    "data-cursor-label": cursorLabel,
  };

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={() => { bounds.current = wrapperRef.current?.getBoundingClientRect() ?? null; }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block transition-transform duration-[var(--motion-hover)] ease-out"
    >
      {href ? (
        external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" {...sharedProps}>
            {children}
          </a>
        ) : href.startsWith("#") ? (
          <a href={href} {...sharedProps}>
            {children}
          </a>
        ) : (
          <Link href={href} {...sharedProps}>
            {children}
          </Link>
        )
      ) : (
        <button type="button" onClick={onClick} {...sharedProps}>
          {children}
        </button>
      )}
    </div>
  );
}
