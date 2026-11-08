import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NAV_ITEMS, OWNER_PROFILE } from "@/data/owner";
import { FEATURED_PROJECTS } from "@/data/projects";
import { MonogramMark } from "@/components/ui/Icons";
import { cn } from "@/utils/cn";

interface FooterProps {
  variant?: "light" | "dark";
}

export function Footer({ variant = "dark" }: FooterProps) {
  const isDark = variant === "dark";

  return (
    <footer
      className={cn(
        "px-4 sm:px-8 lg:px-12 xl:px-16 pt-12 pb-10 border-t transition-colors",
        isDark
          ? "bg-[#0B0D12] text-[#F3F4F6] border-white/10"
          : "bg-[#F4F2EC] text-[#141519] border-[#DFDCD2]"
      )}
    >
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Identitas Pemilik */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <MonogramMark className="w-7 h-7 text-[#708FFF] transition-transform duration-300 group-hover:scale-105" />
              <span className="font-display text-lg font-bold tracking-tight">
                {OWNER_PROFILE.name}
              </span>
            </Link>
            <p
              className={cn(
                "text-sm leading-relaxed max-w-sm",
                isDark ? "text-[#A1A8B8]" : "text-[#4E5361]"
              )}
            >
              {OWNER_PROFILE.headlineIntro}
            </p>
            <div
              className={cn(
                "text-xs font-mono",
                isDark ? "text-[#A1A8B8]" : "text-[#4E5361]"
              )}
            >
              {OWNER_PROFILE.institution}
            </div>
          </div>

          {/* Tautan Bagian */}
          <div className="md:col-span-3 space-y-3">
            <div
              className={cn(
                "font-mono text-[11px] uppercase tracking-widest",
                isDark ? "text-[#708FFF]" : "text-[#2545D8]"
              )}
            >
              Navigasi
            </div>
            <ul className="space-y-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    href={isDark ? `/${item.href}` : item.href}
                    className={cn(
                      "transition-colors hover:text-[#708FFF]",
                      isDark ? "text-[#D1D5DB]" : "text-[#374151]"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tautan Karya Utama */}
          <div className="md:col-span-4 space-y-3">
            <div
              className={cn(
                "font-mono text-[11px] uppercase tracking-widest",
                isDark ? "text-[#708FFF]" : "text-[#2545D8]"
              )}
            >
              Proyek Utama
            </div>
            <ul className="space-y-2 text-sm">
              {FEATURED_PROJECTS.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className={cn(
                      "inline-flex items-center gap-1 transition-colors hover:text-[#708FFF]",
                      isDark ? "text-[#D1D5DB]" : "text-[#374151]"
                    )}
                  >
                    <span>{project.shortTitle}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-65" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={cn(
            "pt-6 border-t text-xs font-mono",
            isDark
              ? "border-white/10 text-[#A1A8B8]"
              : "border-[#DFDCD2] text-[#4E5361]"
          )}
        >
          &copy; {new Date().getFullYear()} {OWNER_PROFILE.name}
        </div>
      </div>
    </footer>
  );
}
