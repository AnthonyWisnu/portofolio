"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MonogramMark } from "@/components/ui/Icons";

const PRELOADER_STORAGE_KEY = "awj_intro_seen_v1";
const emptySubscribe = () => () => {};

export function PreloaderGate() {
  const reducedMotion = useReducedMotion();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [dismissed, setDismissed] = useState(false);
  const [progress, setProgress] = useState(0);

  const alreadySeen =
    mounted && typeof window !== "undefined"
      ? window.sessionStorage.getItem(PRELOADER_STORAGE_KEY) === "1"
      : false;
  const visible = mounted && !reducedMotion && !dismissed && !alreadySeen;

  useEffect(() => {
    if (!visible) return;

    let current = 0;
    const timer = window.setInterval(() => {
      current += current < 70 ? 12 : current < 95 ? 8 : 5;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        window.clearInterval(timer);
        window.sessionStorage.setItem(PRELOADER_STORAGE_KEY, "1");
        window.setTimeout(() => setDismissed(true), 220);
      } else {
        setProgress(current);
      }
    }, 80);

    return () => window.clearInterval(timer);
  }, [visible]);

  const handleSkip = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(PRELOADER_STORAGE_KEY, "1");
    }
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0.96, transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] bg-[#0B0D12] text-[#F3F4F6] flex flex-col justify-between p-6 sm:p-10 lg:p-14"
          role="dialog"
          aria-label="Layar pembuka portofolio"
        >
          <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF]">
            <div className="flex items-center gap-2.5">
              <MonogramMark className="w-6 h-6 text-[#597EF7]" />
              <span className="tracking-widest uppercase">AWJ // PORTOFOLIO</span>
            </div>

            <button
              type="button"
              onClick={handleSkip}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 hover:border-[#597EF7] text-xs font-mono text-[#E5E7EB] hover:text-white transition-colors cursor-pointer"
            >
              <span>Lewati</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="my-auto max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2F54EB]/40 bg-[#2F54EB]/10 text-[11px] font-mono text-[#85A5FF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#597EF7]" />
              <span>INISIALISASI KARYA &amp; ARSITEKTUR</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.06]">
              Anthony Wisnu Jati
            </h2>
            <p className="text-sm sm:text-base text-[#9CA3AF] max-w-xl leading-relaxed">
              Memuat panggung 3D interaktif, dokumentasi proyek nyata, dan narasi rekayasa perangkat lunak.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-end justify-between font-mono">
              <span className="text-xs uppercase tracking-widest text-[#64748B]">
                anthonywj.my.id
              </span>
              <span className="text-2xl sm:text-4xl font-display font-bold tabular-nums text-[#F3F4F6]">
                {String(progress).padStart(2, "0")}%
              </span>
            </div>
            <div className="w-full h-[2px] bg-white/10 overflow-hidden rounded-full">
              <div
                className="h-full bg-[#2F54EB] transition-[width] duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
