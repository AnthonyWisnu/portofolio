import type { ReactNode } from "react";

export default function ProjectTemplate({ children }: { children: ReactNode }) {
  return <div className="project-page-enter">{children}</div>;
}
