import { Loader2, ScanLine, Sparkles } from "lucide-react";
import type { SampleResult } from "@/types";
import { CarolynStage } from "../character/CarolynStage";
import { FoodImage } from "../FoodImage";

type AnalyzingScreenProps = {
  result: SampleResult;
};

const lines = [
  "カロリー計測中...",
  "食事内容を確認中...",
  "コメント準備中...",
  "AI判定中..."
];

export function AnalyzingScreen({ result }: AnalyzingScreenProps) {
  return (
    <div className="flex flex-1 flex-col justify-center gap-4">
      <section className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white p-2 shadow-sm">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-zinc-100">
          <FoodImage result={result} />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
          <div className="absolute inset-x-5 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-white/70">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-zinc-950" />
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-zinc-500">
                Analyzing
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
                食事を判定中
              </h1>
            </div>
            <Loader2 className="animate-spin text-zinc-500" size={28} />
          </div>
          <div className="mb-4 grid grid-cols-[96px_1fr] items-end gap-3 rounded-[24px] border border-pink-100 bg-pink-50/70 p-3">
            <CarolynStage mood="normal" compact animated />
            <div>
              <p className="text-sm font-semibold text-zinc-950">キャロリン</p>
              <p className="mt-2 rounded-2xl bg-white px-3 py-2 text-sm font-semibold leading-relaxed text-zinc-800 shadow-sm">
                カロリー計測中...
              </p>
            </div>
          </div>
          <div className="grid gap-2">
            {lines.map((line, index) => (
              <div
                key={line}
                className="flex items-center gap-2 rounded-2xl bg-zinc-50 px-3 py-2 text-sm text-zinc-600"
              >
                {index === 0 ? <ScanLine size={17} /> : <Sparkles size={17} />}
                {line}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
