import { ArrowLeft } from "lucide-react";
import type { SampleResult } from "@/types";
import { ResultPoster } from "../ResultPoster";

type DetailScreenProps = {
  result: SampleResult;
  onBack: () => void;
};

export function DetailScreen({ result, onBack }: DetailScreenProps) {
  return (
    <div className="flex flex-1 flex-col gap-3">
      <button
        type="button"
        onClick={onBack}
        className="flex h-11 w-fit items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-800 shadow-sm"
      >
        <ArrowLeft size={18} />
        履歴へ
      </button>
      <ResultPoster result={result} mode="compact" />
    </div>
  );
}
