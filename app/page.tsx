// app/page.tsx
"use client";

// no hooks needed in this component
// import { useEffect, useState } from "react";
// import { getSupabase } from "@/lib/supabase/client";
// import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  // const supabase = getSupabase();
  // const [heroUrl, setHeroUrl] = useState<string | null>(null);
  // const [loadingHero, setLoadingHero] = useState(true);

  // useEffect(() => {
  //   const loadHero = async () => {
  //     if (!supabase) {
  //       setLoadingHero(false);
  //       return;
  //     }
  //     const { data, error } = await supabase.storage
  //       .from("hero")
  //       .list("", { sortBy: { column: "created_at", order: "asc" } });
  //     if (error) {
  //       console.error(error);
  //       setLoadingHero(false);
  //       return;
  //     }
  //     const files = (data ?? []).filter((f) => !f.name.startsWith("."));
  //     if (files.length > 0) {
  //       const { data: pub } = supabase.storage.from("hero").getPublicUrl(files[0].name);
  //       setHeroUrl(pub.publicUrl);
  //     }
  //     setLoadingHero(false);
  //   };
  //   loadHero();
  // }, [supabase]);

  const EnvBanner =
    !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? (
      <div className="bg-yellow-50 text-yellow-800 border border-yellow-200 px-4 py-2 text-sm">
        .env.local을 확인하고 서버를 재시작하세요. (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)
      </div>
    ) : null;

  return (
    <main>
      {EnvBanner}
      {/* ✅ 상단: 영상 히어로 (이미지 오버레이 포함) */}
      <div className="relative h-[56vw] max-h-[720px] min-h-[240px] md:min-h-[320px] w-full overflow-hidden">
        {/* ▶ 배경 영상 */}
        <video
          src="https://bmpsnofcajwxfbuzdkew.supabase.co/storage/v1/object/public/Upload/283533_medium.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-contain md:object-cover"
        />

        {/* 밝기 조정: 어둡기 낮춤 */}
        <div className="absolute inset-0 bg-black/10" />

        {/* 상단 이미지 오버레이 (가독성 위해 적절한 투명도) */}
        <img
          src="https://bmpsnofcajwxfbuzdkew.supabase.co/storage/v1/object/public/Upload/he.png"
          alt="히어로 오버레이"
          className="pointer-events-none absolute inset-0 h-full w-full object-contain md:object-cover opacity-90 mix-blend-screen"
        />
        {/* 버튼: 히어로 제목(이미지 텍스트) 아래 여백에 배치 */}
        <div className="absolute z-20 right-14 md:right-20 top-1/2 -translate-y-1/2 -mt-24 md:-mt-28 transform">
          <div className="flex gap-3 justify-end">
            <a
              href="#about"
              className="rounded-md bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-white"
            >
              교회 소개
            </a>
            <Link
              href="/gallery"
              className="rounded-md border border-white/70 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
            >
              갤러리 보기
            </Link>
          </div>
        </div>
      </div>

      {/* 히어로와 다음 섹션 사이 화이트 경계선 (≈5mm ≒ 20px) */}
      <div className="h-5 w-full bg-white" />


      {/* ✅ 두 번째: 이미지 섹션 */}
      <section className="relative h-[56vw] max-h-[720px] min-h-[240px] md:min-h-[320px] w-full overflow-hidden">
        <img
          src="https://bmpsnofcajwxfbuzdkew.supabase.co/storage/v1/object/public/Upload/well.png"
          alt="교회 이미지"
          className="absolute inset-0 h-full w-full object-contain md:object-cover"
        />
        {/* 원본 밝기 유지: 오버레이/투명도 조절 없음 */}
        {/* 이 섹션에는 버튼 없음 */}
      </section>

      <section id="about" className="relative overflow-hidden">
        {/* 배경 이미지 교체 */}
        <img
          src="https://bmpsnofcajwxfbuzdkew.supabase.co/storage/v1/object/public/Upload/ch.png"
          alt="교회 소개 배경"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* 내용: 우측 끝에서 약 20mm(≈80px) 띄워 우측 정렬 */}
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <div className="ml-auto max-w-prose pr-20 text-right">
            <h2 className="mb-2 text-2xl font-semibold text-white">소개</h2>
            <p className="text-white/90">포천중앙침례교회는 “오직예수! 오직전도!”의 표어 아래 복음을 전하는 공동체입니다.</p>
          </div>
        </div>
      </section>
      <section id="ministries" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-2 text-2xl font-semibold">사역</h2>
        <p className="text-gray-600">중고등부/청년부, 유치부, 주일학교, 목장(1~9), 야다 찬양단…</p>
      </section>
      <section id="sermons" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-2 text-2xl font-semibold">설교</h2>
        <p className="text-gray-600">말씀 영상/오디오가 이 영역에 정리됩니다.</p>
      </section>
      <section id="events" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-2 text-2xl font-semibold">행사</h2>
        <p className="text-gray-600">다가오는 집회/수련회/선교 일정을 안내합니다.</p>
      </section>
      <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-2 text-2xl font-semibold">연락처</h2>
        <p className="text-gray-600">경기도 포천시 중앙로 105번길 23-2(신읍동-10) / 031-534-5078 · 535-0571</p>
      </section>
    </main>
  );
}
