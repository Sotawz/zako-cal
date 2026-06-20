import { NextResponse } from "next/server";
import { fallbackMealAnalysis } from "@/lib/ai/fallbackMealAnalysis";
import { MEAL_ANALYSIS_PROMPT } from "@/lib/ai/mealAnalysisPrompt";
import type { MealAnalysisResult } from "@/lib/ai/mealAnalysisTypes";
import type { Confidence } from "@/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const maxImageBytes = 8 * 1024 * 1024;
const supportedTypes = ["image/png", "image/jpeg", "image/webp", "image/gif"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("ja-JP").format(value);
}

function formatCaloriesDisplay(min: number, max: number) {
  return `${formatNumber(min)}〜${formatNumber(max)} kcal`;
}

function normalizeConfidence(value: unknown): Confidence {
  return value === "高" || value === "中" || value === "低" ? value : "低";
}

function normalizeCalories(value: unknown, fallback: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.max(0, Math.round(value));
}

function extractJsonText(content: string) {
  const fenced = content.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }

  const start = content.indexOf("{");
  const end = content.lastIndexOf("}");
  if (start >= 0 && end > start) {
    return content.slice(start, end + 1);
  }

  return content.trim();
}

function extractResponseText(value: unknown) {
  if (!isRecord(value)) {
    throw new Error("Unexpected OpenAI response");
  }

  if (typeof value.output_text === "string") {
    return value.output_text;
  }

  if (!Array.isArray(value.output)) {
    throw new Error("Missing OpenAI output");
  }

  for (const item of value.output) {
    if (!isRecord(item) || !Array.isArray(item.content)) {
      continue;
    }

    for (const content of item.content) {
      if (!isRecord(content)) {
        continue;
      }

      if (typeof content.text === "string") {
        return content.text;
      }
    }
  }

  throw new Error("Missing OpenAI text output");
}

function normalizeMealAnalysis(value: unknown, fallback: MealAnalysisResult): MealAnalysisResult {
  if (!isRecord(value)) {
    return fallback;
  }

  const caloriesMin = normalizeCalories(value.caloriesMin, fallback.caloriesMin);
  const rawMax = normalizeCalories(value.caloriesMax, fallback.caloriesMax);
  const caloriesMax = Math.max(caloriesMin, rawMax);
  const detectedItems = Array.isArray(value.detectedItems)
    ? value.detectedItems
        .filter((item): item is string => typeof item === "string" && item.trim().length > 0)
        .slice(0, 6)
    : fallback.detectedItems;

  return {
    foodName:
      typeof value.foodName === "string" && value.foodName.trim()
        ? value.foodName.trim().slice(0, 40)
        : fallback.foodName,
    caloriesMin,
    caloriesMax,
    caloriesDisplay:
      typeof value.caloriesDisplay === "string" && value.caloriesDisplay.trim()
        ? value.caloriesDisplay.trim().slice(0, 32)
        : formatCaloriesDisplay(caloriesMin, caloriesMax),
    confidence: normalizeConfidence(value.confidence),
    reason:
      typeof value.reason === "string" && value.reason.trim()
        ? value.reason.trim().slice(0, 80)
        : fallback.reason,
    detectedItems
  };
}

async function analyzeWithOpenAI(file: File): Promise<MealAnalysisResult> {
  const arrayBuffer = await file.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString("base64");
  const imageUrl = `data:${file.type || "image/jpeg"};base64,${base64Image}`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_VISION_MODEL ?? process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: MEAL_ANALYSIS_PROMPT },
            { type: "input_image", image_url: imageUrl, detail: "low" }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI vision request failed: ${response.status}`);
  }

  const json: unknown = await response.json();
  const content = extractResponseText(json);
  const parsed: unknown = JSON.parse(extractJsonText(content));
  return normalizeMealAnalysis(parsed, fallbackMealAnalysis(file.name));
}

export async function POST(request: Request) {
  let file: File;

  try {
    const formData = await request.formData();
    const maybeFile = formData.get("image");

    if (!(maybeFile instanceof File)) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 });
    }

    if (maybeFile.size <= 0 || maybeFile.size > maxImageBytes) {
      return NextResponse.json({ error: "Image file size is invalid" }, { status: 400 });
    }

    if (maybeFile.type && !supportedTypes.includes(maybeFile.type)) {
      return NextResponse.json({ error: "Unsupported image type" }, { status: 400 });
    }

    file = maybeFile;
  } catch (error) {
    console.error("[analyze-meal] invalid request", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const fallback = fallbackMealAnalysis(file.name);

  if (!process.env.OPENAI_API_KEY) {
    console.log("[analyze-meal] fallback used: missing OPENAI_API_KEY", fallback);
    return NextResponse.json(fallback);
  }

  try {
    const result = await analyzeWithOpenAI(file);
    console.log("[analyze-meal] ai output", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[analyze-meal] fallback used: AI request failed", error);
    return NextResponse.json(fallback);
  }
}
