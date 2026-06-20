import { Bell, Gauge, Settings } from "lucide-react";
import { roastLevels } from "@/lib/sample-results";
import type { RoastLevel } from "@/types";

type SettingsScreenProps = {
  targetCalories: number;
  defaultRoastLevel: RoastLevel;
  onTargetChange: (value: number) => void;
  onRoastLevelChange: (level: RoastLevel) => void;
};

export function SettingsScreen({
  targetCalories,
  defaultRoastLevel,
  onTargetChange,
  onRoastLevelChange
}: SettingsScreenProps) {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm">
        <p className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-zinc-500">
          <Settings size={15} />
          Settings
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">設定</h1>
      </header>

      <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm">
        <label className="flex items-center gap-2 text-sm font-semibold text-zinc-800" htmlFor="target">
          <Gauge size={18} />
          目標カロリー
        </label>
        <div className="mt-4 flex items-center gap-3">
          <input
            id="target"
            type="range"
            min={1200}
            max={3200}
            step={50}
            value={targetCalories}
            onChange={(event) => onTargetChange(Number(event.target.value))}
            className="h-2 flex-1 accent-pink-500"
          />
          <output className="min-w-[92px] rounded-full bg-zinc-100 px-3 py-1.5 text-center text-sm font-semibold text-zinc-900">
            {targetCalories}
          </output>
        </div>
      </section>

      <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-800">
          <Bell size={18} />
          AIコメントタイプ
        </div>
        <div className="grid grid-cols-2 gap-2">
          {roastLevels.map((level) => {
            const active = defaultRoastLevel === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => onRoastLevelChange(level)}
                className={`h-11 rounded-2xl border text-sm font-semibold transition ${
                  active
                    ? "border-zinc-950 bg-zinc-950 text-white"
                    : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-medium text-zinc-500">現在の設定</p>
        <p className="mt-1 text-2xl font-semibold text-zinc-950">
          {defaultRoastLevel} / {targetCalories.toLocaleString()} kcal
        </p>
      </section>
    </div>
  );
}
