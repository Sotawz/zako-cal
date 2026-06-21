# デモ直リンク一覧

`BASE_URL` をVercel公開URLに置き換えて使ってください。

例: `https://your-project.vercel.app`

## ショート動画用URL

| サンプル | URL | 動画タイトル案 | 冒頭の見せ方 |
| --- | --- | --- | --- |
| 二郎系ラーメン | `BASE_URL/?demo=1&sample=ramen` | 二郎食べたらAIに煽られた | 推定カロリーのチップから入る |
| スタバ系フラペチーノ | `BASE_URL/?demo=1&sample=starbucks` | スタバ新作をAIに見せた結果 | 飲み物なのに高カロリー感を見せる |
| コンビニスイーツ | `BASE_URL/?demo=1&sample=sweets` | ちょっとだけスイーツ、AIにバレる | ちょっとだけ詐欺の煽りを見せる |
| 深夜カップ麺 | `BASE_URL/?demo=1&sample=midnight-noodle` | 深夜カップ麺をAIに見せた結果 | 深夜テンションの罪悪感から入る |
| コンビニスイーツ3個 | `BASE_URL/?demo=1&sample=triple-sweets` | スイーツ3個で怒られた | 甘いものを並べた絵面から入る |
| 唐揚げ弁当 | `BASE_URL/?demo=1&sample=karaage-bento` | 唐揚げ弁当、油まみれ判定 | 弁当のボリューム感を見せる |
| ピザ | `BASE_URL/?demo=1&sample=pizza` | ピザ食べたら終わった | カロリー注意Lv.4の雰囲気で入る |
| 意外と良い食事 | `BASE_URL/?demo=1&sample=good-meal` | 意外と褒められた飯 | 煽られると思ったら褒められる流れ |

## 撮影メモ

- `?demo=1` では結果トーク画面のモード切替タブが消えます。
- sampleが存在しない場合は二郎系ラーメンにフォールバックします。
- 公開デモでは `OPENAI_API_KEY` を入れず、fallbackで見た目を確認する想定です。
