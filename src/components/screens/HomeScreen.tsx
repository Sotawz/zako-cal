"use client";

import { Bell, Camera, ChevronRight, History, Mail } from "lucide-react";
import { useState } from "react";
import type { SampleResult } from "@/types";
import { FoodImage } from "../FoodImage";

type HomeScreenProps = {
  latestResult: SampleResult;
  onUpload: () => void;
  onOpenResult: () => void;
  onHistory: () => void;
};

export function HomeScreen({ latestResult, onUpload, onOpenResult, onHistory }: HomeScreenProps) {
  const [email, setEmail] = useState("");
  const [registered, setRegistered] = useState(false);

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm">
        <p className="text-[22px] font-semibold tracking-tight text-zinc-950">ざぁこカロリー</p>
        <p className="mt-1 text-sm text-zinc-500">食事を記録して、AIコメントを受け取る</p>
      </header>

      <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm">
        <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-pink-500">
          Demo Preview
        </p>
        <h1 className="mt-2 text-[26px] font-semibold leading-tight tracking-tight text-zinc-950">
          カロリー管理が続かない人向けの、ちょっと変な食事記録アプリ
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500">
          食べたものを選ぶだけ。推定カロリーと、キャロリンからのAIコメントを表示します。
        </p>
      </section>

      <section className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-sm">
        <div className="grid grid-cols-[112px_1fr]">
          <div className="h-36 bg-zinc-100">
            <FoodImage result={latestResult} />
          </div>
          <div className="flex flex-col justify-between p-4">
            <div>
              <p className="text-[12px] font-medium text-zinc-500">最新の記録</p>
              <h2 className="mt-1 text-xl font-semibold leading-tight text-zinc-950">
                {latestResult.foodName}
              </h2>
            </div>
            <p className="line-clamp-2 text-sm leading-relaxed text-zinc-600">
              {latestResult.roastComment}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenResult}
          className="flex h-12 w-full items-center justify-between border-t border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-800"
        >
          結果を見る
          <ChevronRight size={18} />
        </button>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="rounded-[24px] border border-zinc-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-zinc-500">今日の合計</p>
          <p className="mt-2 text-xl font-semibold leading-tight text-zinc-950">
            {latestResult.todayTotalDisplay}
          </p>
        </div>
        <div className="rounded-[24px] border border-zinc-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-zinc-500">AIコメントタイプ</p>
          <p className="mt-2 text-xl font-semibold leading-tight text-zinc-950">
            {latestResult.roastLevel}
          </p>
        </div>
      </section>

      <button
        type="button"
        onClick={onUpload}
        data-testid="home-upload"
        className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-zinc-950 text-base font-semibold text-white shadow-[0_12px_28px_rgba(24,24,27,0.18)]"
      >
        <Camera size={20} />
        食事を記録する
      </button>

      <button
        type="button"
        onClick={onHistory}
        data-testid="home-history"
        className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white text-sm font-semibold text-zinc-800 shadow-sm"
      >
        <History size={18} />
        履歴を見る
      </button>

      <form
        className="rounded-[28px] border border-zinc-200 bg-white p-4 shadow-sm"
        onSubmit={(event) => {
          event.preventDefault();
          setRegistered(true);
        }}
      >
        <p className="flex items-center gap-2 text-sm font-semibold text-zinc-950">
          <Bell size={17} className="text-pink-500" />
          リリース通知を受け取る
        </p>
        <div className="mt-3 grid gap-2">
          <label className="flex h-12 items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-500">
            <Mail size={17} />
            <input
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setRegistered(false);
              }}
              type="email"
              inputMode="email"
              placeholder="mail@example.com"
              className="min-w-0 flex-1 bg-transparent text-zinc-950 outline-none placeholder:text-zinc-400"
            />
          </label>
          <button
            type="submit"
            className="flex h-12 items-center justify-center rounded-2xl bg-pink-500 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(236,72,153,0.22)] transition hover:bg-pink-600"
          >
            このアプリを使ってみたい
          </button>
        </div>
        {registered && (
          <p className="mt-3 rounded-2xl bg-pink-50 px-3 py-2 text-sm font-medium text-pink-700">
            仮登録しました。リリース時にお知らせします。
          </p>
        )}
      </form>
    </div>
  );
}
