# ざぁこカロリー

白基調の食事記録アプリに見せつつ、AIコメント欄だけキャラクター「キャロリン」が少し生意気に食事へリアクションする、需要検証用デモです。

## 現在のフェーズ

- Phase 7: スマホ実機検証、ショート動画検証モード、公開デモ導線の整備

DB保存、ログイン、決済、音声生成、本格3D/Live2D実装はまだ入れていません。

## 起動方法

```bash
npm install
npm run dev
```

ローカルでは `http://localhost:3000` を開きます。

## ビルド方法

```bash
npm run lint
npm run build
```

## Phase 6 / 7 デプロイ・動画検証方針

Phase 6では、localhostではなくスマホ実機から触れるVercel仮デモURLを作ることを優先します。
Phase 7では、公開URLを使ってショート動画を撮りやすい直リンクと動画用表示を整えています。

- VercelのFramework Presetは `Next.js`。
- Build Commandは `npm run build`。
- Output Directoryは指定不要。
- Phase 6の公開デモでは、API費用事故を避けるため `OPENAI_API_KEY` は原則設定しません。
- `OPENAI_API_KEY` 未設定でも、画像解析とコメント生成はfallbackで動きます。
- 本物のAI解析を公開URLで使う場合は、Phase 7でレート制限、簡易認証、利用上限、ログ方針を決めてから設定します。

詳しい手順は [docs/deploy-vercel.md](docs/deploy-vercel.md) を参照してください。
投稿検証用の直リンクは [docs/demo-links.md](docs/demo-links.md)、動画台本は [docs/short-video-scripts-10.md](docs/short-video-scripts-10.md) を参照してください。

## AI画像解析・コメント生成API

`src/app/api/analyze-meal/route.ts` に、multipart/form-dataで受け取った食事写真から食事名、推定カロリー、信頼度、理由を返すAPIを追加しています。

- 画像解析はOpenAIの画像入力対応APIを使います。
- `OPENAI_API_KEY` が未設定の場合はローカルのfallback推定が返ります。
- カロリーはあくまで推定であり、医療助言や診断ではありません。
- 栄養成分表示が写っている場合は数字を優先するよう促しますが、OCR精度は保証しません。

`src/app/api/generate-comment/route.ts` には、食事名、推定カロリー、今日の合計、毒舌レベルなどの構造化データからキャロリン風コメントを生成するAPIを追加しています。

- サンプル食事と実画像解析結果の両方からコメント生成APIを呼びます。
- `OPENAI_API_KEY` が未設定の場合はローカルのfallbackコメントが返ります。
- OpenAI APIでエラーが起きてもfallbackへ戻るため、デモ画面は落ちません。
- APIキーは `.env.local` またはVercelのEnvironment Variablesで設定します。

## キャロリントーク表示

`src/components/character/CarolynTalkScene.tsx` に、ショート動画向けの9:16トーク表示を追加しています。

- 通常結果画面とシェア表示は残しています。
- トーク表示ではキャロリンを画面の主役として大きく表示し、AIコメントを下部の小さなチャットバーで見せます。
- 既存の `public/samples/calorin.png` を使い、新規画像生成はしていません。
- 顔、上半身、太もも付近まで見えるよう、少し引いたVTuber立ち絵風に調整しています。
- 食事写真や詳細カードは主役にせず、食事名と推定カロリーは小さなチップ表示に留めています。
- `?demo=1` を付けると、結果トーク表示のモード切替タブを隠し、ショート動画向けに余白を減らします。
- `?demo=1&sample=ramen` のように `sample` を付けると、指定サンプルのキャロリントーク画面を直接開けます。

`.env.local.example`:

```bash
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
OPENAI_VISION_MODEL=gpt-4o-mini
```

## デモ確認手順

1. トップ画面でアプリ概要と仮CTAを確認する。
2. 「食事を記録する」からアップロード/サンプル選択へ進む。
3. 実画像を選んで「カロリーを計測する」を押す。または8件のサンプルから食事を選ぶ。
4. 解析中画面でキャロリンの軽い演出を確認する。
5. 最初に全画面キャロリン判定画面が表示され、推定カロリーと短い煽り文が出ることを確認する。
6. 「詳細」で通常の結果カードを確認する。
7. 「シェア」でスクショ向け表示を確認する。
8. トップ画面のメール入力欄で仮登録メッセージが出るか確認する。
9. `?demo=1` 付きURLで、結果トーク画面のタブが非表示になることを確認する。
10. `?demo=1&sample=ramen` などの直リンクで、指定サンプルのトーク画面が直接開くことを確認する。

## まだ未実装のもの

- SupabaseなどのDB保存
- ログイン
- 決済
- 音声生成
- Live2D / VRM / three.js による本格キャラクター表示
- 実際の事前登録送信処理

## 今後の予定

- スマホ実機で全画面キャロリン判定、詳細表示、シェア表示を確認する。
- ショート動画で需要検証する。
- 次フェーズで少数の実AI解析テストを行い、精度、料金、レスポンス時間を確認する。
- 反応が良ければ履歴保存、音声化、キャロリンのLive2D風演出を検討する。

## Vercelデプロイメモ

- Next.js標準構成のため、VercelのFramework Presetは `Next.js` を選択する。
- Build Commandは `npm run build`。
- Output Directoryは指定不要。
- `public/samples/` 配下の画像は静的ファイルとして配信される。
- Phase 6の公開デモでは環境変数なしでfallback確認を優先する。
- 実AI解析を使う場合は `OPENAI_API_KEY` と必要に応じて `OPENAI_MODEL` / `OPENAI_VISION_MODEL` を設定する。
