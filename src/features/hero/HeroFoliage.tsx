"use client";

import Image from "next/image";
import { m, type MotionStyle } from "framer-motion";
import type { ForestLayer } from "@/config/motion";

interface HeroFoliageProps {
  styles?: Record<ForestLayer, MotionStyle>;
}

const LAYERS: { key: ForestLayer; side: string; position: string; mirror?: boolean }[] = [
  {
    key: "canopyLeft",
    side: "left",
    position: "-left-[15vw] -top-[10vh] w-[44vw] max-w-[640px] origin-left",
  },
  {
    key: "canopyRight",
    side: "right",
    position: "-right-[16vw] top-[9vh] w-[43vw] max-w-[620px] origin-right",
  },
  {
    key: "nearLeft",
    side: "right",
    mirror: true,
    position: "-left-[22vw] top-[52vh] w-[42vw] max-w-[620px] origin-bottom-left",
  },
  {
    key: "nearRight",
    side: "left",
    mirror: true,
    position: "-right-[22vw] -top-[26vh] w-[40vw] max-w-[620px] origin-top-right",
  },
];

export function HeroFoliage({ styles }: HeroFoliageProps) {
  const layers = styles ? LAYERS : LAYERS.slice(0, 2);
  return (
    <div
      aria-hidden="true"
      data-hero-foliage
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
    >
      {layers.map((layer) => (
        <m.div
          key={layer.key}
          data-forest-layer={layer.key}
          style={styles?.[layer.key] ?? { opacity: 0.65 }}
          className={"absolute " + layer.position}
        >
          <Image
            src={"/images/hero-foliage-" + layer.side + ".webp"}
            alt=""
            width={640}
            height={960}
            sizes="(min-width: 1440px) 640px, 44vw"
            loading="eager"
            fetchPriority="low"
            className={"h-auto w-full " + (layer.mirror ? "-scale-x-100" : "")}
          />
        </m.div>
      ))}
    </div>
  );
}
