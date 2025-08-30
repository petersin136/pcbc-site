// app/admin/hero/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase/client";

const MAX_BYTES = 50 * 1024 * 1024; // 50MB

export default function AdminHeroVideoPage() {
  const supabase = getSupabase(); // env가 비면 하드코딩 폴백/경고 사용하는 버전
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  // 현재 hero 버킷의 첫 파일을 가져와 미리보기
  useEffect(() => {
    (async () => {
      if (!supabase) return;
      const { data, error } = await supabase
        .from("storage.objects")
        .select("name")
        .eq("bucket_id", "hero")
        .order("created_at", { ascending: true })
        .limit(1);
      if (error) return;
      if (data && data.length > 0) {
        const { data: pub } = supabase.storage.from("hero").getPublicUrl(data[0].name);
        setCurrentUrl(pub.publicUrl);
      }
    })();
  }, [supabase]);

  const onChooseFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setMsg(null);

    if (!file) return;
    if (!supabase) {
      setMsg("Supabase 설정이 비어 있습니다. .env.local 또는 하드코딩 값을 확인하세요.");
      return;
    }
    if (!["video/mp4", "video/webm", "video/ogg"].includes(file.type)) {
      setMsg("mp4/webm/ogg 형식의 영상만 업로드 가능합니다.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setMsg("파일이 50MB를 초과합니다. 50MB 이하로 줄여서 올려 주세요.");
      return;
    }

    // 파일명: hero-YYYYMMDD-HHMMSS-원본이름 (Tailwind 스캐너와 충돌 피하기 위해 정규식 미사용)
    const now = new Date();
    const two = (n: number) => String(n).padStart(2, "0");
    const stamp =
      `${now.getFullYear()}${two(now.getMonth() + 1)}${two(now.getDate())}` +
      `${two(now.getHours())}${two(now.getMinutes())}${two(now.getSeconds())}`;
    const path = `hero-${stamp}-${file.name}`;

    try {
      setUploading(true);
      setProgress(0);

      // Supabase JS SDK는 onUploadProgress가 없으므로 UI에 가짜 진행률(느리게 증가)
      const fake = setInterval(() => {
        setProgress((p) => {
          if (p === null) return 5;
          return Math.min(p + 7, 90);
        });
      }, 200);

      const { error } = await supabase
        .storage
        .from("hero")
        .upload(path, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: file.type,
        });

      clearInterval(fake);

      if (error) throw error;

      // 업로드 완료 표시
      setProgress(100);
      const { data: pub } = supabase.storage.from("hero").getPublicUrl(path);
      setCurrentUrl(pub.publicUrl);
      setMsg("업로드 완료! 히어로 영상이 교체되었습니다.");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "업로드 중 오류가 발생했습니다.";
      console.error(err);
      setMsg(message);
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(null), 1000);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-4 text-2xl font-bold">히어로 영상 업로드(≤ 50MB)</h1>

      <div className="mb-6 rounded-lg border p-4">
        <p className="mb-3 text-sm text-gray-600">
          mp4 / webm / ogg 형식만 허용됩니다. 업로드하면 사이트 메인 히어로에 즉시 반영됩니다.
        </p>

        <label className="inline-block cursor-pointer rounded border px-4 py-2 text-sm hover:bg-gray-50">
          파일 선택
          <input
            type="file"
            accept="video/mp4,video/webm,video/ogg"
            className="hidden"
            onChange={onChooseFile}
            disabled={uploading}
          />
        </label>

        {progress !== null && (
          <div className="mt-3 h-2 w-full overflow-hidden rounded bg-gray-100">
            <div
              className="h-2 bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {msg && <p className="mt-3 text-sm text-gray-700">{msg}</p>}
      </div>

      <div className="rounded-lg border p-4">
        <h2 className="mb-3 text-lg font-semibold">현재 히어로 영상 미리보기</h2>
        {currentUrl ? (
          <video
            key={currentUrl}
            src={currentUrl}
            controls
            className="aspect-video w-full rounded"
          />
        ) : (
          <p className="text-gray-500">아직 업로드된 영상이 없습니다.</p>
        )}
      </div>
    </main>
  );
}
