import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navbar } from "@/components/navigation/Navbar";
import { CustomCursor } from "@/components/layout/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://anthonywj.my.id"),
  title: "Anthony Wisnu Jati | Fullstack & Systems Engineer",
  description:
    "Interactive 3D portfolio of Anthony Wisnu Jati. Information Technology student building practical software systems, multi-tenant automation engines, and GraphRAG architectures.",
  authors: [{ name: "Anthony Wisnu Jati" }],
  keywords: [
    "Anthony Wisnu Jati",
    "Software Engineer",
    "Fullstack Developer",
    "GraphRAG",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  openGraph: {
    title: "Anthony Wisnu Jati | Developer Portfolio",
    description:
      "Interactive 3D developer portfolio showcasing verified systems, automation pipelines, and software architectures.",
    images: [
      {
        url: "/Foto.jpeg",
        width: 800,
        height: 1067,
        alt: "Anthony Wisnu Jati Portrait",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased selection:bg-red-500/20 selection:text-red-700 dark:selection:text-red-300`}
    >
      <body className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans transition-colors duration-300 overflow-x-clip max-w-full">
        <Script
          defer
          src="https://pulse.anthonywj.my.id/tracker.js"
          data-site-id="portfolio"
          strategy="afterInteractive"
        />
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main className="relative z-10 overflow-x-clip max-w-full">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
