# Vercel仮デプロイ手順

Phase 6では需要検証用の仮デモURLを作ることを優先します。公開デモではAPI費用事故を避けるため、原則として `OPENAI_API_KEY` はまだ設定しません。キー未設定でもfallback推定で動きます。

## 事前チェック

- `npm run lint` が通ることを確認する。
- `npm run build` が通ることを確認する。
- `.env.local` はアップロードしない。共有するのは `.env.local.example` のみ。
- `public/samples/` の画像が表示されることを確認する。
- `tmp/`、`.next/`、ログファイルは `.gitignore` 対象のままにする。

## GitHubへpush

```bash
git status
git add .
git commit -m "Prepare phase 6 mobile demo deploy"
git push origin main
```

ブランチ名が `main` ではない場合は、実際のブランチ名に置き換えてください。

## VercelでImport

1. VercelでNew Projectを選ぶ。
2. GitHubの `zako-cal` リポジトリをImportする。
3. Framework Presetは `Next.js` を選ぶ。
4. Build Commandは `npm run build`。
5. Output Directoryは空欄のまま。
6. Install Commandは通常は自動設定のままでよい。

## 環境変数

Phase 6の公開デモでは原則なし。

- `OPENAI_API_KEY`: 設定しない。fallbackでスマホ見た目を確認する。
- `OPENAI_MODEL`: 未設定でよい。
- `OPENAI_VISION_MODEL`: 未設定でよい。

本物のAI解析を使う場合は、Phase 7でレート制限、簡易認証、利用上限、ログ方針を決めてから設定します。

## デプロイ後の確認URL

- 通常確認: `https://<your-vercel-project>.vercel.app/`
- 動画確認: `https://<your-vercel-project>.vercel.app/?demo=1`

`?demo=1` は、結果のトーク表示でモード切替タブを隠し、ショート動画向けに余白を減らすための軽い表示モードです。

## スマホ確認項目

- iPhone Safariでトップ画面が表示される。
- Android Chromeでトップ画面が表示される。
- 画像アップロード欄から写真選択または撮影ができる。
- `OPENAI_API_KEY` 未設定でもfallbackで結果画面へ進む。
- キャロリントーク画面で、キャロリンの顔、推定カロリー、煽り文が同時に見える。
- 画面録画時に上部タブやチップが邪魔になりすぎない。
