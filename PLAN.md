# Implementation Plan: Portfolio Revamp & VOID Downloader Cyber-Studio Showcase

## Executive Summary
This document defines the exact step-by-step engineering plan for revamping Anthony Wisnu Jati's personal portfolio at `C:\laragon\www\portofolio` (`anthonywj.my.id`). 

The revamp addresses three critical user requirements:
1. **Photo Top-Alignment Fix:** Resolve the vertical misalignment in the About/Narrative section so the portrait card aligns flush with the top of the narrative text.
2. **Professional English Localization:** Standardize all Indonesian text (Hero bio, Education details, section headers) into impactful, professional English.
3. **VOID Downloader Cyber-Studio Bento Grid Showcase:** Elevate the VOID Downloader project presentation into a high-tech, vibrant Cyber-Studio / Media Deck Console featuring authentic platform brand colors, an animated audio waveform visualizer, pipeline telemetry chips, and a live status monitor.

---

## User Review Required

> [!IMPORTANT]
> **Key Design Decisions:**
> 1. **Visual Style (Option A):** Cyber-Studio / Media Deck Console with high contrast, authentic platform branding (YouTube Red, TikTok Cyan/Magenta, Instagram Gradient, X White/Cyan), crosshair corner accents, and telemetry chips.
> 2. **No Generic Quick Demos:** Focus exclusively on high-fidelity architectural previews and visual fidelity rather than repetitive demo buttons.
> 3. **Bento Grid Architecture:** Multi-column modular layout detailing the video/audio ingestion pipeline, codec normalization, and production droplet telemetry.

---

## Proposed Changes

### Phase 1: Layout & Top-Alignment Fix in `AboutSection.tsx`

#### [AboutSection.tsx](file:///C:/laragon/www/portofolio/src/components/about/AboutSection.tsx)
- **Problem:** Line 27 uses `className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"`. Because the right column (`lg:col-span-8`) contains extensive text, 4 feature cards, and 2 education cards, the left column containing the photo (`lg:col-span-4`) is vertically centered, causing it to sink downward.
- **Solution:** 
  - Change `items-center` to `items-start`.
  - Add `sticky top-28` to the left photo card container so that on desktop screens, the portrait remains neatly in view alongside the narrative.
  - Adjust padding and margins to ensure the top edge of the portrait card aligns precisely with the top edge of the first paragraph.

---

### Phase 2: Copywriting & Localization to Full Professional English

#### [HeroSection.tsx](file:///C:/laragon/www/portofolio/src/components/hero/HeroSection.tsx)
- Replace Indonesian bio:
  - **Before:** `Fullstack dan Systems Engineer yang merancang perangkat lunak andal serta terukur. Berpengalaman membangun sistem otomasi terdistribusi, arsitektur temu kembali GraphRAG, dan aplikasi web modern yang siap produksi.`
  - **After:** `Fullstack & Systems Engineer crafting resilient, scalable software architectures. Experienced in engineering distributed multi-tenant daemons, GraphRAG hybrid retrieval systems, and production-ready modern web applications.`

#### [data/projects.ts](file:///C:/laragon/www/portofolio/src/data/projects.ts)
- Update `OWNER_INFO` fields:
  - `bio`: Convert from Indonesian summary to a concise, technical English bio highlighting software engineering, GraphRAG, distributed bots, and full-stack systems.
  - `education`:
    - `period: "2023 — Sekarang"` -> `period: "2023 — Present"`
    - `badge: "Pendidikan Tinggi"` -> `badge: "Higher Education"`
    - `badge: "Sekolah Menengah Atas"` -> `badge: "Secondary Education"`
    - `highlights`: Translate academic trajectory highlights to technical English focusing on Software Engineering, Distributed Systems, GraphRAG, and DevOps Automation.
  - Update `VOID Downloader` project metadata to reflect its multi-protocol engine (YouTube, TikTok, Instagram, X) and real-time codec normalization.

#### [AboutSection.tsx](file:///C:/laragon/www/portofolio/src/components/about/AboutSection.tsx)
- Line 117: Change `<span>Academic Trajectory // Pendidikan</span>` to `<span>Academic Trajectory</span>`.

---

### Phase 3: VOID Downloader Cyber-Studio Bento Grid Showcase

#### Create New Dedicated Showcase Component: `src/components/projects/VoidShowcaseDeck.tsx`
When VOID Downloader is selected in `ProjectsSection.tsx`, render a custom interactive Bento Grid Deck instead of a generic text card.

**Bento Grid Deck Components:**
1. **Console Telemetry Header:**
   - Monospace telemetry tags: `[SYS.01 // MEDIA INGESTION ENGINE]`, `PROTOCOL MATRIX (4/4)`, `PROD DEPLOY: UBUNTU VPS`.
   - Live Production Ping indicator: Animated green radar dot linking to `https://voiddl.my.id`.
2. **Platform Protocol Matrix (Authentic Brand Colors):**
   - **YouTube:** Official Red (`#FF0000`) icon, badge `1080p · SHORTS · MP3`, botguard-bypass cookie vault indicator.
   - **TikTok:** Official Neon Cyan (`#00F2FE`) and Magenta (`#FE2C55`), badge `NO-WM · SLIDES · AUDIO`.
   - **Instagram:** Official Sunset Gradient (`#E1306C` to `#833AB4`), badge `REELS · CAROUSEL · STORY`.
   - **X (Twitter):** Cyber White / Deep Sky (`#1D9BF0`), badge `ORIG PHOTO · GIF · VIDEO`.
3. **Audio Spectrum & Remuxing Waveform Simulator:**
   - Animated SVG/CSS audio waveform bars that simulate the 192k stereo MP3 audio extraction pipeline in real time.
4. **Architecture Telemetry Chips:**
   - `H.264 UNIVERSAL (FASTSTART)` - Codec transcode and moov atom optimization for iOS and Android compatibility.
   - `ZERO-LOG CDN PROXY` - Memory buffer proxying ensuring user IP privacy.
   - `DYNAMIC USER-AGENT SPOOFING` - Browser signature alignment bypassing datacenter scraper blocks.
5. **Action Console:**
   - "Launch Engine (voiddl.my.id)" primary CTA button with high-voltage red cyber aesthetic.
   - "Inspect Repository" secondary CTA linking to GitHub.

#### [ProjectsSection.tsx](file:///C:/laragon/www/portofolio/src/components/projects/ProjectsSection.tsx)
- Integrate `VoidShowcaseDeck` seamlessly when `activeProject.id === "void-downloader"`.
- Maintain clean fallback rendering for other projects (MinjiBot, PinFas, Scout-Football, Hotdog-Watersport).

---

### Phase 4: Verification & Build Validation

1. **TypeScript Type Check:**
   - Execute `npx tsc --noEmit` in `C:\laragon\www\portofolio` to verify zero type errors.
2. **Production Build Test:**
   - Run `npm run build` in `C:\laragon\www\portofolio` to guarantee that Next.js static and server components compile cleanly.
3. **Visual Verification:**
   - Inspect top-alignment of the portrait image in `AboutSection.tsx`.
   - Verify that all visible strings are cleanly in English.
   - Verify that the VOID Downloader showcase renders with vibrant, authentic brand colors and responsive bento grid geometry.

---

## Task List & Execution Order

- [ ] Save `PLAN.md` to `C:\laragon\www\portofolio\PLAN.md`.
- [ ] Fix photo alignment in `src/components/about/AboutSection.tsx` (`items-start` + sticky container).
- [ ] Translate all Indonesian copy in `src/components/hero/HeroSection.tsx` to professional English.
- [ ] Update `src/data/projects.ts` (owner bio, education info, VOID Downloader description in English).
- [ ] Remove `// Pendidikan` suffix in `src/components/about/AboutSection.tsx`.
- [ ] Create `src/components/projects/VoidShowcaseDeck.tsx` with Cyber-Studio Bento Grid and authentic platform brand colors.
- [ ] Wire `VoidShowcaseDeck.tsx` into `src/components/projects/ProjectsSection.tsx`.
- [ ] Run `npx tsc --noEmit` and `npm run build` to verify the build passes with 0 errors.
- [ ] Review diff with `git diff` and update the user.
