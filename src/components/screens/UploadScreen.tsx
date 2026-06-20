import { Camera, FileImage, ImagePlus, Upload } from "lucide-react";
import { useState } from "react";
import type { SampleResult } from "@/types";
import { FoodImage } from "../FoodImage";

type UploadScreenProps = {
  samples: SampleResult[];
  selected: SampleResult;
  onSelect: (result: SampleResult) => void;
  onAnalyze: (result: SampleResult) => void;
  onAnalyzeUpload: (file: File, imageUrl: string) => void;
};

export function UploadScreen({
  samples,
  selected,
  onSelect,
  onAnalyze,
  onAnalyzeUpload
}: UploadScreenProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedPreview, setUploadedPreview] = useState("");
  const [fileError, setFileError] = useState("");

  function handleFileChange(file: File | undefined) {
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setFileError("画像ファイルを選んでください。");
      return;
    }

    setFileError("");
    setUploadedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setUploadedPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <header className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-sm">
        <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-500">Meal Check</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">食事を記録する</h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">
          写真をアップロードするか、撮影用サンプルを選んでカロリーを計測できます。
        </p>
      </header>

      <section className="rounded-[28px] border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-zinc-500">
          <FileImage size={16} />
          実画像で試す
        </div>
        <label className="block cursor-pointer overflow-hidden rounded-[24px] border border-dashed border-zinc-300 bg-zinc-50 transition hover:border-pink-200 hover:bg-pink-50/40">
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="sr-only"
            onChange={(event) => handleFileChange(event.target.files?.[0])}
          />
          {uploadedPreview ? (
            <div
              className="aspect-[4/3] bg-cover bg-center"
              style={{ backgroundImage: `url("${uploadedPreview}")` }}
              aria-label="アップロードした食事写真"
            />
          ) : (
            <div className="flex aspect-[4/3] flex-col items-center justify-center px-5 text-center">
              <ImagePlus className="text-zinc-400" size={34} />
              <p className="mt-3 text-sm font-semibold text-zinc-800">食事写真を選択</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                AIが食事名とカロリーを推定します。
              </p>
            </div>
          )}
        </label>
        {fileError && <p className="mt-2 text-xs font-semibold text-rose-500">{fileError}</p>}
        <button
          type="button"
          onClick={() => {
            if (uploadedFile && uploadedPreview) {
              onAnalyzeUpload(uploadedFile, uploadedPreview);
            }
          }}
          disabled={!uploadedFile || !uploadedPreview}
          className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-zinc-950 text-base font-semibold text-white shadow-[0_12px_28px_rgba(24,24,27,0.18)] transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:shadow-none"
        >
          <Upload size={19} />
          カロリーを計測する
        </button>
      </section>

      <section className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white p-2 shadow-sm">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-zinc-100">
          <FoodImage result={selected} />
          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur">
            選択中
          </div>
          <div className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white/90 p-3 shadow-sm backdrop-blur">
            <p className="text-xs font-medium text-zinc-500">{selected.videoTitle}</p>
            <p className="mt-1 text-lg font-semibold leading-tight text-zinc-950">
              {selected.foodName}
            </p>
          </div>
        </div>
        <div className="p-2 pt-3">
          <button
            type="button"
            onClick={() => onAnalyze(selected)}
            data-testid="upload-analyze"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-zinc-950 text-base font-semibold text-white shadow-[0_12px_28px_rgba(24,24,27,0.18)] transition hover:bg-zinc-800"
          >
            <Upload size={19} />
            カロリーを計測する
          </button>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-zinc-500">
          <ImagePlus size={16} />
          撮影用サンプル
        </div>
        <div className="grid gap-3">
          {samples.map((sample) => {
            const active = sample.id === selected.id;
            return (
              <article
                key={sample.id}
                className={`overflow-hidden rounded-[26px] border bg-white p-2 shadow-sm transition ${
                  active
                    ? "border-zinc-950 text-zinc-950"
                    : "border-zinc-200 text-zinc-800 hover:border-zinc-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelect(sample)}
                  className="block w-full text-left"
                >
                  <div className="grid grid-cols-[92px_1fr] gap-3">
                    <div className="h-24 overflow-hidden rounded-[20px] bg-zinc-100">
                      <FoodImage result={sample} />
                    </div>
                    <div className="flex min-w-0 flex-col justify-between py-1">
                      <div>
                        <p className="line-clamp-1 text-xs font-medium text-pink-500">
                          {sample.videoTitle}
                        </p>
                        <h2 className="mt-1 line-clamp-1 text-base font-semibold leading-tight">
                          {sample.foodName}
                        </h2>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-700">
                          {sample.caloriesDisplay}
                        </span>
                        <span className="rounded-full bg-pink-50 px-2.5 py-1 text-[11px] font-medium text-pink-600">
                          {sample.verdictLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
                <div className="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onSelect(sample)}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${
                      active
                        ? "border-zinc-950 bg-zinc-950 text-white"
                        : "border-zinc-200 bg-white text-zinc-500"
                    }`}
                    aria-label={`${sample.foodName}を選択`}
                  >
                    <Camera size={17} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onAnalyze(sample)}
                    data-testid={`sample-${sample.id}`}
                    className="flex h-10 flex-1 items-center justify-center rounded-2xl bg-zinc-950 px-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                  >
                    カロリーを計測する
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
