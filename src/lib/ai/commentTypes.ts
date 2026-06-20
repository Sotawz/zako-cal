import type { Confidence, RoastLevel } from "@/types";

export type GenerateCommentRequest = {
  foodName: string;
  caloriesDisplay: string;
  todayTotalDisplay: string;
  targetCalories?: number;
  calorieDeltaDisplay?: string;
  roastLevel: RoastLevel;
  confidence?: Confidence;
  reason?: string;
};

export type GenerateCommentResponse = {
  roastComment: string;
  recoveryAction: string;
  voiceLine: string;
  shareCaption: string;
};

export const commentLengthLimits: Record<keyof GenerateCommentResponse, number> = {
  roastComment: 35,
  recoveryAction: 35,
  voiceLine: 30,
  shareCaption: 30
};
