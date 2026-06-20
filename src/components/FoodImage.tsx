"use client";

import Image from "next/image";
import { useState } from "react";
import type { SampleResult } from "@/types";

type FoodImageProps = {
  result: SampleResult;
  className?: string;
};

const fallbackStyles: Record<string, { emoji: string; label: string; className: string }> = {
  "ramen-001": {
    emoji: "🍜",
    label: "RAMEN",
    className: "from-red-950 via-venom to-yellow-300"
  },
  "starbucks-001": {
    emoji: "🥤",
    label: "FRAPPE",
    className: "from-emerald-950 via-cyanpop to-blush"
  },
  "sweets-001": {
    emoji: "🍰",
    label: "SWEETS",
    className: "from-fuchsia-950 via-blush to-acid"
  },
  "midnight-noodle-001": {
    emoji: "🍜",
    label: "MIDNIGHT",
    className: "from-zinc-950 via-purple-950 to-venom"
  },
  "triple-sweets-001": {
    emoji: "🍮",
    label: "SUGAR",
    className: "from-venom via-blush to-acid"
  },
  "karaage-bento-001": {
    emoji: "🍱",
    label: "BENTO",
    className: "from-red-950 via-orange-700 to-acid"
  },
  "pizza-001": {
    emoji: "🍕",
    label: "PIZZA",
    className: "from-zinc-950 via-red-800 to-yellow-300"
  },
  "good-meal-001": {
    emoji: "🍚",
    label: "GOOD",
    className: "from-emerald-950 via-cyanpop to-bone"
  }
};

export function FoodImage({ result, className = "" }: FoodImageProps) {
  const [failed, setFailed] = useState(false);
  const fallback = fallbackStyles[result.id] ?? fallbackStyles["ramen-001"];
  const isInlineImage = result.imageUrl.startsWith("data:");
  const imageSrc =
    isInlineImage || result.imageUrl.includes("?") ? result.imageUrl : `${result.imageUrl}?v=phase16`;

  if (!failed) {
    return (
      <div className={`relative h-full w-full ${className}`}>
        <Image
          src={imageSrc}
          alt={result.foodName}
          fill
          sizes="(max-width: 430px) 100vw, 430px"
          onError={() => setFailed(true)}
          className="pointer-events-none object-cover"
          priority
          unoptimized={isInlineImage}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br ${fallback.className} ${className}`}
      aria-label={result.foodName}
    >
      <div className="absolute inset-0 scanline opacity-40" />
      <div className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold tracking-[0.18em] text-zinc-800 shadow-sm backdrop-blur">
        {fallback.label}
      </div>
      <div className="absolute bottom-5 right-5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-zinc-800 shadow-sm backdrop-blur">
        仮PHOTO
      </div>
      <div className="text-7xl drop-shadow-[0_12px_26px_rgba(24,24,27,0.28)]">{fallback.emoji}</div>
    </div>
  );
}
