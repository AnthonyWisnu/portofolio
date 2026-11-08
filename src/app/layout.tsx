import type { Metadata } from "next";
import Script from "next/script";
import { Geist_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { OWNER_PROFILE } from "@/data/owner";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { ScrollProgressChrome } from "@/components/motion/ScrollProgressChrome";
import { Navbar } from "@/features/navigation/Navbar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(OWNER_PROFILE.domainUrl),
  title: `${OWNER_PROFILE.name} | ${OWNER_PROFILE.role}`,
  description: OWNER_PROFILE.shortBio,
  authors: [{ name: OWNER_PROFILE.name }],
  keywords: [
    "Anthony Wisnu Jati",
    "Fullstack Engineer",
    "Systems Engineer",
    "Next.js",
    "NestJS",
    "GraphRAG",
    "Portofolio Developer Indonesia",
  ],
  openGraph: {
    title: `${OWNER_PROFILE.name} | Portofolio Rekayasa Perangkat Lunak`,
    description: OWNER_PROFILE.headlineIntro,
    url: OWNER_PROFILE.domainUrl,
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/og-portrait.jpg",
        width: 900,
        height: 1270,
        alt: `Potret Resmi ${OWNER_PROFILE.name}`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: OWNER_PROFILE.name,
    url: OWNER_PROFILE.domainUrl,
    jobTitle: OWNER_PROFILE.role,
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: OWNER_PROFILE.institution,
    },
    sameAs: OWNER_PROFILE.socials.map((s) => s.url),
  };

  return (
    <html
      lang="id"
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#0B0D12] text-[#F3F4F6] font-sans overflow-x-clip max-w-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Script
          defer
          src="https://pulse.anthonywj.my.id/pulse.js"
          data-site-id="portfolio"
          strategy="afterInteractive"
        />
        <SmoothScrollProvider>
          <ScrollProgressChrome>
            <CustomCursor />
            <Navbar />
            <main className="relative z-10 overflow-x-clip max-w-full">{children}</main>
          </ScrollProgressChrome>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
