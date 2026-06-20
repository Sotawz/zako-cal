import { NextResponse } from "next/server";
import {
  buildCarolynCommentUserPrompt,
  CAROLYN_COMMENT_SYSTEM_PROMPT
} from "@/lib/ai/commentPrompt";
import type { GenerateCommentRequest, GenerateCommentResponse } from "@/lib/ai/commentTypes";
import { fallbackComment, normalizeCommentResponse } from "@/lib/ai/fallbackComment";

export const dynamic = "force-dynamic";

const roastLevels = ["やさしい", "ばかぁ", "ざぁこ", "豚豚アラート"] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function validateInput(value: unknown): GenerateCommentRequest {
  if (!isRecord(value)) {
    throw new Error("Invalid request body");
  }

  const roastLevel = value.roastLevel;
  if (typeof roastLevel !== "string" || !roastLevels.includes(roastLevel as GenerateCommentRequest["roastLevel"])) {
    throw new Error("Invalid roastLevel");
  }

  if (
    typeof value.foodName !== "string" ||
    typeof value.caloriesDisplay !== "string" ||
    typeof value.todayTotalDisplay !== "string"
  ) {
    throw new Error("Missing required fields");
  }

  return {
    foodName: value.foodName,
    caloriesDisplay: value.caloriesDisplay,
    todayTotalDisplay: value.todayTotalDisplay,
    targetCalories: typeof value.targetCalories === "number" ? value.targetCalories : undefined,
    calorieDeltaDisplay:
      typeof value.calorieDeltaDisplay === "string" ? value.calorieDeltaDisplay : undefined,
    roastLevel: roastLevel as GenerateCommentRequest["roastLevel"],
    confidence:
      value.confidence === "高" || value.confidence === "中" || value.confidence === "低"
        ? value.confidence
        : undefined,
    reason: typeof value.reason === "string" ? value.reason : undefined
  };
}

function parseGeneratedComment(content: string): Partial<GenerateCommentResponse> {
  const parsed: unknown = JSON.parse(content);
  if (!isRecord(parsed)) {
    throw new Error("AI response is not an object");
  }

  return {
    roastComment: typeof parsed.roastComment === "string" ? parsed.roastComment : undefined,
    recoveryAction: typeof parsed.recoveryAction === "string" ? parsed.recoveryAction : undefined,
    voiceLine: typeof parsed.voiceLine === "string" ? parsed.voiceLine : undefined,
    shareCaption: typeof parsed.shareCaption === "string" ? parsed.shareCaption : undefined
  };
}

async function generateWithOpenAI(input: GenerateCommentRequest) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      temperature: 0.8,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: CAROLYN_COMMENT_SYSTEM_PROMPT },
        { role: "user", content: buildCarolynCommentUserPrompt(input) }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed: ${response.status}`);
  }

  const json: unknown = await response.json();
  if (!isRecord(json) || !Array.isArray(json.choices)) {
    throw new Error("Unexpected OpenAI response");
  }

  const firstChoice = json.choices[0];
  if (!isRecord(firstChoice) || !isRecord(firstChoice.message)) {
    throw new Error("Missing OpenAI message");
  }

  const content = firstChoice.message.content;
  if (typeof content !== "string") {
    throw new Error("OpenAI content is not text");
  }

  return parseGeneratedComment(content);
}

export async function POST(request: Request) {
  let input: GenerateCommentRequest;

  try {
    input = validateInput(await request.json());
  } catch (error) {
    console.error("[generate-comment] invalid input", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const fallback = fallbackComment(input);
  console.log("[generate-comment] input", input);

  if (!process.env.OPENAI_API_KEY) {
    console.log("[generate-comment] fallback used: missing OPENAI_API_KEY", fallback);
    return NextResponse.json(fallback);
  }

  try {
    const generated = normalizeCommentResponse(await generateWithOpenAI(input), fallback);
    console.log("[generate-comment] ai output", generated);
    return NextResponse.json(generated);
  } catch (error) {
    console.error("[generate-comment] fallback used: AI request failed", error);
    return NextResponse.json(fallback);
  }
}
