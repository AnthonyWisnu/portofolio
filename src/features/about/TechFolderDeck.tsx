"use client";

import { useSmoothScroll } from "@/components/motion/SmoothScrollProvider";
import { FolderCard } from "@/features/about/FolderCard";
import { PROJECT_FOLDERS } from "@/data/projectFolders";
import type { QuickFolder } from "@/types/projectFolder";
import { MOTION } from "@/config/motion";

export function TechFolderDeck() {
  const { scrollTo } = useSmoothScroll();

  const handleSelect = (folder: QuickFolder) => {
    if (folder.filterKey && typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("portfolio:select-tier", { detail: { tier: folder.filterKey } }),
      );
    }
    scrollTo(folder.targetHash, { offset: -16, duration: MOTION.scroll });
  };

  return (
    <div className="pt-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PROJECT_FOLDERS.map((folder) => (
          <FolderCard key={folder.id} folder={folder} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
}
