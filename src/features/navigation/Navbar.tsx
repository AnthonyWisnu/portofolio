"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import { NAV_ITEMS, OWNER_PROFILE } from "@/data/owner";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { GithubIcon, MonogramMark } from "@/components/ui/Icons";
import { cn } from "@/utils/cn";

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);
const SECTION_ALIAS_MAP: Record<string, string> = {
  "projects-showcase": "projects",
};

export function Navbar() {
  const pathname = usePathname();
  const isDetailPage = pathname.startsWith("/projects/");
  const activeId = useScrollSpy(SECTION_IDS, SECTION_ALIAS_MAP);

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-5xl mx-auto flex items-center justify-center">
        <div className="pointer-events-auto flex items-center justify-between gap-1.5 sm:gap-4 rounded-full px-2 sm:px-4 py-1.5 sm:py-2 border border-white/12 bg-[#0F131C]/92 text-[#F3F4F6] backdrop-blur-md shadow-[0_10px_32px_rgba(0,0,0,0.45)] w-full sm:w-auto max-w-full">
          {/* Identitas Monogram */}
          <Link
            href="/"
            className="flex items-center gap-2 pl-1 pr-1 sm:pl-1.5 sm:pr-2 py-1 rounded-full shrink-0 group"
            aria-label="Beranda Anthony Wisnu Jati"
          >
            <MonogramMark className="w-5 h-5 sm:w-6 sm:h-6 text-[#708FFF] transition-transform duration-300 group-hover:scale-105" />
            <span className="hidden lg:inline font-display text-xs font-bold tracking-wide text-[#F3F4F6]">
              {OWNER_PROFILE.shortName}
            </span>
          </Link>

          {/* Tautan Navigasi Utama */}
          {isDetailPage ? (
            <nav aria-label="Navigasi Halaman Detail" className="flex items-center gap-2">
              <Link
                href="/#projects-showcase"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#2F54EB] text-white hover:bg-[#2342C8] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Daftar Proyek</span>
              </Link>
            </nav>
          ) : (
            <nav
              aria-label="Navigasi Utama"
              className="flex items-center justify-between sm:justify-start gap-0 sm:gap-1 overflow-x-auto no-scrollbar"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className={cn(
                      "relative px-2.5 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-medium whitespace-nowrap transition-colors",
                      isActive ? "text-white" : "text-[#A1A8B8] hover:text-white"
                    )}
                  >
                    {isActive && (
                      <m.span
                        layoutId="nav-active-pill"
                        transition={{ type: "spring", stiffness: 320, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-[#2F54EB] -z-10 shadow-[0_2px_12px_rgba(47,84,235,0.45)]"
                      />
                    )}
                    <span className="sm:hidden">{item.shortLabel}</span>
                    <span className="hidden sm:inline">{item.label}</span>
                  </a>
                );
              })}
            </nav>
          )}

          {/* Aksi Cepat GitHub dan Kontak */}
          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={OWNER_PROFILE.socials[0].url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil GitHub Anthony Wisnu"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors border border-white/12 bg-white/[0.04] text-[#F3F4F6] hover:border-[#708FFF]/50 hover:bg-white/[0.08]"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span className="hidden md:inline">GitHub</span>
              <ArrowUpRight className="w-3 h-3 opacity-70" />
            </a>

            <a
              href={isDetailPage ? "/#contact" : "#contact"}
              aria-label="Kirim Pesan"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors bg-[#2F54EB] text-white hover:bg-[#2342C8]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Hubungi</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
