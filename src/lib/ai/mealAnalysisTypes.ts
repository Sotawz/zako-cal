import type { Confidence, DetectedMealItem } from "@/types";

export type MealAnalysisResult = {
  foodName: string;
  detectedItems: DetectedMealItem[];
  caloriesMin: number;
  caloriesMax: number;
  caloriesDisplay: string;
  confidence: Confidence;
  reason: string;
  uncertaintyNotes: string;
  fallback?: boolean;
};
