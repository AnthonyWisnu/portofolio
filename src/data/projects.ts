export interface ProjectTheme {
  accent: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  activeBorder: string;
  activeRing: string;
  hoverText: string;
  iconText: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: "Automation & SaaS" | "AI & Data Systems" | "Web Applications" | "DevOps & Utilities";
  theme: ProjectTheme;
  problem: string;
  solution: string;
  highlights: string[];
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  statsLabel?: string;
  statsValue?: string;
}

export interface ArchiveProject {
  id: string;
  title: string;
  description: string;
  category: "Financial Systems" | "Business & ERP" | "AI & Financial Bots" | string;
  techStack: string[];
  githubUrl: string;
}

// Exactly 5 Primary Showcase Projects in Anthony\'s prioritized sequence:
// 01. VOID Downloader (Cyber Red)
// 02. MinjiBot (Emerald Lime)
// 03. PinFas (Golden Amber)
// 04. scout-football (Cyber Violet)
// 05. Hot Dog Watersport (Ocean Cyan)
export const PRIMARY_PROJECTS: Project[] = [
  {
    id: "void-downloader",
    title: "VOID Downloader",
    tagline: "High-Performance Cyber-Studio Media Extraction Engine",
    category: "DevOps & Utilities",
    theme: {
      accent: "#EF4444",
      badgeBg: "bg-red-500/10 dark:bg-red-950/50",
      badgeText: "text-red-600 dark:text-red-400",
      badgeBorder: "border-red-500/30",
      activeBorder: "border-red-500/80 dark:border-red-500/80",
      activeRing: "ring-red-500/20 shadow-red-500/5",
      hoverText: "group-hover:text-red-600 dark:group-hover:text-red-400",
      iconText: "text-red-600 dark:text-red-500",
    },
    problem:
      "Extracting media from multi-protocol platforms (YouTube, TikTok, Instagram, X) often fails due to aggressive bot detection, data center IP blocks, and fragmented non-streamable video codecs.",
    solution:
      "Engineered an ultra-fast Cyber-Studio media ingestion engine with server-side cookie vault management, dynamic browser User-Agent spoofing, and automated FFmpeg H.264 Universal faststart transcoding, deployed with Nginx and PM2 on Ubuntu VPS.",
    highlights: [
      "Cyber-Studio Media Deck Console with authentic platform brand matrix",
      "Botguard challenge bypass with browser header spoofing and server cookie vaults",
      "Universal codec transcoding (H.264 FastStart + 192k Stereo MP3 audio extraction)",
      "Zero-log memory buffer proxy architecture ensuring complete user anonymity",
    ],
    techStack: [
      "React",
      "Node.js",
      "Express",
      "yt-dlp",
      "FFmpeg",
      "Nginx",
      "PM2",
      "Ubuntu VPS",
    ],
    githubUrl: "https://github.com/AnthonyWisnu/void-downloader",
    liveUrl: "https://voiddl.my.id",
    statsLabel: "Style",
    statsValue: "Cyber Deck",
  },
  {
    id: "minjibot",
    title: "MinjiBot",
    tagline: "Multi-Tenant WhatsApp Bot & Automation SaaS Platform",
    category: "Automation & SaaS",
    theme: {
      accent: "#10B981",
      badgeBg: "bg-emerald-500/10 dark:bg-emerald-950/50",
      badgeText: "text-emerald-600 dark:text-emerald-400",
      badgeBorder: "border-emerald-500/30",
      activeBorder: "border-emerald-500/80 dark:border-emerald-500/80",
      activeRing: "ring-emerald-500/20 shadow-emerald-500/5",
      hoverText: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
      iconText: "text-emerald-600 dark:text-emerald-500",
    },
    problem:
      "Managing community WhatsApp groups requires continuous moderation, anti-raid defense, and activity tracking without risking server downtime or code coupling.",
    solution:
      "Engineered an enterprise-grade multi-tenant automation bot with a modular interceptor pipeline, tenant role guards, PostgreSQL ledger via Prisma ORM, media converter services, and an automated CI/CD deployment pipeline with PM2 zero-downtime reloads.",
    highlights: [
      "Modular Interceptor Pipeline (AntiRaid, AntiDelete, AntiSpam)",
      "Strict automated test suite with 314 passing unit & integration tests",
      "Automated CI/CD workflow deploying to Linux VPS via GitHub Actions & PM2",
    ],
    techStack: [
      "TypeScript",
      "Node.js",
      "Prisma ORM",
      "PostgreSQL",
      "Baileys",
      "FFmpeg",
      "yt-dlp",
      "GitHub Actions",
    ],
    githubUrl: "https://github.com/AnthonyWisnu/MinjiBot",
    statsLabel: "Test Suite",
    statsValue: "314 Passed",
  },
  {
    id: "pinfas",
    title: "PinFas",
    tagline: "Public Village & Kelurahan Facility Asset Booking Platform",
    category: "Web Applications",
    theme: {
      accent: "#F59E0B",
      badgeBg: "bg-amber-500/10 dark:bg-amber-950/50",
      badgeText: "text-amber-600 dark:text-amber-400",
      badgeBorder: "border-amber-500/30",
      activeBorder: "border-amber-500/80 dark:border-amber-500/80",
      activeRing: "ring-amber-500/20 shadow-amber-500/5",
      hoverText: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
      iconText: "text-amber-600 dark:text-amber-500",
    },
    problem:
      "Traditional public facility reservations in local villages (Banjar/Desa) are hindered by bureaucratic paperwork, unverified resident identities, and fragmented physical payment proofs.",
    solution:
      "Developed a comprehensive public asset borrowing web app supporting no-login citizen requests, KTP verification workflows, dynamic official PDF authorization permit generation with QR code verification, and multi-tier role access (Admin Desa, Lurah, Kelian Banjar).",
    highlights: [
      "Role-Based Access Control (RLS) and custom Postgres RPC in Supabase",
      "Dynamic PDF permit generator with tamper-resistant verification QR",
      "Full audit trail for 35 village and Banjar public assets",
    ],
    techStack: [
      "React 18",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "@react-pdf/renderer",
      "Recharts",
    ],
    githubUrl: "https://github.com/AnthonyWisnu/PinFas",
    statsLabel: "Public Assets",
    statsValue: "35 Managed",
  },
  {
    id: "scout-football",
    title: "scout-football (RAG-STKI)",
    tagline: "Hybrid GraphRAG & Vector Retrieval Valuation System",
    category: "AI & Data Systems",
    theme: {
      accent: "#A855F7",
      badgeBg: "bg-purple-500/10 dark:bg-purple-950/50",
      badgeText: "text-purple-600 dark:text-purple-400",
      badgeBorder: "border-purple-500/30",
      activeBorder: "border-purple-500/80 dark:border-purple-500/80",
      activeRing: "ring-purple-500/20 shadow-purple-500/5",
      hoverText: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
      iconText: "text-purple-600 dark:text-purple-500",
    },
    problem:
      "Traditional scouting systems either suffer from LLM hallucinations or lack relational reasoning when comparing multi-dimensional player statistics and market values across top European leagues.",
    solution:
      "Built a hybrid GraphRAG scouting and valuation platform combining a Neo4j Knowledge Graph for relational ranking queries with ChromaDB vector search for unstructured scouting profiles, evaluated with a 20-query gold standard rubric using RAGAS.",
    highlights: [
      "Knowledge Graph ETL pipeline scraping FBref & Transfermarkt datasets",
      "100% pass rate on 20 gold query evaluation metrics",
      "Interactive comparison radar and valuation reasoning engine",
    ],
    techStack: [
      "Next.js",
      "Python",
      "FastAPI",
      "Neo4j",
      "ChromaDB",
      "OpenAI",
      "RAGAS",
      "Tailwind CSS",
    ],
    githubUrl: "https://github.com/AnthonyWisnu/scout-football",
    statsLabel: "Eval Pass Rate",
    statsValue: "100%",
  },
  {
    id: "hotdog-watersport",
    title: "Hot Dog Watersport",
    tagline: "Commercial Web Platform for Water Sports Rental",
    category: "Web Applications",
    theme: {
      accent: "#06B6D4",
      badgeBg: "bg-cyan-500/10 dark:bg-cyan-950/50",
      badgeText: "text-cyan-600 dark:text-cyan-400",
      badgeBorder: "border-cyan-500/30",
      activeBorder: "border-cyan-500/80 dark:border-cyan-500/80",
      activeRing: "ring-cyan-500/20 shadow-cyan-500/5",
      hoverText: "group-hover:text-cyan-600 dark:group-hover:text-cyan-400",
      iconText: "text-cyan-600 dark:text-cyan-500",
    },
    problem:
      "Local marine tourism businesses require fast, high-converting mobile web experiences with direct booking pathways and discoverable local SEO.",
    solution:
      "Designed and deployed a responsive commercial website for PT Hot Dog Water Sport and Dive Center in Benoa, Bali featuring direct WhatsApp booking pipelines, filterable media galleries, and structured JSON-LD SEO schema.",
    highlights: [
      "Sub-second load times with next/image responsive optimization",
      "One-click WhatsApp booking conversion flow",
      "Full JSON-LD structured schema for search engine indexing",
    ],
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "Lucide React",
    ],
    githubUrl: "https://github.com/AnthonyWisnu/hotdog-watersport",
    statsLabel: "Location",
    statsValue: "Benoa, Bali",
  },
];

// Alias for backwards-compatibility
export const PROJECTS = PRIMARY_PROJECTS;

// Supporting & Academic Archive Projects
export const ARCHIVED_PROJECTS: ArchiveProject[] = [
  {
    id: "stock-screener",
    title: "IDX Stock Screener",
    description:
      "Indonesian stock exchange (IDX) screener utilizing an asynchronous pre-computed flat-table architecture with scheduled OHLCV data pipelines and candlestick charts.",
    category: "Financial Systems",
    techStack: ["React", "FastAPI", "Python", "Supabase", "APScheduler", "yfinance"],
    githubUrl: "https://github.com/AnthonyWisnu/Stock-Screener",
  },
  {
    id: "mebel-management",
    title: "Mebel Management System",
    description:
      "Integrated operational & financial management system for custom furniture businesses: order pipelines, automated receivables, attendance, payroll, and cashflow analytics.",
    category: "Business & ERP",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "SheetJS"],
    githubUrl: "https://github.com/AnthonyWisnu/Mebel-Management",
  },
  {
    id: "bot-telegram-finance",
    title: "Telegram AI Finance Assistant",
    description:
      "Privacy-first personal finance system via Telegram bot with multimodal AI parsing (Whisper voice & GPT-4 Vision receipt extraction) and dual React dashboards with Supabase RLS.",
    category: "AI & Financial Bots",
    techStack: ["FastAPI", "Python", "Telegram Bot API", "OpenAI Whisper/Vision", "Supabase RLS", "React"],
    githubUrl: "https://github.com/AnthonyWisnu/Bot-Telegram-Finance",
  },
];

export const SKILL_CATEGORIES = [
  {
    name: "Languages",
    color: "#06B6D4",
    tag: "CYAN_DECODER",
    activeClass: "bg-cyan-600 text-white shadow-md shadow-cyan-600/30",
    borderHover: "hover:border-cyan-500/50 hover:bg-cyan-50/20 dark:hover:bg-cyan-950/20",
    iconColor: "text-cyan-500",
    sparkleColor: "text-cyan-400",
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"],
  },
  {
    name: "Frontend Engineering",
    color: "#A855F7",
    tag: "VIOLET_CANVAS",
    activeClass: "bg-purple-600 text-white shadow-md shadow-purple-600/30",
    borderHover: "hover:border-purple-500/50 hover:bg-purple-50/20 dark:hover:bg-purple-950/20",
    iconColor: "text-purple-500",
    sparkleColor: "text-purple-400",
    skills: [
      "React",
      "Next.js (App Router)",
      "Three.js / React Three Fiber",
      "Tailwind CSS",
      "GSAP / ScrollTrigger",
      "Vite",
    ],
  },
  {
    name: "Backend & Systems",
    color: "#10B981",
    tag: "EMERALD_DAEMON",
    activeClass: "bg-emerald-600 text-white shadow-md shadow-emerald-600/30",
    borderHover: "hover:border-emerald-500/50 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20",
    iconColor: "text-emerald-500",
    sparkleColor: "text-emerald-400",
    skills: [
      "Node.js",
      "Express",
      "FastAPI",
      "Prisma ORM",
      "PostgreSQL",
      "RESTful APIs",
    ],
  },
  {
    name: "AI & Graph Systems",
    color: "#F59E0B",
    tag: "AMBER_RETRIEVAL",
    activeClass: "bg-amber-500 text-white shadow-md shadow-amber-500/30",
    borderHover: "hover:border-amber-500/50 hover:bg-amber-50/20 dark:hover:bg-amber-950/20",
    iconColor: "text-amber-500",
    sparkleColor: "text-amber-400",
    skills: [
      "GraphRAG",
      "Neo4j (Knowledge Graphs)",
      "ChromaDB (Vector Database)",
      "RAGAS Evaluation",
      "OpenAI API",
    ],
  },
  {
    name: "DevOps & Infrastructure",
    color: "#0284C7",
    tag: "SKY_INFRA",
    activeClass: "bg-sky-600 text-white shadow-md shadow-sky-600/30",
    borderHover: "hover:border-sky-500/50 hover:bg-sky-50/20 dark:hover:bg-sky-950/20",
    iconColor: "text-sky-500",
    sparkleColor: "text-sky-400",
    skills: [
      "GitHub Actions (CI/CD)",
      "Linux VPS (Ubuntu)",
      "Docker",
      "PM2 Process Manager",
      "Nginx Reverse Proxy",
      "Supabase (Auth, RLS, Storage)",
    ],
  },
  {
    name: "Media & Tooling",
    color: "#F43F5E",
    tag: "ROSE_STREAM",
    activeClass: "bg-rose-600 text-white shadow-md shadow-rose-600/30",
    borderHover: "hover:border-rose-500/50 hover:bg-rose-50/20 dark:hover:bg-rose-950/20",
    iconColor: "text-rose-500",
    sparkleColor: "text-rose-400",
    skills: ["FFmpeg", "yt-dlp", "Baileys", "Git"],
  },
];

export const OWNER_INFO = {
  name: "Anthony Wisnu Jati",
  shortName: "Anthony Wisnu",
  title: "Fullstack & Systems Engineer",
  institution: "Universitas Udayana",
  highSchool: "SMAN 3 Klaten",
  domain: "anthonywj.my.id",
  domainUrl: "https://anthonywj.my.id",
  bio: "Information Technology undergraduate at Universitas Udayana specializing in real-world software engineering: multi-tenant daemon architectures, GraphRAG retrieval systems, and production-ready modern web applications.",
  github: "https://github.com/AnthonyWisnu",
  email: "jatianthony@gmail.com",
  education: [
    {
      institution: "Universitas Udayana",
      degree: "B.S. in Information Technology",
      period: "2023 - Present",
      highlights: "Core focus on Software Engineering, Distributed Systems Architecture, GraphRAG Retrieval, and DevOps Automation.",
      badge: "Higher Education",
      badgeClass: "bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/30",
      accentBorder: "hover:border-blue-500/50",
    },
    {
      institution: "SMAN 3 Klaten",
      degree: "Natural Sciences & Mathematics (MIPA)",
      period: "Alumni",
      highlights: "Analytical reasoning, foundational algorithms, and computational problem solving.",
      badge: "Secondary Education",
      badgeClass: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30",
      accentBorder: "hover:border-teal-500/50",
    },
  ],
  socials: {
    github: "https://github.com/AnthonyWisnu",
    githubHandle: "AnthonyWisnu",
    instagram: "https://www.instagram.com/anthony.w.j/",
    instagramHandle: "@anthony.w.j",
    threads: "https://www.threads.net/@anthony.w.j",
    threadsHandle: "@anthony.w.j",
    facebook: "https://www.facebook.com/anthony.275983/?locale=id_ID",
    facebookHandle: "Anthony Wisnu",
  },
};
