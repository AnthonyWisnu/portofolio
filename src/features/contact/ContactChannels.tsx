"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Globe, Mail, MapPin } from "lucide-react";
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
      <div className="rounded-2xl bg-white border border-[#E4E1D8] p-6 soft-card-shadow space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#2F54EB] font-semibold">
            <Mail className="w-4 h-4" />
            <span>Email Langsung</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono text-[#0F766E]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Aktif
          </span>
        </div>

        <div>
          <a
            href={`mailto:${OWNER_PROFILE.email}`}
            className="font-display text-lg sm:text-xl font-bold text-[#141519] hover:text-[#2F54EB] transition-colors break-all"
          >
            {OWNER_PROFILE.email}
          </a>
          <p className="text-xs text-[#52555E] mt-1 leading-relaxed">
            Salin alamat untuk diskusi teknis, kolaborasi sistem web, atau peninjauan repositori.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyEmail}
          className={cn(
            "w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-mono font-medium transition-all cursor-pointer",
            copied
              ? "bg-emerald-600 border-emerald-600 text-white"
              : "bg-[#F5F4EF] border-[#E4E1D8] text-[#141519] hover:border-[#2F54EB]/50 hover:text-[#2F54EB]"
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

      {/* Kartu Domisili & Kanal Sosial */}
      <div className="rounded-2xl bg-white border border-[#E4E1D8] p-6 soft-card-shadow space-y-5">
        <div className="space-y-3 pb-4 border-b border-[#ECEAE3] text-xs text-[#52555E]">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#2F54EB] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[#141519]">{OWNER_PROFILE.location}</div>
              <div>{OWNER_PROFILE.institution} · Asal {OWNER_PROFILE.origin}</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-[#2F54EB] shrink-0" />
            <span className="font-mono text-[#141519]">{OWNER_PROFILE.domain}</span>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="font-mono text-[11px] uppercase tracking-widest text-[#71717A]">
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
                  className="group flex items-center justify-between gap-2 p-3 rounded-xl bg-[#F5F4EF] border border-[#E4E1D8] hover:border-[#2F54EB]/50 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 text-[#141519] group-hover:text-[#2F54EB] transition-colors shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-[#141519] truncate">
                        {social.label}
                      </div>
                      <div className="text-[11px] font-mono text-[#52555E] truncate">
                        {social.handle}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#71717A] group-hover:text-[#2F54EB] shrink-0" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
