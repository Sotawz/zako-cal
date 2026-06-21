import { HeartPulse, MessageCircle, Utensils } from "lucide-react";
import type { SampleResult } from "@/types";
import { CarolynAvatar, type CarolynMood } from "./CarolynAvatar";

type CarolynTalkSceneProps = {
  result: SampleResult;
  onBack?: () => void;
  demoMode?: boolean;
};

function getCarolynMood(result: SampleResult): CarolynMood {
  if (result.roastLevel === "やさしい") {
    return "praise";
  }

  if (result.roastLevel === "豚豚アラート") {
    return "scold";
  }

  if (result.foodName.includes("深夜")) {
    return "surprised";
  }

  return "smug";
}

function recoveryText(result: SampleResult) {
  return result.recoveryAction.replace(/^今日の命令：/, "");
}

function shortRoastComment(result: SampleResult) {
  if (result.roastComment.length <= 32) {
    return result.roastComment;
  }

  if (result.roastLevel === "やさしい") {
    return "今日はちょっとえらいぞぉw";
  }

  if (result.foodName.includes("スタバ")) {
    return "ざぁこ♡ それ液体ケーキだぞぉw";
  }

  if (result.foodName.includes("深夜")) {
    return "深夜カップ麺、バレてるぞぉw";
  }

  return "こんのばかぁw カロリー見えてるぞぉw";
}

function shortRecoveryText(result: SampleResult) {
  const text = recoveryText(result);
  if (text.length <= 30) {
    return text;
  }

  return "今日は水。追加デザート禁止なぁw";
}

export function CarolynTalkScene({ result, onBack, demoMode = false }: CarolynTalkSceneProps) {
  const mood = getCarolynMood(result);
  const roastComment = shortRoastComment(result);
  const commandText = shortRecoveryText(result);

  return (
    <article className="relative mx-auto h-[100dvh] min-h-[100svh] w-full max-w-[430px] overflow-hidden bg-gradient-to-b from-white via-rose-50 to-pink-100 text-zinc-950 shadow-[0_24px_70px_rgba(236,72,153,0.14)] sm:rounded-[38px] sm:border sm:border-pink-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(244,114,182,0.12),transparent_28%),radial-gradient(circle_at_88%_32%,rgba(251,207,232,0.46),transparent_25%),linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,255,255,0.2)_48%,rgba(255,255,255,0.9))]" />
      <div className="absolute -left-14 top-24 h-24 w-24 rounded-full border border-pink-100 bg-white/50 shadow-sm" />
      <div className="absolute -right-10 top-48 h-24 w-24 rounded-full border border-violet-100 bg-white/50 shadow-sm" />

      <div
        className={`relative z-30 flex items-start justify-between gap-3 px-4 pb-0 ${
          demoMode ? "pt-4" : "pt-[54px]"
        }`}
      >
        <div>
          <p className="text-[12px] font-semibold text-pink-500">ざぁこカロリー</p>
          <p className="mt-0.5 text-[16px] font-semibold tracking-tight text-zinc-950">
            キャロリントーク
          </p>
        </div>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="rounded-full border border-zinc-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm backdrop-blur"
          >
            戻る
          </button>
        )}
      </div>

      <div className="relative z-30 mt-2 flex flex-wrap gap-1.5 px-4">
        <span className="inline-flex max-w-[52%] items-center gap-1.5 rounded-full border border-zinc-200 bg-white/82 px-2.5 py-1.5 text-[11px] font-semibold text-zinc-700 shadow-sm backdrop-blur">
          <Utensils size={13} />
          <span className="truncate">{result.foodName}</span>
        </span>
        <span className="rounded-full border border-pink-100 bg-white/82 px-2.5 py-1.5 text-[11px] font-semibold text-pink-600 shadow-sm backdrop-blur">
          推定 {result.caloriesDisplay}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center">
        <CarolynAvatar
          mood={mood}
          size="xl"
          displayMode="talk"
          animated
          className="pointer-events-none border-0 bg-transparent ring-0 ring-offset-0 shadow-none"
        />
      </div>

      <section
        className="absolute inset-x-3 z-40 animate-carolyn-pop rounded-[26px] border border-white/80 bg-white/82 px-4 py-3 shadow-[0_18px_44px_rgba(236,72,153,0.14)] backdrop-blur-md"
        style={{ bottom: "calc(58px + env(safe-area-inset-bottom))" }}
      >
        <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold text-pink-600">
          <MessageCircle size={15} />
          キャロリン
        </div>
        <p className="line-clamp-2 text-[19px] font-semibold leading-snug tracking-tight text-zinc-950">
          「{roastComment}」
        </p>
      </section>

      <div
        className="absolute inset-x-3 z-40 rounded-2xl border border-zinc-200/80 bg-white/86 px-3.5 py-2 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur"
        style={{ bottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500">
          <HeartPulse size={14} className="text-rose-500" />
          今日の命令
        </p>
        <p className="mt-0.5 line-clamp-1 text-[12px] font-semibold leading-relaxed text-zinc-900">
          {commandText}
        </p>
      </div>
    </article>
  );
}
