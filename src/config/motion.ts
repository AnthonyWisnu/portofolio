import type { CSSProperties } from "react";

export const MOTION = {
  feedback: 0.12, hover: 0.18, panel: 0.28, reveal: 0.52, stagger: 0.06, scroll: 0.9,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  distance: { small: 8, medium: 16, large: 24 },
};

export const MOTION_CSS = {
  "--motion-feedback": `${MOTION.feedback}s`,
  "--motion-hover": `${MOTION.hover}s`,
  "--motion-panel": `${MOTION.panel}s`,
  "--motion-reveal": `${MOTION.reveal}s`,
  "--motion-stagger": `${MOTION.stagger}s`,
  "--motion-ease": `cubic-bezier(${MOTION.ease.join(",")})`,
} as CSSProperties;
