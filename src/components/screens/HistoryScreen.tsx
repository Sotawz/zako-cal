import { ChevronRight, History } from "lucide-react";
import type { SampleResult } from "@/types";
import { FoodImage } from "../FoodImage";

type HistoryScreenProps = {
  results: SampleResult[];
  onOpen: (result: SampleResult) => void;
};

export function HistoryScreen({ results, onOpen }: HistoryScreenProps) {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm">
        <p className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-zinc-500">
          <History size={15} />
          History
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">食事履歴</h1>
      </header>

      <section className="grid gap-3">
        {results.map((result) => (
          <button
            key={result.id}
            type="button"
            onClick={() => onOpen(result)}
            className="grid grid-cols-[92px_1fr_auto] items-stretch overflow-hidden rounded-[24px] border border-zinc-200 bg-white text-left text-zinc-950 shadow-sm"
          >
            <div className="h-28 bg-zinc-100">
              <FoodImage result={result} />
            </div>
            <div className="flex flex-col justify-between p-3">
              <div>
                <p className="text-[11px] font-medium text-zinc-500">食事内容</p>
                <h2 className="text-lg font-semibold leading-tight">{result.foodName}</h2>
              </div>
              <div>
                <p className="text-lg font-semibold text-zinc-950">{result.caloriesDisplay}</p>
                <p className="text-xs text-zinc-500">{result.verdictLabel}</p>
              </div>
            </div>
            <div className="flex items-center px-2 text-zinc-400">
              <ChevronRight size={20} />
            </div>
          </button>
        ))}
      </section>
    </div>
  );
}
