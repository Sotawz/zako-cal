import type { Confidence } from "@/types";

export type MealAnalysisResult = {
  foodName: string;
  caloriesMin: number;
  caloriesMax: number;
  caloriesDisplay: string;
  confidence: Confidence;
  reason: string;
  detectedItems: string[];
  fallback?: boolean;
};
