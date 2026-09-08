"use client";

import Link from "next/link";
import { OWNER_INFO } from "@/data/projects";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/GithubIcon";
import { InstagramIcon } from "@/components/ui/SocialIcons";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto backdrop-blur-md bg-white/70 dark:bg-neutral-950/70 border border-neutral-200/60 dark:border-neutral-800/60 rounded-full px-5 py-3 shadow-xs">
        {/* Logo / Name */}
        <Link
          href="#hero"
          className="flex items-center gap-3 text-sm font-semibold tracking-tight hover:opacity-80 transition-opacity"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.7)]" />
          <span className="font-mono text-xs tracking-wider uppercase text-neutral-900 dark:text-neutral-100">
            {OWNER_INFO.shortName}
          </span>
        </Link>

        {/* Section Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-mono text-neutral-600 dark:text-neutral-400">
          <Link href="#about" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">
            01 / About
          </Link>
          <Link href="#skills" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">
            02 / Skills
          </Link>
          <Link href="#projects" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">
            03 / Projects
          </Link>
          <Link href="#contact" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">
            04 / Contact
          </Link>
        </nav>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={OWNER_INFO.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors text-neutral-800 dark:text-neutral-200"
            aria-label="Instagram Profile"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-pink-500" />
            <span>Instagram</span>
          </a>
          <a
            href={OWNER_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors text-neutral-800 dark:text-neutral-200"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
          <a
            href={`mailto:${OWNER_INFO.email}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 hover:opacity-90 transition-opacity"
            aria-label="Send Email"
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Contact</span>
          </a>
        </div>
      </div>
    </header>
  );
}
