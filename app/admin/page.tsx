// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 1) 세션 확인 → 없으면 /login으로 이동
  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;
      if (!session) {
        window.location.href = "/login";
        return;
      }
      setEmail(session.user.email ?? null);
      setLoading(false);
    };
    check();
  }, []);

  // 2) 로그아웃
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <p className="text-gray-500">확인 중…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">관리자 페이지</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{email}</span>
          <button
            onClick={handleSignOut}
            className="rounded border px-3 py-1.5 text-sm hover:bg-gray-50"
          >
            로그아웃
          </button>
        </div>
      </div>

      {/* 이후 단계에서: 텍스트/이미지 편집, 갤러리 업로드 UI가 여기 들어옵니다 */}
      <section className="rounded-lg border p-4">
        <h2 className="mb-2 text-lg font-semibold">대시보드</h2>
        <p className="text-gray-600">
          로그인 보호 적용 완료. 다음 단계에서 “갤러리 업로드”와 “히어로 이미지 관리”를 연결합니다.
        </p>
      </section>
    </main>
  );
}
