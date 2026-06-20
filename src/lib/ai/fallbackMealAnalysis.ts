import type { MealAnalysisResult } from "./mealAnalysisTypes";

const fallbackMeals: MealAnalysisResult[] = [
  {
    foodName: "推定困難な食事",
    caloriesMin: 500,
    caloriesMax: 850,
    caloriesDisplay: "500〜850 kcal",
    confidence: "低",
    reason: "画像解析が使えないため、一般的な1食分として仮推定しています",
    detectedItems: ["食事写真"],
    fallback: true
  },
  {
    foodName: "揚げ物系の食事",
    caloriesMin: 800,
    caloriesMax: 1200,
    caloriesDisplay: "800〜1,200 kcal",
    confidence: "低",
    reason: "AIキー未設定または解析失敗のため、デモ用に高めの食事として仮推定しています",
    detectedItems: ["揚げ物", "主食"],
    fallback: true
  },
  {
    foodName: "甘い軽食",
    caloriesMin: 350,
    caloriesMax: 650,
    caloriesDisplay: "350〜650 kcal",
    confidence: "低",
    reason: "AIキー未設定または解析失敗のため、デモ用に軽食として仮推定しています",
    detectedItems: ["軽食", "甘いもの"],
    fallback: true
  }
];

function fallbackIndex(seed: string) {
  let total = 0;

  for (let index = 0; index < seed.length; index += 1) {
    total += seed.charCodeAt(index);
  }

  return total % fallbackMeals.length;
}

export function fallbackMealAnalysis(seed = ""): MealAnalysisResult {
  return fallbackMeals[fallbackIndex(seed)];
}
