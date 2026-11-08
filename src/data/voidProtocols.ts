import type { VoidPlatformSpec } from "@/types/project";

export const VOID_SUPPORTED_PLATFORMS: VoidPlatformSpec[] = [
  {
    id: "youtube",
    name: "YouTube",
    badge: "720P/1080P · SHORTS · MP3",
    codec: "AVC1 + M4A",
    description: "Adaptive stream H.264/AAC plus ekstraksi audio MP3 192 kbps berbekal Netscape cookie vault.",
    accent: "#DC2626",
  },
  {
    id: "tiktok",
    name: "TikTok",
    badge: "NO-WM · SLIDE 25 · AUDIO",
    codec: "H.264 FASTSTART",
    description: "Unduhan HD tanpa watermark hingga 70 menit serta rekonstruksi carousel hingga 25 foto.",
    accent: "#0891B2",
  },
  {
    id: "instagram",
    name: "Instagram",
    badge: "REELS · CAROUSEL · STORY",
    codec: "MP4 NORMALIZED",
    description: "Mendukung Reels, postingan tunggal, carousel multi-slide hingga 15 item, dan Instagram Story.",
    accent: "#C026D3",
  },
  {
    id: "x",
    name: "X (Twitter)",
    badge: "MIXED MEDIA · GIF · ORIG",
    codec: "HLS REMUX",
    description: "Penggabungan stream HLS m3u8 dan pengambilan foto resolusi asli hingga 10 media per tweet.",
    accent: "#2563EB",
  },
  {
    id: "pinterest",
    name: "Pinterest",
    badge: "HD MASTER · SHORTLINK",
    codec: "RAW IMAGE / MP4",
    description: "Resolusi asli gambar tanpa kompresi serta pelacakan otomatis shortlink pin.it.",
    accent: "#E11D48",
  },
  {
    id: "reddit",
    name: "Reddit",
    badge: "AUDIO SYNC · NO VPN",
    codec: "MERGED MP4",
    description: "Sinkronisasi otomatis video dan audio terpisah v.redd.it via server proxy bebas blokir.",
    accent: "#EA580C",
  },
];
