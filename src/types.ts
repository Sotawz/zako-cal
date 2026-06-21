export type RoastLevel = "やさしい" | "ばかぁ" | "ざぁこ" | "豚豚アラート";

export type Confidence = "高" | "中" | "低";

export type ResultDisplayMode = "normal" | "share" | "compact";

export type DetectedMealItem = {
  name: string;
  estimatedAmount?: string;
  caloriesMin: number;
  caloriesMax: number;
  reason: string;
};

export type SampleResult = {
  id: string;
  foodName: string;
  caloriesDisplay: string;
  confidence: Confidence;
  reason: string;
  todayTotalDisplay: string;
  targetCalories: number;
  calorieDeltaDisplay: string;
  roastLevel: RoastLevel;
  verdictLabel: string;
  videoTitle: string;
  roastComment: string;
  recoveryAction: string;
  shareCaption: string;
  voiceLine: string;
  imageUrl: string;
  detectedItems?: DetectedMealItem[];
  uncertaintyNotes?: string;
  source?: "sample" | "upload";
  analysisFallback?: boolean;
};

export type AppView =
  | "home"
  | "upload"
  | "analyzing"
  | "result"
  | "history"
  | "detail"
  | "settings";
