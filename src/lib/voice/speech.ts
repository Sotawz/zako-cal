export type CarolynSpeechCallbacks = {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
};

export function isSpeechSupported() {
  return (
    typeof window !== "undefined" &&
    "speechSynthesis" in window &&
    "SpeechSynthesisUtterance" in window
  );
}

function clipSpeechText(value: string, limit: number) {
  const trimmed = value
    .replace(/[「」"“”]/g, "")
    .replace(/^今日の命令：/, "")
    .trim();

  return trimmed.length > limit ? `${trimmed.slice(0, limit - 1)}…` : trimmed;
}

export function getCarolynSpeechText(voiceLine?: string, roastComment?: string) {
  const source = voiceLine?.trim() || roastComment?.trim() || "";
  return clipSpeechText(source, 45);
}

function getJapaneseVoice() {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((voice) => voice.lang.toLowerCase().startsWith("ja")) ??
    voices.find((voice) => voice.name.toLowerCase().includes("japanese")) ??
    null
  );
}

export function stopCarolynSpeech() {
  if (!isSpeechSupported()) {
    return;
  }

  window.speechSynthesis.cancel();
}

export function speakCarolyn(text: string, callbacks: CarolynSpeechCallbacks = {}) {
  if (!isSpeechSupported() || !text.trim()) {
    callbacks.onError?.();
    return;
  }

  stopCarolynSpeech();

  const utterance = new SpeechSynthesisUtterance(clipSpeechText(text, 45));
  const voice = getJapaneseVoice();

  utterance.lang = "ja-JP";
  utterance.pitch = 1.22;
  utterance.rate = 0.96;
  utterance.volume = 1;

  if (voice) {
    utterance.voice = voice;
  }

  utterance.onstart = () => callbacks.onStart?.();
  utterance.onend = () => callbacks.onEnd?.();
  utterance.onerror = () => callbacks.onError?.();

  window.speechSynthesis.speak(utterance);
}
