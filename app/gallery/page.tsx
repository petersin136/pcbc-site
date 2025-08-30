// app/gallery/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getSupabase } from "@/lib/supabase/client";

export default function GalleryPage() {
  const supabase = getSupabase();
  const [urls, setUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.storage
        .from("gallery")
        .list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });
      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }
      const files = (data ?? []).filter((f) => !f.name.startsWith("."));
      const u = files.map((f) => supabase.storage.from("gallery").getPublicUrl(f.name).data.publicUrl);
      setUrls(u);
      setLoading(false);
    };
    load();
  }, [supabase]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">갤러리</h1>

      {!supabase && (
        <p className="mb-4 rounded border border-yellow-200 bg-yellow-50 p-3 text-yellow-800">
          .env.local 설정 후 서버를 재시작해 주세요. (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)
        </p>
      )}

      {loading && <p className="text-gray-500">이미지를 불러오는 중…</p>}
      {!loading && urls.length === 0 && <p className="text-gray-500">아직 업로드된 이미지가 없습니다.</p>}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {urls.map((url) => (
          <div key={url} className="relative aspect-square overflow-hidden rounded-md border">
            <Image src={url} alt="gallery" fill sizes="(max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw" className="object-cover" />
          </div>
        ))}
      </div>
    </main>
  );
}
