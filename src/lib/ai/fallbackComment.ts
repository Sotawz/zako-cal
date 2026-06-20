import type { GenerateCommentRequest, GenerateCommentResponse } from "./commentTypes";
import { commentLengthLimits } from "./commentTypes";

const bannedFragments = [
  "生きる価値がない",
  "人として終わってる",
  "もう食べるな",
  "断食しろ",
  "吐け",
  "病気になるぞ",
  "摂食障害",
  "デブ",
  "ブス"
];

function clipText(value: string, limit: number) {
  const trimmed = value.trim();
  return trimmed.length > limit ? `${trimmed.slice(0, Math.max(0, limit - 1))}…` : trimmed;
}

function safeText(value: unknown, fallback: string, limit: number) {
  if (typeof value !== "string" || !value.trim()) {
    return fallback;
  }

  const hasBannedFragment = bannedFragments.some((fragment) => value.includes(fragment));
  return clipText(hasBannedFragment ? fallback : value, limit);
}

export function fallbackComment(input: GenerateCommentRequest): GenerateCommentResponse {
  let response: GenerateCommentResponse;

  if (input.roastLevel === "やさしい") {
    response = {
      roastComment: "今日はえらいじゃんw ちゃんと飯してるぞぉw",
      recoveryAction: "今日の命令：この調子。デザート追加すんなぁw",
      voiceLine: "今日はちょっとえらいぞぉw",
      shareCaption: `${input.foodName}、意外とえらい`
    };
  } else if (input.roastLevel === "豚豚アラート") {
    response = {
      roastComment: "こんのばかぁw カロリーが行進してるぞぉw",
      recoveryAction: "今日の命令：今日は水。追加デザート禁止なぁw",
      voiceLine: "カロリー行進中だぞぉw",
      shareCaption: `${input.foodName}でアラート`
    };
  } else if (input.roastLevel === "ばかぁ") {
    response = {
      roastComment: "こんのばかぁw その一口、全然軽くないぞぉw",
      recoveryAction: "今日の命令：追加お菓子は禁止。水飲みなぁw",
      voiceLine: "全然軽くないぞぉw",
      shareCaption: `${input.foodName}で怒られた`
    };
  } else {
    response = {
      roastComment: "ざぁこ♡ 油断した顔のカロリーだぞぉw",
      recoveryAction: "今日の命令：次は水か無糖。甘いの休みなぁw",
      voiceLine: "油断カロリーだぞぉw",
      shareCaption: `${input.foodName}、AIにバレる`
    };
  }

  return normalizeCommentResponse(response, response);
}

export function normalizeCommentResponse(
  value: Partial<GenerateCommentResponse>,
  fallback: GenerateCommentResponse
): GenerateCommentResponse {
  return {
    roastComment: safeText(
      value.roastComment,
      fallback.roastComment,
      commentLengthLimits.roastComment
    ),
    recoveryAction: safeText(
      value.recoveryAction,
      fallback.recoveryAction,
      commentLengthLimits.recoveryAction
    ),
    voiceLine: safeText(value.voiceLine, fallback.voiceLine, commentLengthLimits.voiceLine),
    shareCaption: safeText(value.shareCaption, fallback.shareCaption, commentLengthLimits.shareCaption)
  };
}
