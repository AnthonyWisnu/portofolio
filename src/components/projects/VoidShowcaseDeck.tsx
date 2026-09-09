"use client";

import React, { useState, useEffect } from "react";
import { ExternalLink, Terminal, Cpu, Radio, Sparkles, Activity, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";

export function VoidShowcaseDeck() {
  const [pulseActive, setPulseActive] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseActive((prev) => !prev);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const protocols = [
    {
      id: "youtube",
      name: "YouTube",
      accent: "#FF0000",
      bgHover: "hover:border-red-500/80 hover:shadow-red-500/10",
      badge: "1080P · SHORTS · MP3",
      description: "Universal AV1/VP9 to H.264 video transcode with server-side Netscape cookie session vault.",
      codec: "AVC1 + M4A",
      icon: (
        <svg className="w-5 h-5 fill-[#FF0000] shrink-0" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      id: "tiktok",
      name: "TikTok",
      accent: "#00F2FE",
      bgHover: "hover:border-cyan-400/80 hover:shadow-cyan-500/10",
      badge: "NO-WM · SLIDES · AUDIO",
      description: "Lossless zero-watermark video extraction with multi-image photo slideshow reconstruction.",
      codec: "H.264 CLEAN",
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <path fill="#00F2FE" d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          <path fill="#FE2C55" d="M16.435 0c-.08 1.53.47 3.09 1.59 4.17 1.12 1.11 2.7 1.62 4.24 1.79v1.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07h2.01z" opacity="0.6" />
        </svg>
      ),
    },
    {
      id: "instagram",
      name: "Instagram",
      accent: "#E1306C",
      bgHover: "hover:border-pink-500/80 hover:shadow-pink-500/10",
      badge: "REELS · CAROUSEL · STORY",
      description: "Private session cookie rotation, multi-slide carousel parsing, and standalone reel audio scraper.",
      codec: "FASTSTART MP4",
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <defs>
            <radialGradient id="igGradDeck" cx="0.2" cy="1" r="1">
              <stop offset="0%" stopColor="#FFDD55" />
              <stop offset="50%" stopColor="#FF543E" />
              <stop offset="70%" stopColor="#C837AB" />
              <stop offset="100%" stopColor="#833AB4" />
            </radialGradient>
          </defs>
          <path fill="url(#igGradDeck)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      id: "x",
      name: "X (Twitter)",
      accent: "#1D9BF0",
      bgHover: "hover:border-blue-400/80 hover:shadow-blue-500/10",
      badge: "ORIG PHOTO · GIF · VIDEO",
      description: "HLS dynamic m3u8 playlist remuxing to MP4 and native resolution photo crawler.",
      codec: "ORIGINAL RES",
      icon: (
        <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  const waveformHeights = [
    30, 45, 75, 90, 60, 40, 85, 100, 70, 55, 40, 65, 80, 95, 85, 60, 40, 70, 90, 80, 50, 65, 85, 70, 45, 30, 60, 80
  ];

  return (
    <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-2xl text-white relative overflow-hidden space-y-7">
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-red-600/10 blur-3xl rounded-full pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-neutral-800/80 relative z-10">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-md bg-red-950/70 border border-red-500/40 text-red-400 font-mono text-[11px] font-bold tracking-wider flex items-center gap-2">
            <Terminal className="w-3 h-3 text-red-500" />
            <span>[SYS.01 // MEDIA INGESTION ENGINE]</span>
          </div>
          <span className="hidden sm:inline-block font-mono text-xs text-neutral-500">
            UBUNTU VPS // PM2 ORCHESTRATED
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-emerald-400 font-semibold">LIVE @ voiddl.my.id</span>
        </div>
      </div>

      {/* Hero Title & Subtext */}
      <div className="space-y-2 relative z-10">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
            VOID Downloader
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 font-medium">
              v2.0 PROD
            </span>
          </h3>
          <div className="font-mono text-xs text-neutral-400">
            PORT 3001 · ZERO-LOG BUFFER
          </div>
        </div>
        <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-2xl">
          A high-performance media extraction suite built to defeat datacenter scraper restrictions, botguard challenges, and mobile codec compatibility bugs across 4 major protocols.
        </p>
      </div>

      {/* Protocol Matrix Bento Grid */}
      <div className="space-y-3 relative z-10">
        <div className="flex items-center justify-between font-mono text-xs text-neutral-400">
          <span className="uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-red-500" />
            Active Protocol Ingestion Matrix (4/4)
          </span>
          <span className="text-neutral-500">REAL-TIME DECODER</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {protocols.map((p) => (
            <div
              key={p.id}
              className={`p-4 rounded-2xl border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-sm flex flex-col justify-between space-y-3 transition-all duration-300 group hover:-translate-y-1 hover:border-neutral-600 ${p.bgHover}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {p.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white tracking-tight">
                      {p.name}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-400">
                      {p.codec}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <span
                  className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wide border"
                  style={{
                    backgroundColor: `${p.accent}15`,
                    color: p.accent,
                    borderColor: `${p.accent}40`,
                  }}
                >
                  {p.badge}
                </span>
                <p className="text-xs text-neutral-400 leading-relaxed font-light line-clamp-2">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Bento Row: Audio Visualizer + Codec Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 relative z-10">
        {/* Audio Spectrum Deck */}
        <div className="lg:col-span-6 p-5 rounded-2xl border border-neutral-800 bg-neutral-900/40 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-xs font-semibold text-neutral-200 uppercase">
                Audio Extraction Stream
              </span>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
              192 KBPS · STEREO MP3
            </span>
          </div>

          {/* Animated Waveform Visualizer */}
          <div className="h-16 flex items-end justify-between gap-1 px-2 py-1 bg-neutral-950/80 rounded-xl border border-neutral-800/60">
            {waveformHeights.map((h, i) => (
              <div
                key={i}
                className="w-1.5 rounded-t-sm transition-all duration-500"
                style={{
                  height: `${pulseActive ? Math.max(15, h) : Math.max(15, (h * 1.3) % 100)}%`,
                  backgroundColor:
                    i % 3 === 0 ? "#FF0000" : i % 2 === 0 ? "#00F2FE" : "#E1306C",
                  opacity: 0.85,
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>FFMPEG NORMALIZATION</span>
            <span>44.1 KHZ · LAME ENCODER</span>
          </div>
        </div>

        {/* Video Codec Normalizer Specs */}
        <div className="lg:col-span-6 p-5 rounded-2xl border border-neutral-800 bg-neutral-900/40 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs font-semibold text-neutral-200 uppercase">
                Codec Sanitization Pipeline
              </span>
            </div>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
              H.264 UNIVERSAL
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono text-neutral-300">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/50">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>moov_atom faststart for instant iOS Safari playback</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/50">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Chromium user-agent spoofing bypassing bot challenge</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-950/60 border border-neutral-800/50">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Zero-log memory buffer preserving client privacy</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTAs and Links */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-neutral-800/80 relative z-10">
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://voiddl.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch Engine (voiddl.my.id)</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>

          <a
            href="https://github.com/AnthonyWisnu/void-downloader"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono uppercase tracking-wider border border-neutral-700 hover:bg-neutral-900 text-neutral-200 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Inspect Repository</span>
          </a>
        </div>

        <div className="font-mono text-xs text-neutral-500">
          STACK: NODE.JS · EXPRESS · YT-DLP · FFMPEG · NGINX · PM2
        </div>
      </div>
    </div>
  );
}
