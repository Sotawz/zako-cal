"use client";

import { Square, Volume2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  getCarolynSpeechText,
  isSpeechSupported,
  speakCarolyn,
  stopCarolynSpeech
} from "@/lib/voice/speech";

type CarolynVoiceButtonProps = {
  voiceLine?: string;
  roastComment?: string;
  className?: string;
};

export function CarolynVoiceButton({
  voiceLine,
  roastComment,
  className = ""
}: CarolynVoiceButtonProps) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const speechText = useMemo(
    () => getCarolynSpeechText(voiceLine, roastComment),
    [roastComment, voiceLine]
  );

  useEffect(() => {
    setSupported(isSpeechSupported());

    return () => {
      stopCarolynSpeech();
    };
  }, []);

  if (!supported || !speechText) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (speaking) {
          stopCarolynSpeech();
          setSpeaking(false);
          return;
        }

        speakCarolyn(speechText, {
          onStart: () => setSpeaking(true),
          onEnd: () => setSpeaking(false),
          onError: () => setSpeaking(false)
        });
      }}
      className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-pink-100 bg-white/90 px-3 text-[11px] font-semibold text-pink-600 shadow-sm backdrop-blur transition hover:bg-pink-50 ${className}`}
      aria-label={speaking ? "キャロリンの音声を停止" : "キャロリンの音声を再生"}
    >
      {speaking ? <Square size={13} fill="currentColor" /> : <Volume2 size={14} />}
      {speaking ? "停止" : "音声で聞く"}
    </button>
  );
}
