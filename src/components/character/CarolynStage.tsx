import { MessageCircle } from "lucide-react";
import { CarolynAvatar, type CarolynMood } from "./CarolynAvatar";

type CarolynStageProps = {
  mood?: CarolynMood;
  compact?: boolean;
  animated?: boolean;
};

export function CarolynStage({
  mood = "normal",
  compact = false,
  animated = false
}: CarolynStageProps) {
  return (
    <div
      className={[
        "relative flex shrink-0 items-end justify-center overflow-hidden rounded-[30px] border border-pink-100 bg-gradient-to-b from-pink-50 to-white shadow-sm",
        compact ? "h-32 w-24" : "h-44 w-32"
      ].join(" ")}
    >
      <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-white/85 px-2 py-1 text-[10px] font-semibold text-pink-600 shadow-sm backdrop-blur">
        <MessageCircle size={11} />
        キャロリン
      </div>
      <CarolynAvatar
        mood={mood}
        size={compact ? "md" : "lg"}
        displayMode="bust"
        animated={animated}
        className="translate-y-1 ring-0 ring-offset-0"
      />
    </div>
  );
}
