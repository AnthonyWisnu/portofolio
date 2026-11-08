"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { OWNER_PROFILE } from "@/data/owner";
import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  ThreadsIcon,
} from "@/components/ui/Icons";
import { cn } from "@/utils/cn";

const SOCIAL_ICON_MAP = {
  github: GithubIcon,
  instagram: InstagramIcon,
  threads: ThreadsIcon,
  facebook: FacebookIcon,
} as const;

export function ContactChannels() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(OWNER_PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${OWNER_PROFILE.email}`;
    }
  };

  return (
    <div className="space-y-5">
      {/* Kartu Email Langsung */}
      <div className="rounded-2xl bg-[#121620] border border-white/12 p-6 obsidian-card-shadow space-y-4">
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#708FFF] font-semibold">
          <Mail className="w-4 h-4" />
          <span>Email Langsung</span>
        </span>

        <div>
          <a
            href={`mailto:${OWNER_PROFILE.email}`}
            className="font-display text-lg sm:text-xl font-bold text-white hover:text-[#708FFF] transition-colors break-all"
          >
            {OWNER_PROFILE.email}
          </a>
        </div>

        <button
          type="button"
          onClick={handleCopyEmail}
          className={cn(
            "w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-mono font-medium transition-all cursor-pointer",
            copied
              ? "bg-emerald-600 border-emerald-500 text-white"
              : "bg-[#181D2B] border-white/12 text-[#F3F4F6] hover:border-[#708FFF]/60 hover:text-[#9FB4FF]"
          )}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Alamat Email Tersalin</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Salin Alamat Email</span>
            </>
          )}
        </button>
      </div>

      {/* Kartu Tautan Sosial */}
      <div className="rounded-2xl bg-[#121620] border border-white/12 p-6 obsidian-card-shadow space-y-3">
        <div className="font-mono text-[11px] uppercase tracking-widest text-[#A1A8B8]">
          Jejaring &amp; Kode Sumber
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {OWNER_PROFILE.socials.map((social) => {
            const Icon = SOCIAL_ICON_MAP[social.id];
            return (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-2 p-3 rounded-xl bg-[#181D2B] border border-white/10 hover:border-[#708FFF]/50 transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className="w-4 h-4 text-[#F3F4F6] group-hover:text-[#708FFF] transition-colors shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white truncate">
                      {social.label}
                    </div>
                    <div className="text-[11px] font-mono text-[#A1A8B8] truncate">
                      {social.handle}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#A1A8B8] group-hover:text-[#708FFF] shrink-0" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
