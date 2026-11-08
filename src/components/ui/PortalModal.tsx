"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectScreenshot } from "@/types/project";

const emptySubscribe = () => () => {};

interface PortalModalProps {
  screenshots: ProjectScreenshot[];
  initialIndex?: number;
  title: string;
  onClose: () => void;
}

export function PortalModal({
  screenshots,
  initialIndex = 0,
  title,
  onClose,
}: PortalModalProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    if (!mounted) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setIndex((cur) => (cur + 1) % screenshots.length);
      }
      if (e.key === "ArrowLeft") {
        setIndex((cur) => (cur - 1 + screenshots.length) % screenshots.length);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [mounted, screenshots.length, onClose]);

  if (!mounted || screenshots.length === 0) return null;

  const active = screenshots[index] || screenshots[0];

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Pratinjau gambar ${title}`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl bg-[#121620] border border-white/15 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10">
          <div className="min-w-0">
            <div className="text-xs font-mono text-[#708FFF] uppercase tracking-wider truncate">
              {title}
            </div>
            <div className="text-xs text-[#A1A8B8] truncate">{active.alt}</div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pratinjau"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#2F54EB] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative w-full aspect-[16/10] bg-[#0B0D12]">
          <Image
            src={active.src}
            alt={active.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-contain p-2 sm:p-4"
            priority
          />

          {screenshots.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setIndex((cur) => (cur - 1 + screenshots.length) % screenshots.length)}
                aria-label="Gambar sebelumnya"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0B0D12]/80 hover:bg-[#2F54EB] text-white border border-white/15 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setIndex((cur) => (cur + 1) % screenshots.length)}
                aria-label="Gambar berikutnya"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0B0D12]/80 hover:bg-[#2F54EB] text-white border border-white/15 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 sm:px-6 py-3.5 border-t border-white/10 text-xs text-[#A1A8B8]">
          <p className="leading-relaxed">{active.caption}</p>
          <span className="font-mono text-[#A1A8B8] shrink-0">
            {index + 1} / {screenshots.length}
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}
