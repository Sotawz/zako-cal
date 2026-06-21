"use client";

import { useEffect, useMemo, useState } from "react";
import type { AppView, RoastLevel, SampleResult } from "@/types";
import type { GenerateCommentRequest, GenerateCommentResponse } from "@/lib/ai/commentTypes";
import { fallbackMealAnalysis } from "@/lib/ai/fallbackMealAnalysis";
import type { MealAnalysisResult } from "@/lib/ai/mealAnalysisTypes";
import { getResultBySampleParam, sampleResults } from "@/lib/sample-results";
import { Chrome } from "@/components/Chrome";
import { AnalyzingScreen } from "@/components/screens/AnalyzingScreen";
import { DetailScreen } from "@/components/screens/DetailScreen";
import { HistoryScreen } from "@/components/screens/HistoryScreen";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { ResultScreen } from "@/components/screens/ResultScreen";
import { SettingsScreen } from "@/components/screens/SettingsScreen";
import { UploadScreen } from "@/components/screens/UploadScreen";

function applyGeneratedComment(
  result: SampleResult,
  generated: Partial<GenerateCommentResponse>
): SampleResult {
  return {
    ...result,
    roastComment: generated.roastComment ?? result.roastComment,
    recoveryAction: generated.recoveryAction ?? result.recoveryAction,
    voiceLine: generated.voiceLine ?? result.voiceLine,
    shareCaption: generated.shareCaption ?? result.shareCaption
  };
}

type PendingUpload = {
  file: File;
  imageUrl: string;
} | null;

function formatNumber(value: number) {
  return new Intl.NumberFormat("ja-JP").format(value);
}

function averageCalories(result: MealAnalysisResult) {
  return Math.round((result.caloriesMin + result.caloriesMax) / 2);
}

function deriveRoastLevel(result: MealAnalysisResult, targetCalories: number): RoastLevel {
  const average = averageCalories(result);

  if (average <= 720) {
    return "やさしい";
  }

  if (average >= 1100 || average >= targetCalories * 0.65) {
    return "豚豚アラート";
  }

  if (average >= 850) {
    return "ばかぁ";
  }

  return "ざぁこ";
}

function buildCalorieDeltaDisplay(result: MealAnalysisResult, targetCalories: number) {
  const diff = averageCalories(result) - targetCalories;

  if (diff >= 300) {
    return `+${formatNumber(diff)} kcal級`;
  }

  if (diff <= -300) {
    return `-${formatNumber(Math.abs(diff))} kcal圏内`;
  }

  return "ほぼ目標ライン";
}

function verdictLabelFor(roastLevel: RoastLevel, analysis: MealAnalysisResult) {
  if (analysis.confidence === "低") {
    return "仮推定";
  }

  if (roastLevel === "豚豚アラート") {
    return "カロリー注意 Lv.4";
  }

  if (roastLevel === "ばかぁ") {
    return "食べすぎ注意";
  }

  if (roastLevel === "やさしい") {
    return "今日はちょい偉い";
  }

  return "AI判定";
}

function buildResultFromMealAnalysis(
  analysis: MealAnalysisResult,
  imageUrl: string,
  targetCalories: number
): SampleResult {
  const roastLevel = deriveRoastLevel(analysis, targetCalories);

  return {
    id: `upload-${Date.now()}`,
    foodName: analysis.foodName,
    caloriesDisplay: analysis.caloriesDisplay,
    confidence: analysis.confidence,
    reason: analysis.reason,
    todayTotalDisplay: analysis.caloriesDisplay,
    targetCalories,
    calorieDeltaDisplay: buildCalorieDeltaDisplay(analysis, targetCalories),
    roastLevel,
    verdictLabel: verdictLabelFor(roastLevel, analysis),
    videoTitle: `${analysis.foodName}をAI判定`,
    roastComment: "判定完了。キャロリン準備中だぞぉw",
    recoveryAction: "今日の命令：水を飲んで様子見なぁw",
    shareCaption: `${analysis.foodName}をAI判定`,
    voiceLine: "キャロリン判定中だぞぉw",
    imageUrl,
    detectedItems: analysis.detectedItems,
    source: "upload",
    analysisFallback: analysis.fallback
  };
}

function buildUploadPlaceholder(
  fileName: string,
  imageUrl: string,
  targetCalories: number,
  roastLevel: RoastLevel
): SampleResult {
  return {
    id: `upload-pending-${Date.now()}`,
    foodName: fileName ? "アップロードした食事" : "食事写真",
    caloriesDisplay: "推定中",
    confidence: "低",
    reason: "画像を解析中です",
    todayTotalDisplay: "推定中",
    targetCalories,
    calorieDeltaDisplay: "計測中",
    roastLevel,
    verdictLabel: "AI判定中",
    videoTitle: "実画像をAI判定",
    roastComment: "カロリー確認中だぞぉw",
    recoveryAction: "今日の命令：判定が出るまで待ちなぁw",
    shareCaption: "実画像をAI判定",
    voiceLine: "カロリー確認中だぞぉw",
    imageUrl,
    detectedItems: [],
    source: "upload"
  };
}

export default function Page() {
  const [view, setView] = useState<AppView>("home");
  const [selectedResult, setSelectedResult] = useState<SampleResult>(sampleResults[0]);
  const [pendingResult, setPendingResult] = useState<SampleResult>(sampleResults[0]);
  const [pendingUpload, setPendingUpload] = useState<PendingUpload>(null);
  const [history, setHistory] = useState<SampleResult[]>(sampleResults);
  const [targetCalories, setTargetCalories] = useState(2000);
  const [defaultRoastLevel, setDefaultRoastLevel] = useState<RoastLevel>("ざぁこ");

  const latestResult = history[0] ?? sampleResults[0];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isDemo = params.get("demo") === "1";
    const sample = params.get("sample");

    if (!isDemo || !sample) {
      return;
    }

    const demoResult = getResultBySampleParam(sample);
    setSelectedResult(demoResult);
    setPendingResult(demoResult);
    setPendingUpload(null);
    setView("result");
  }, []);

  const currentView = useMemo(() => {
    switch (view) {
      case "home":
        return (
          <HomeScreen
            latestResult={latestResult}
            onUpload={() => setView("upload")}
            onOpenResult={() => {
              setSelectedResult(latestResult);
              setView("result");
            }}
            onHistory={() => setView("history")}
          />
        );
      case "upload":
        return (
          <UploadScreen
            samples={sampleResults}
            selected={selectedResult}
            onSelect={setSelectedResult}
            onAnalyze={(result) => {
              setPendingUpload(null);
              setPendingResult(result);
              setView("analyzing");
            }}
            onAnalyzeUpload={(file, imageUrl) => {
              setPendingUpload({ file, imageUrl });
              setPendingResult(
                buildUploadPlaceholder(file.name, imageUrl, targetCalories, defaultRoastLevel)
              );
              setView("analyzing");
            }}
          />
        );
      case "analyzing":
        return <AnalyzingScreen result={pendingResult} />;
      case "result":
        return (
          <ResultScreen
            result={selectedResult}
            onRetry={() => setView("upload")}
            onHistory={() => setView("history")}
          />
        );
      case "history":
        return (
          <HistoryScreen
            results={history}
            onOpen={(result) => {
              setSelectedResult(result);
              setView("detail");
            }}
          />
        );
      case "detail":
        return <DetailScreen result={selectedResult} onBack={() => setView("history")} />;
      case "settings":
        return (
          <SettingsScreen
            targetCalories={targetCalories}
            defaultRoastLevel={defaultRoastLevel}
            onTargetChange={setTargetCalories}
            onRoastLevelChange={setDefaultRoastLevel}
          />
        );
      default:
        return null;
    }
  }, [
    defaultRoastLevel,
    history,
    latestResult,
    pendingResult,
    selectedResult,
    targetCalories,
    view
  ]);

  useEffect(() => {
    if (view !== "analyzing") {
      return;
    }

    let canceled = false;
    const controller = new AbortController();
    const delay = new Promise((resolve) => window.setTimeout(resolve, 1400));

    async function analyzeUploadedMeal(upload: NonNullable<PendingUpload>) {
      const formData = new FormData();
      formData.append("image", upload.file);

      try {
        const responsePromise = fetch("/api/analyze-meal", {
          method: "POST",
          body: formData,
          signal: controller.signal
        });

        const [response] = await Promise.all([responsePromise, delay]);
        if (!response.ok) {
          throw new Error(`analyze-meal failed: ${response.status}`);
        }

        const analysis = (await response.json()) as MealAnalysisResult;
        return buildResultFromMealAnalysis(analysis, upload.imageUrl, targetCalories);
      } catch (error) {
        await delay;
        if (!controller.signal.aborted) {
          console.error("[analyze-meal] client fallback used", error);
        }

        return buildResultFromMealAnalysis(
          fallbackMealAnalysis(upload.file.name),
          upload.imageUrl,
          targetCalories
        );
      }
    }

    async function generateCommentFor(result: SampleResult) {
      const input: GenerateCommentRequest = {
        foodName: result.foodName,
        caloriesDisplay: result.caloriesDisplay,
        todayTotalDisplay: result.todayTotalDisplay,
        targetCalories: result.targetCalories,
        calorieDeltaDisplay: result.calorieDeltaDisplay,
        roastLevel: result.roastLevel,
        confidence: result.confidence,
        reason: result.reason
      };

      let nextResult = result;
      console.log("[generate-comment] client input", input);

      try {
        const responsePromise = fetch("/api/generate-comment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
          signal: controller.signal
        });

        const [response] = await Promise.all([responsePromise, delay]);
        if (!response.ok) {
          throw new Error(`generate-comment failed: ${response.status}`);
        }

        const generated = (await response.json()) as GenerateCommentResponse;
        console.log("[generate-comment] client output", generated);
        nextResult = applyGeneratedComment(result, generated);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("[generate-comment] client fallback used", error);
        }
      }

      return nextResult;
    }

    async function runAnalysisFlow() {
      const baseResult = pendingUpload
        ? await analyzeUploadedMeal(pendingUpload)
        : await Promise.all([Promise.resolve(pendingResult), delay]).then(([result]) => result);

      const nextResult = await generateCommentFor(baseResult);

      if (canceled) {
        return;
      }

      setSelectedResult(nextResult);
      setHistory((current) => [
        nextResult,
        ...current.filter((result) => result.id !== nextResult.id)
      ]);
      setView("result");
    }

    runAnalysisFlow();

    return () => {
      canceled = true;
      controller.abort();
    };
  }, [pendingResult, pendingUpload, targetCalories, view]);

  return (
    <Chrome view={view} onNavigate={setView}>
      {currentView}
    </Chrome>
  );
}
