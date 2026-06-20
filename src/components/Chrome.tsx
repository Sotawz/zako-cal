import type { ReactNode } from "react";
import { Camera, History, Settings, Trophy } from "lucide-react";
import type { AppView } from "@/types";

type ChromeProps = {
  view: AppView;
  children: ReactNode;
  onNavigate: (view: AppView) => void;
};

const navItems: Array<{ view: AppView; label: string; icon: typeof Camera }> = [
  { view: "home", label: "今日", icon: Trophy },
  { view: "upload", label: "判定", icon: Camera },
  { view: "history", label: "履歴", icon: History },
  { view: "settings", label: "設定", icon: Settings }
];

export function Chrome({ view, children, onNavigate }: ChromeProps) {
  const showNav = view !== "result" && view !== "detail" && view !== "analyzing";
  const isFullscreenResult = view === "result";

  return (
    <main className={isFullscreenResult ? "min-h-screen" : "min-h-screen px-3 py-4 sm:px-6"}>
      <div
        className={`mx-auto flex w-full max-w-[430px] flex-col ${
          isFullscreenResult ? "min-h-screen" : "min-h-[calc(100vh-2rem)]"
        }`}
      >
        {children}
        {showNav && (
          <nav className="mt-5 grid grid-cols-4 gap-2 rounded-[24px] border border-zinc-200 bg-white p-2 shadow-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = view === item.view;
              return (
                <button
                  key={item.view}
                  type="button"
                  onClick={() => onNavigate(item.view)}
                  className={`flex h-12 items-center justify-center gap-1 rounded-2xl text-[11px] font-semibold transition ${
                    active
                      ? "bg-zinc-950 text-white"
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                  }`}
                  aria-label={item.label}
                >
                  <Icon size={17} strokeWidth={2.6} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}
      </div>
    </main>
  );
}
