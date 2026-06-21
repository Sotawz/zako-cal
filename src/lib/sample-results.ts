import type { SampleResult } from "@/types";

export const sampleResults: SampleResult[] = [
  {
    id: "ramen-001",
    foodName: "二郎系ラーメン",
    caloriesDisplay: "1,250〜1,650 kcal",
    confidence: "中",
    reason: "麺量・脂・チャーシュー量が多めに見えるため",
    todayTotalDisplay: "1,950〜2,400 kcal",
    targetCalories: 2000,
    calorieDeltaDisplay: "+400 kcal級",
    roastLevel: "豚豚アラート",
    verdictLabel: "豚豚アラート Lv.4",
    videoTitle: "二郎食べたらAIに煽られた",
    roastComment: "こんのばかぁw 胃袋に城建ってるぞぉw",
    recoveryAction: "今日の命令：今日は水。追加デザート禁止なぁw",
    shareCaption: "二郎で豚豚アラート",
    voiceLine: "胃袋に城建ってるぞぉw",
    imageUrl: "/samples/ramen.jpg"
  },
  {
    id: "starbucks-001",
    foodName: "スタバ系フラペチーノ",
    caloriesDisplay: "450〜650 kcal",
    confidence: "中",
    reason: "ホイップと甘いソースが多く、デザート飲料に近いため",
    todayTotalDisplay: "1,300〜1,600 kcal",
    targetCalories: 2000,
    calorieDeltaDisplay: "-400 kcal圏内",
    roastLevel: "ざぁこ",
    verdictLabel: "甘党アラート",
    videoTitle: "スタバ新作、AIにバレる",
    roastComment: "ざぁこ♡ それ液体ケーキだぞぉw",
    recoveryAction: "今日の命令：次は水か無糖にしなぁw",
    shareCaption: "スタバ新作、液体ケーキ判定",
    voiceLine: "液体ケーキ飲んでるぞぉw",
    imageUrl: "/samples/starbucks.jpg"
  },
  {
    id: "sweets-001",
    foodName: "コンビニスイーツ",
    caloriesDisplay: "320〜520 kcal",
    confidence: "中",
    reason: "クリーム・砂糖・生地の量から高カロリー寄りに見えるため",
    todayTotalDisplay: "1,700〜2,050 kcal",
    targetCalories: 2000,
    calorieDeltaDisplay: "ほぼ目標ライン",
    roastLevel: "ばかぁ",
    verdictLabel: "ばかぁ判定",
    videoTitle: "スイーツちょっとだけ詐欺",
    roastComment: "こんのばかぁw 全然ちょっとじゃないぞぉw",
    recoveryAction: "今日の命令：追加お菓子は禁止なぁw",
    shareCaption: "スイーツ、ちょっとだけ詐欺",
    voiceLine: "全然ちょっとじゃないぞぉw",
    imageUrl: "/samples/sweets.jpg"
  },
  {
    id: "midnight-noodle-001",
    foodName: "深夜カップ麺",
    caloriesDisplay: "380〜560 kcal",
    confidence: "中",
    reason: "油揚げ麺とスープの脂質があり、夜食としては重めに見えるため",
    todayTotalDisplay: "2,150〜2,550 kcal",
    targetCalories: 2000,
    calorieDeltaDisplay: "+550 kcal級",
    roastLevel: "ざぁこ",
    verdictLabel: "深夜ラーメン注意",
    videoTitle: "深夜カップ麺を見せた結果",
    roastComment: "深夜カップ麺、バレてるぞぉw",
    recoveryAction: "今日の命令：スープ残して、もう寝なさぁいw",
    shareCaption: "深夜カップ麺、AIにバレる",
    voiceLine: "深夜に胃袋へ電話するなぁw",
    imageUrl: "/samples/midnight-noodle.jpg"
  },
  {
    id: "triple-sweets-001",
    foodName: "コンビニスイーツ3個",
    caloriesDisplay: "900〜1,250 kcal",
    confidence: "中",
    reason: "クリーム系・チョコ系・焼き菓子が重なり、糖質と脂質が多めに見えるため",
    todayTotalDisplay: "2,300〜2,850 kcal",
    targetCalories: 2000,
    calorieDeltaDisplay: "+850 kcal級",
    roastLevel: "豚豚アラート",
    verdictLabel: "砂糖の国へ移住 Lv.4",
    videoTitle: "スイーツ3個で怒られた",
    roastComment: "スイーツ3個は遠足じゃないぞぉw",
    recoveryAction: "今日の命令：甘い飲み物は禁止なぁw",
    shareCaption: "スイーツ3個で怒られた",
    voiceLine: "砂糖まみれぇw",
    imageUrl: "/samples/triple-sweets.jpg"
  },
  {
    id: "karaage-bento-001",
    foodName: "唐揚げ弁当",
    caloriesDisplay: "850〜1,150 kcal",
    confidence: "中",
    reason: "揚げ物の量と白米の割合が多く、油と炭水化物が重なっているため",
    todayTotalDisplay: "1,850〜2,250 kcal",
    targetCalories: 2000,
    calorieDeltaDisplay: "+250 kcal級",
    roastLevel: "ざぁこ",
    verdictLabel: "油まみれ判定",
    videoTitle: "唐揚げ弁当、判定される",
    roastComment: "唐揚げで白米流すなぁw 油が主役w",
    recoveryAction: "今日の命令：夜は野菜と汁物なぁw",
    shareCaption: "唐揚げ弁当、油まみれ",
    voiceLine: "油が主役だぞぉw",
    imageUrl: "/samples/karaage-bento.jpg"
  },
  {
    id: "pizza-001",
    foodName: "ピザ",
    caloriesDisplay: "1,100〜1,600 kcal",
    confidence: "中",
    reason: "チーズ・生地・油分が多く、枚数次第で大きく増えるため",
    todayTotalDisplay: "2,450〜3,000 kcal",
    targetCalories: 2000,
    calorieDeltaDisplay: "+1,000 kcal級",
    roastLevel: "豚豚アラート",
    verdictLabel: "チーズ沼 Lv.4",
    videoTitle: "ピザ食べたら終わった",
    roastComment: "ピザで胃袋埋めるなぁw チーズ沼w",
    recoveryAction: "今日の命令：残りは明日。水飲んで帰還なぁw",
    shareCaption: "ピザ食べたら終わった",
    voiceLine: "チーズ沼だぞぉw",
    imageUrl: "/samples/pizza.jpg"
  },
  {
    id: "good-meal-001",
    foodName: "鶏むね定食",
    caloriesDisplay: "520〜720 kcal",
    confidence: "中",
    reason: "主菜がタンパク質中心で、野菜とご飯の量も比較的まとまって見えるため",
    todayTotalDisplay: "1,250〜1,550 kcal",
    targetCalories: 2000,
    calorieDeltaDisplay: "-450 kcal圏内",
    roastLevel: "やさしい",
    verdictLabel: "今日はちょい偉い",
    videoTitle: "意外と褒められた飯",
    roastComment: "今日はちょっとえらいじゃんw だいぶマシだぞぉw",
    recoveryAction: "今日の命令：この調子。デザート追加すんなぁw",
    shareCaption: "意外と褒められた飯",
    voiceLine: "今日はちょっとえらいぞぉw",
    imageUrl: "/samples/good-meal.jpg"
  }
];

export const roastLevels = ["やさしい", "ばかぁ", "ざぁこ", "豚豚アラート"] as const;

const sampleAliases: Record<string, string> = {
  ramen: "ramen-001",
  "ramen-001": "ramen-001",
  starbucks: "starbucks-001",
  frappe: "starbucks-001",
  "starbucks-001": "starbucks-001",
  sweets: "sweets-001",
  "sweets-001": "sweets-001",
  "midnight-noodle": "midnight-noodle-001",
  cupnoodle: "midnight-noodle-001",
  "midnight-noodle-001": "midnight-noodle-001",
  "triple-sweets": "triple-sweets-001",
  "triple-sweets-001": "triple-sweets-001",
  karaage: "karaage-bento-001",
  "karaage-bento": "karaage-bento-001",
  "karaage-bento-001": "karaage-bento-001",
  pizza: "pizza-001",
  "pizza-001": "pizza-001",
  "good-meal": "good-meal-001",
  good: "good-meal-001",
  "good-meal-001": "good-meal-001"
};

export function getResultById(id: string) {
  return sampleResults.find((result) => result.id === id) ?? sampleResults[0];
}

export function getResultBySampleParam(sample: string | null) {
  if (!sample) {
    return sampleResults[0];
  }

  const normalized = sample.trim().toLowerCase();
  return getResultById(sampleAliases[normalized] ?? normalized);
}
