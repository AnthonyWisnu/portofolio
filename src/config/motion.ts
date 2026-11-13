import type { CSSProperties } from "react";

export const MOTION = {
  feedback: 0.12,
  hover: 0.18,
  panel: 0.28,
  reveal: 0.52,
  stagger: 0.06,
  scroll: 0.9,
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

export type ForestLayer = "canopyLeft" | "canopyRight" | "nearLeft" | "nearRight";
export interface ForestLayerConfig {
  x: number[];
  y: number[];
  rotate: number[];
  scale: number[];
  opacity: number[];
}

export const FOREST_REVEAL = {
  progress: [0, 0.12, 0.38, 0.72, 1],
  layers: {
    canopyLeft: {
      x: [8, 0, -80, -120, -160],
      y: [12, 0, -24, -48, -80],
      rotate: [10, 6, -4, -8, -12],
      scale: [1.08, 1.04, 1, 0.98, 0.96],
      opacity: [0.55, 0.88, 0.94, 0.78, 0],
    },
    canopyRight: {
      x: [-8, 0, 80, 120, 160],
      y: [20, 8, -16, -40, -72],
      rotate: [-10, -6, 4, 8, 12],
      scale: [1.08, 1.04, 1, 0.98, 0.96],
      opacity: [0.55, 0.88, 0.94, 0.78, 0],
    },
    nearLeft: {
      x: [40, 12, -130, -200, -260],
      y: [-24, 0, 48, 88, 128],
      rotate: [18, 10, -4, -12, -18],
      scale: [1.25, 1.18, 1, 0.94, 0.9],
      opacity: [0.7, 0.94, 0.88, 0.6, 0],
    },
    nearRight: {
      x: [-40, -12, 130, 200, 260],
      y: [24, 0, -48, -88, -128],
      rotate: [-18, -10, 4, 12, 18],
      scale: [1.25, 1.18, 1, 0.94, 0.9],
      opacity: [0.7, 0.94, 0.88, 0.6, 0],
    },
  } satisfies Record<ForestLayer, ForestLayerConfig>,
};
