export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: "Automation & SaaS" | "AI & Data Systems" | "Web Applications" | "DevOps & Utilities";
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

// Exactly 5 Primary Showcase Projects as requested by Anthony
export const PRIMARY_PROJECTS: Project[] = [
  {
    id: "minjibot",
    title: "MinjiBot",
    tagline: "Multi-Tenant WhatsApp Bot & Automation SaaS Platform",
    category: "Automation & SaaS",
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
    id: "void-downloader",
    title: "VOID Downloader",
    tagline: "High-Performance Cyber-Studio Media Extraction Engine",
    category: "DevOps & Utilities",
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
    id: "hotdog-watersport",
    title: "Hot Dog Watersport",
    tagline: "Commercial Web Platform for Water Sports Rental",
    category: "Web Applications",
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
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "HTML/CSS"],
  },
  {
    name: "Frontend Engineering",
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
      period: "2023 — Present",
      highlights: "Core focus on Software Engineering, Distributed Systems Architecture, GraphRAG Retrieval, and DevOps Automation.",
      badge: "Higher Education",
    },
    {
      institution: "SMAN 3 Klaten",
      degree: "Natural Sciences & Mathematics (MIPA)",
      period: "Alumni",
      highlights: "Analytical reasoning, foundational algorithms, and computational problem solving.",
      badge: "Secondary Education",
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
