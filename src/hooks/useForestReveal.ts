"use client";

import { useTransform, type MotionStyle, type MotionValue } from "framer-motion";
import { FOREST_REVEAL, type ForestLayerConfig } from "@/config/motion";

function useForestLayer(progress: MotionValue<number>, config: ForestLayerConfig): MotionStyle {
  const x = useTransform(progress, FOREST_REVEAL.progress, config.x);
  const y = useTransform(progress, FOREST_REVEAL.progress, config.y);
  const rotate = useTransform(progress, FOREST_REVEAL.progress, config.rotate);
  const scale = useTransform(progress, FOREST_REVEAL.progress, config.scale);
  const opacity = useTransform(progress, FOREST_REVEAL.progress, config.opacity);
  return { x, y, rotate, scale, opacity };
}

export function useForestReveal(progress: MotionValue<number>) {
  const canopyLeft = useForestLayer(progress, FOREST_REVEAL.layers.canopyLeft);
  const canopyRight = useForestLayer(progress, FOREST_REVEAL.layers.canopyRight);
  const nearLeft = useForestLayer(progress, FOREST_REVEAL.layers.nearLeft);
  const nearRight = useForestLayer(progress, FOREST_REVEAL.layers.nearRight);
  const cameraY = useTransform(progress, [0, 1], [0, -16]);
  const cameraScale = useTransform(progress, [0, 0.5], [1.035, 1]);
  return {
    layers: { canopyLeft, canopyRight, nearLeft, nearRight },
    camera: { y: cameraY, scale: cameraScale },
  };
}
