import Link from "next/link";
import { OWNER_PROFILE } from "@/data/owner";
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
        "px-4 sm:px-8 lg:px-12 xl:px-16 py-8 border-t transition-colors",
        isDark
          ? "bg-[#0B0D12] text-[#F3F4F6] border-white/10"
          : "bg-[#F4F2EC] text-[#141519] border-[#DFDCD2]"
      )}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <MonogramMark className="w-8 h-8 shrink-0 transition-transform group-hover:scale-105" />
          <span className="font-display text-base font-bold tracking-tight">
            {OWNER_PROFILE.name}
          </span>
        </Link>

        <div
          className={cn(
            "text-xs font-mono",
            isDark ? "text-[#A1A8B8]" : "text-[#4E5361]"
          )}
        >
          &copy; {new Date().getFullYear()} {OWNER_PROFILE.name}
        </div>
      </div>
    </footer>
  );
}
