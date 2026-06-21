import type { MealAnalysisResult } from "./mealAnalysisTypes";

const fallbackMeals: MealAnalysisResult[] = [
  {
    foodName: "推定困難な食事",
    caloriesMin: 500,
    caloriesMax: 850,
    caloriesDisplay: "500〜850 kcal",
    confidence: "低",
    reason: "画像解析が使えないため、一般的な1食分として仮推定しています",
    uncertaintyNotes: "食材や量を十分に判別できないため、幅を広めにしています",
    detectedItems: [
      {
        name: "食事写真",
        estimatedAmount: "1食分",
        caloriesMin: 500,
        caloriesMax: 850,
        reason: "一般的な1食分として仮推定"
      }
    ],
    fallback: true
  },
  {
    foodName: "ラーメン系の食事",
    caloriesMin: 900,
    caloriesMax: 1600,
    caloriesDisplay: "900〜1,600 kcal",
    confidence: "低",
    reason: "麺類や脂のある食事として、ラーメン系の一般的な範囲で仮推定しています",
    uncertaintyNotes: "麺量、脂、具材量が不明なため幅を広めにしています",
    detectedItems: [
      {
        name: "麺類",
        estimatedAmount: "1杯",
        caloriesMin: 650,
        caloriesMax: 1100,
        reason: "ラーメン系の主食部分として推定"
      },
      {
        name: "具材・脂",
        estimatedAmount: "量不明",
        caloriesMin: 250,
        caloriesMax: 500,
        reason: "肉や脂がある場合に増えやすいため"
      }
    ],
    fallback: true
  },
  {
    foodName: "甘い軽食",
    caloriesMin: 350,
    caloriesMax: 650,
    caloriesDisplay: "350〜650 kcal",
    confidence: "低",
    reason: "AIキー未設定または解析失敗のため、デモ用に軽食として仮推定しています",
    uncertaintyNotes: "サイズやクリーム量が不明なため、一般的な軽食レンジです",
    detectedItems: [
      {
        name: "甘いもの",
        estimatedAmount: "1個または1杯",
        caloriesMin: 250,
        caloriesMax: 500,
        reason: "砂糖やクリームを含む軽食として推定"
      },
      {
        name: "トッピング",
        estimatedAmount: "量不明",
        caloriesMin: 100,
        caloriesMax: 150,
        reason: "ホイップやソースがある場合を見込むため"
      }
    ],
    fallback: true
  },
  {
    foodName: "弁当系の食事",
    caloriesMin: 650,
    caloriesMax: 1100,
    caloriesDisplay: "650〜1,100 kcal",
    confidence: "低",
    reason: "主食とおかずがある弁当として、ご飯量と揚げ物の可能性を含めて仮推定しています",
    uncertaintyNotes: "ご飯量とおかずの種類が不明なため幅を広めにしています",
    detectedItems: [
      {
        name: "ご飯",
        estimatedAmount: "普通盛り",
        caloriesMin: 250,
        caloriesMax: 380,
        reason: "弁当の主食として推定"
      },
      {
        name: "主菜",
        estimatedAmount: "1人前",
        caloriesMin: 350,
        caloriesMax: 650,
        reason: "揚げ物や肉料理の場合は高めになるため"
      }
    ],
    fallback: true
  },
  {
    foodName: "バランスの良い食事",
    caloriesMin: 450,
    caloriesMax: 750,
    caloriesDisplay: "450〜750 kcal",
    confidence: "低",
    reason: "主菜と野菜がある軽めの定食として仮推定しています",
    uncertaintyNotes: "調理油やご飯量が不明なため、幅を持たせています",
    detectedItems: [
      {
        name: "主菜",
        estimatedAmount: "1人前",
        caloriesMin: 220,
        caloriesMax: 420,
        reason: "タンパク質中心の主菜として推定"
      },
      {
        name: "野菜・副菜",
        estimatedAmount: "少量",
        caloriesMin: 80,
        caloriesMax: 180,
        reason: "野菜や副菜は比較的軽めに見積もるため"
      },
      {
        name: "ご飯",
        estimatedAmount: "少なめ〜普通",
        caloriesMin: 150,
        caloriesMax: 250,
        reason: "主食量が不明なため"
      }
    ],
    fallback: true
  }
];

const keywordFallbacks: Array<[RegExp, MealAnalysisResult]> = [
  [/ramen|ラーメン|二郎|noodle/i, fallbackMeals[1]],
  [/starbucks|frappe|フラペ|drink|ドリンク/i, fallbackMeals[2]],
  [/sweet|sweets|cake|スイーツ|ケーキ|甘/i, fallbackMeals[2]],
  [/bento|karaage|弁当|唐揚げ|からあげ/i, fallbackMeals[3]],
  [/pizza|ピザ/i, {
    foodName: "ピザ",
    caloriesMin: 700,
    caloriesMax: 1600,
    caloriesDisplay: "700〜1,600 kcal",
    confidence: "低",
    reason: "ピザは1切れか1枚かで大きく変わるため、広めに仮推定しています",
    uncertaintyNotes: "写真だけでは食べた枚数やサイズが分からないため幅を広くしています",
    detectedItems: [
      {
        name: "ピザ",
        estimatedAmount: "量不明",
        caloriesMin: 700,
        caloriesMax: 1600,
        reason: "サイズと枚数による差が大きいため"
      }
    ],
    fallback: true
  }],
  [/good|healthy|定食|鶏|salad|サラダ/i, fallbackMeals[4]]
];

function fallbackIndex(seed: string) {
  let total = 0;

  for (let index = 0; index < seed.length; index += 1) {
    total += seed.charCodeAt(index);
  }

  return total % fallbackMeals.length;
}

export function fallbackMealAnalysis(seed = ""): MealAnalysisResult {
  const match = keywordFallbacks.find(([pattern]) => pattern.test(seed));
  if (match) {
    return match[1];
  }

  return fallbackMeals[fallbackIndex(seed)];
}
