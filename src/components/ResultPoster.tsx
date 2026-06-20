import { Camera, Gauge, HeartPulse, History, MessageCircle, RotateCcw, Sparkles } from "lucide-react";
import type { ResultDisplayMode, SampleResult } from "@/types";
import type { CarolynMood } from "./character/CarolynAvatar";
import { CarolynStage } from "./character/CarolynStage";
import { FoodImage } from "./FoodImage";

type ResultPosterProps = {
  result: SampleResult;
  mode?: ResultDisplayMode;
  onRetry?: () => void;
  onHistory?: () => void;
};

const levelStyles: Record<string, string> = {
  やさしい: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  ばかぁ: "bg-rose-50 text-rose-700 ring-rose-100",
  ざぁこ: "bg-pink-50 text-pink-700 ring-pink-100",
  豚豚アラート: "bg-orange-50 text-orange-700 ring-orange-100"
};

function caloriesWithoutUnit(display: string) {
  return display.replace(/\s*kcal$/i, "");
}

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

function Card({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-[28px] border border-zinc-200 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.06)] ${className}`}>
      {children}
    </section>
  );
}

function Header({ result, share = false }: { result: SampleResult; share?: boolean }) {
  const levelClass = levelStyles[result.roastLevel] ?? levelStyles["ざぁこ"];

  return (
    <header className="flex items-start justify-between gap-3">
      <div>
        <p className="text-[22px] font-semibold tracking-tight text-zinc-950">ざぁこカロリー</p>
        <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">
          食事を記録して、AIコメントを受け取る
        </p>
      </div>
      {!share && (
        <span className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-medium ring-1 ${levelClass}`}>
          {result.verdictLabel}
        </span>
      )}
    </header>
  );
}

function PhotoCard({ result, share = false }: { result: SampleResult; share?: boolean }) {
  return (
    <Card className={`${share ? "mt-4" : "mt-5"} overflow-hidden p-2`}>
      <div className={`relative overflow-hidden rounded-[24px] bg-zinc-100 ${share ? "aspect-[16/10]" : "aspect-[16/10]"}`}>
        <FoodImage result={result} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-black/0 to-black/0" />
        <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-medium text-zinc-800 shadow-sm backdrop-blur">
          {result.foodName}
        </div>
      </div>
    </Card>
  );
}

function CalorieCard({ result, share = false }: { result: SampleResult; share?: boolean }) {
  return (
    <Card className={`${share ? "mt-3 p-3.5" : "mt-4 p-5"}`}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[13px] font-medium text-zinc-500">推定カロリー</p>
          <div className="mt-2 flex items-end gap-2">
            <p className={`${share ? "text-[32px]" : "text-[34px]"} whitespace-nowrap font-semibold leading-none tracking-tight text-zinc-950`}>
              {caloriesWithoutUnit(result.caloriesDisplay)}
            </p>
            <p className="pb-1.5 text-[16px] font-medium text-zinc-500">kcal</p>
          </div>
        </div>
        <div className="h-12 w-1.5 rounded-full bg-gradient-to-b from-pink-400 to-rose-400" />
      </div>
    </Card>
  );
}

function MealInfoCard({ result }: { result: SampleResult }) {
  return (
    <Card className="mt-4 p-5">
      <p className="text-[13px] font-medium text-zinc-500">食事内容</p>
      <div className="mt-2 flex items-start justify-between gap-3">
        <h2 className="text-[24px] font-semibold leading-tight tracking-tight text-zinc-950">
          {result.foodName}
        </h2>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 text-[12px] font-medium text-zinc-700">
          <Gauge size={14} />
          信頼度 {result.confidence}
        </span>
      </div>
      <p className="mt-3 text-[14px] leading-relaxed text-zinc-500">{result.reason}</p>
    </Card>
  );
}

function TotalCard({ result }: { result: SampleResult }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      <Card className="p-4">
        <p className="text-[12px] font-medium text-zinc-500">今日の合計</p>
        <p className="mt-1 text-[18px] font-semibold leading-tight text-zinc-950">
          {result.todayTotalDisplay}
        </p>
      </Card>
      <Card className="p-4">
        <p className="text-[12px] font-medium text-zinc-500">目標との差分</p>
        <p className="mt-1 text-[18px] font-semibold leading-tight text-zinc-950">
          {result.calorieDeltaDisplay}
        </p>
      </Card>
    </div>
  );
}

function CommentCard({ result, share = false }: { result: SampleResult; share?: boolean }) {
  const comment = share ? result.voiceLine : result.roastComment;
  const mood = getCarolynMood(result);

  return (
    <section
      className={`${share ? "mt-3 p-3.5" : "mt-4 p-4"} animate-carolyn-pop rounded-[28px] border border-pink-200 bg-gradient-to-br from-white via-pink-50 to-rose-50 shadow-[0_18px_44px_rgba(236,72,153,0.14)]`}
    >
      <div className={`grid items-end gap-3 ${share ? "grid-cols-[96px_1fr]" : "grid-cols-[112px_1fr]"}`}>
        <CarolynStage mood={mood} compact={share} animated={!share} />
        <div className="min-w-0 pb-1">
          <div className="mb-2">
            <p className="text-[15px] font-semibold leading-none text-zinc-950">キャロリン</p>
            <p className="mt-1 flex items-center gap-1.5 text-[12px] font-medium text-pink-600">
              <MessageCircle size={14} />
              AIコメント
            </p>
          </div>
          <div className="relative rounded-[24px] border border-pink-100 bg-white px-4 py-3 shadow-sm">
            <span className="absolute -left-1.5 top-7 h-3 w-3 rotate-45 border-b border-l border-pink-100 bg-white" />
            <p className={`${share ? "text-[18px]" : "text-[21px]"} font-semibold leading-snug tracking-tight text-zinc-950`}>
              「{comment}」
            </p>
          </div>
        </div>
      </div>
      {!share && (
        <div className="mt-3 flex items-center gap-2 px-1 text-[12px] text-zinc-500">
          <Sparkles size={14} className="text-pink-500" />
          コメントだけ、キャロリンが少し生意気です
        </div>
      )}
    </section>
  );
}

function RecoveryCard({ result, share = false }: { result: SampleResult; share?: boolean }) {
  return (
    <Card className={`${share ? "mt-3 p-3.5" : "mt-4 p-5"}`}>
      <p className="flex items-center gap-2 text-[13px] font-medium text-zinc-600">
        <HeartPulse size={16} className="text-rose-500" />
        今日のリカバリー
      </p>
      <p className={`${share ? "mt-2 text-[14px]" : "mt-3 text-[16px]"} leading-relaxed text-zinc-800`}>
        {result.recoveryAction.replace(/^今日の命令：/, "")}
      </p>
    </Card>
  );
}

function Actions({
  onRetry,
  onHistory
}: {
  onRetry?: () => void;
  onHistory?: () => void;
}) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={onRetry}
        data-testid="result-retry"
        className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-zinc-950 text-[14px] font-semibold text-white shadow-[0_12px_28px_rgba(24,24,27,0.18)] transition hover:bg-zinc-800"
      >
        <RotateCcw size={17} />
        もう1枚記録する
      </button>
      <button
        type="button"
        onClick={onHistory}
        data-testid="result-history"
        className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white text-[14px] font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50"
      >
        <History size={17} />
        履歴を見る
      </button>
    </div>
  );
}

function SharePoster({ result }: { result: SampleResult }) {
  return (
    <article className="rounded-[34px] bg-slate-50 p-4 text-zinc-950 shadow-[0_24px_70px_rgba(15,23,42,0.1)]">
      <Header result={result} share />
      <PhotoCard result={result} share />
      <CalorieCard result={result} share />
      <CommentCard result={result} share />
      <RecoveryCard result={result} share />
    </article>
  );
}

export function ResultPoster({
  result,
  mode = "normal",
  onRetry,
  onHistory
}: ResultPosterProps) {
  const share = mode === "share";
  const compact = mode === "compact";

  if (share) {
    return <SharePoster result={result} />;
  }

  return (
    <article className="rounded-[34px] bg-slate-50 p-4 text-zinc-950 shadow-[0_24px_70px_rgba(15,23,42,0.1)]">
      <Header result={result} />
      <PhotoCard result={result} />
      <CalorieCard result={result} />
      <MealInfoCard result={result} />
      <TotalCard result={result} />
      <CommentCard result={result} />
      <RecoveryCard result={result} />
      {!compact && <Actions onRetry={onRetry} onHistory={onHistory} />}
      {compact && (
        <p className="mt-4 flex items-center gap-2 text-[12px] text-zinc-500">
          <Camera size={14} />
          保存済みの食事記録
        </p>
      )}
    </article>
  );
}
