export type CarolynMood = "normal" | "smug" | "scold" | "surprised" | "praise";
export type CarolynDisplayMode = "face" | "bust" | "full" | "talk";

export type CarolynAvatarProps = {
  mood?: CarolynMood;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  displayMode?: CarolynDisplayMode;
  className?: string;
};

const CAROLYN_IMAGE_SRC = "/samples/calorin.png?v=phase25";

const sizeClasses: Record<CarolynDisplayMode, Record<NonNullable<CarolynAvatarProps["size"]>, string>> = {
  face: {
    sm: "h-10 w-10",
    md: "h-14 w-14",
    lg: "h-20 w-20",
    xl: "h-24 w-24"
  },
  bust: {
    sm: "h-24 w-20",
    md: "h-32 w-24",
    lg: "h-40 w-32",
    xl: "h-[360px] w-[270px]"
  },
  full: {
    sm: "h-28 w-20",
    md: "h-40 w-28",
    lg: "h-52 w-36",
    xl: "h-[360px] w-[270px]"
  },
  talk: {
    sm: "h-28 w-24",
    md: "h-44 w-36",
    lg: "h-72 w-56",
    xl: "h-[84svh] min-h-[580px] max-h-[720px] w-[390px] max-w-[96vw]"
  }
};

const facePositions: Record<CarolynMood, string> = {
  normal: "82% 18%",
  smug: "81% 18%",
  scold: "82% 50%",
  surprised: "76% 82%",
  praise: "35% 20%"
};

const displayStyles: Record<CarolynDisplayMode, { rounded: string; size: string; position: string }> = {
  face: {
    rounded: "rounded-full",
    size: "305%",
    position: "82% 17%"
  },
  bust: {
    rounded: "rounded-[28px]",
    size: "260%",
    position: "82% 18%"
  },
  full: {
    rounded: "rounded-[30px]",
    size: "260%",
    position: "82% 18%"
  },
  talk: {
    rounded: "rounded-[44px]",
    size: "108%",
    position: "50% 6%"
  }
};

const moodRings: Record<CarolynMood, string> = {
  normal: "ring-pink-100",
  smug: "ring-pink-200",
  scold: "ring-rose-200",
  surprised: "ring-fuchsia-200",
  praise: "ring-emerald-100"
};

export function CarolynAvatar({
  mood = "normal",
  size = "md",
  animated = false,
  displayMode = "face",
  className = ""
}: CarolynAvatarProps) {
  const display = displayStyles[displayMode];
  const position = displayMode === "face" ? facePositions[mood] : display.position;

  return (
    <div
      aria-label="キャロリン"
      role="img"
      className={[
        "shrink-0 bg-white bg-no-repeat shadow-sm ring-2 ring-offset-2 ring-offset-white transition-transform duration-200 hover:-rotate-2 hover:scale-[1.03]",
        display.rounded,
        sizeClasses[displayMode][size],
        moodRings[mood],
        animated ? "animate-carolyn-float" : "",
        className
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        backgroundImage: `url("${CAROLYN_IMAGE_SRC}")`,
        backgroundPosition: position,
        backgroundSize: display.size
      }}
    />
  );
}
