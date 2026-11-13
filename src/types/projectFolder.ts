import type { Layers } from "lucide-react";

interface FolderPreviewSheet {
  title: string;
  image?: string;
}

export interface QuickFolder {
  id: string;
  label: string;
  countLabel: string;
  subtitle: string;
  sheets: FolderPreviewSheet[];
  targetHash: string;
  filterKey?: "utama" | "pendukung";
  icon: typeof Layers;
}
