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

export function Navbar() {
  const pathname = usePathname();
  const isDetailPage = pathname.startsWith("/projects/");
  const { activeId, isLightSurface } = useScrollSpy(SECTION_IDS);

  const navContainerClass = isLightSurface && !isDetailPage
    ? "bg-white/80 text-[#141519] border-[#E4E1D8] shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
    : "bg-[#11141C]/80 text-[#F3F4F6] border-white/12 shadow-[0_8px_30px_rgba(0,0,0,0.4)]";

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <div
          className={cn(
            "pointer-events-auto flex items-center justify-between gap-1.5 sm:gap-4 rounded-full px-2 sm:px-4 py-1.5 sm:py-2 border backdrop-blur-xl transition-colors duration-300 w-full sm:w-auto max-w-full",
            navContainerClass
          )}
        >
          {/* Identitas Monogram */}
          <Link
            href="/"
            className="flex items-center gap-2 pl-1 pr-1 sm:pl-1.5 sm:pr-2 py-1 rounded-full shrink-0 group"
            aria-label="Beranda Anthony Wisnu Jati"
          >
            <MonogramMark className="w-5 h-5 sm:w-6 sm:h-6 text-[#2F54EB] transition-transform duration-300 group-hover:scale-105" />
            <span className="hidden lg:inline font-display text-xs font-bold tracking-wide">
              {OWNER_PROFILE.shortName}
            </span>
          </Link>

          {/* Tautan Navigasi Utama (Tetap Tampil di Mobile dan Desktop) */}
          {isDetailPage ? (
            <nav aria-label="Navigasi Halaman Detail" className="flex items-center gap-2">
              <Link
                href="/#projects"
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
                      "relative px-2 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-medium whitespace-nowrap transition-colors",
                      isActive
                        ? "text-white"
                        : isLightSurface
                        ? "text-[#52555E] hover:text-[#141519]"
                        : "text-[#9CA3AF] hover:text-white"
                    )}
                  >
                    {isActive && (
                      <m.span
                        layoutId="nav-active-pill"
                        transition={{ type: "spring", stiffness: 320, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-[#2F54EB] -z-10 shadow-[0_2px_10px_rgba(47,84,235,0.4)]"
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
              className={cn(
                "hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors border",
                isLightSurface && !isDetailPage
                  ? "border-[#E4E1D8] bg-[#F5F4EF] text-[#141519] hover:border-[#2F54EB]/40"
                  : "border-white/10 bg-white/5 text-[#E5E7EB] hover:bg-white/10"
              )}
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span className="hidden md:inline">GitHub</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>

            <a
              href={isDetailPage ? "/#contact" : "#contact"}
              aria-label="Kirim Pesan"
              className={cn(
                "hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                isLightSurface && !isDetailPage
                  ? "bg-[#141519] text-white hover:bg-[#2F54EB]"
                  : "bg-white text-[#0B0D12] hover:bg-[#E5E7EB]"
              )}
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
