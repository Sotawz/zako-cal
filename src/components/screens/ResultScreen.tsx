"use client";

import { Maximize2, MessageCircle, Share2, Smartphone } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import type { SampleResult } from "@/types";
import { CarolynTalkScene } from "../character/CarolynTalkScene";
import { ResultPoster } from "../ResultPoster";

type ResultScreenProps = {
  result: SampleResult;
  onRetry: () => void;
  onHistory: () => void;
};

type ResultViewMode = "normal" | "share" | "talk";

export function ResultScreen({ result, onRetry, onHistory }: ResultScreenProps) {
  const [viewMode, setViewMode] = useState<ResultViewMode>("talk");
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    setDemoMode(new URLSearchParams(window.location.search).get("demo") === "1");
  }, []);

  const modes: Array<{
    id: ResultViewMode;
    label: string;
    icon: ReactNode;
    testId?: string;
  }> = [
    { id: "talk", label: "トーク", icon: <MessageCircle size={16} />, testId: "talk-mode" },
    { id: "normal", label: "詳細", icon: <Smartphone size={16} />, testId: "normal-mode" },
    { id: "share", label: "シェア", icon: <Maximize2 size={16} />, testId: "share-mode" }
  ];

  function ModeSwitcher() {
    return (
      <div className="grid grid-cols-3 gap-1 rounded-full border border-zinc-200 bg-white/82 p-1 shadow-sm backdrop-blur">
        {modes.map((mode) => {
          const active = viewMode === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => setViewMode(mode.id)}
              data-testid={mode.testId}
              className={`flex h-8 items-center justify-center gap-1 rounded-full text-[11px] font-semibold transition [&_svg]:h-3.5 [&_svg]:w-3.5 ${
                active
                  ? "bg-zinc-950 text-white"
                  : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              {mode.icon}
              {mode.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={viewMode === "talk" ? "relative min-h-[100svh] w-full" : "flex flex-1 flex-col gap-3 p-3"}>
      {viewMode === "talk" && (
        <>
          {!demoMode && (
            <div className="absolute inset-x-4 top-2 z-50">
              <ModeSwitcher />
            </div>
          )}
          <CarolynTalkScene result={result} demoMode={demoMode} />
        </>
      )}

      {viewMode !== "talk" && !demoMode && <ModeSwitcher />}

      {viewMode === "normal" && (
        <>
          <ResultPoster result={result} onRetry={onRetry} onHistory={onHistory} />

          <div className="rounded-[24px] border border-zinc-200 bg-white px-4 py-3 shadow-sm">
            <p className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
              <Share2 size={15} />
              シェア用セリフ
            </p>
            <p className="mt-1 text-sm leading-relaxed text-zinc-800">{result.voiceLine}</p>
          </div>
        </>
      )}

      {viewMode === "share" && (
        <div className="min-h-[calc(100vh-5rem)]">
          <ResultPoster result={result} mode="share" />
        </div>
      )}
    </div>
  );
}
