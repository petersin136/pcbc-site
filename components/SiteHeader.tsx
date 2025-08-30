// src/components/SiteHeader.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white text-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* 로고/교회명 */}
        <Link href="/" className="flex items-center gap-3 font-bold text-lg md:text-xl">
          <img
            src="https://bmpsnofcajwxfbuzdkew.supabase.co/storage/v1/object/public/Upload/logo2.png"
            alt="포천중앙침례교회 로고"
            className="h-8 w-8 md:h-9 md:w-9 object-contain"
          />
          포천중앙침례교회
        </Link>

        {/* 모바일 토글 버튼 */}
        <button
          className="md:hidden px-3 py-2 border rounded"
          aria-label="Toggle Menu"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>

        {/* 데스크톱 메뉴 */}
        <nav className="hidden md:flex items-center gap-5 text-sm">
          <Link href="/#about" className="hover:underline">소개</Link>
          <Link href="/#ministries" className="hover:underline">사역</Link>
          <Link href="/#sermons" className="hover:underline">설교</Link>
          <Link href="/#events" className="hover:underline">행사</Link>
          <Link href="/#contact" className="hover:underline">연락처</Link>

          {/* 관리자 버튼 */}
          <Link
            href="/admin"
            className="rounded-md border px-3 py-1.5 font-medium hover:bg-gray-100"
          >
            관리자
          </Link>
        </nav>
      </div>

      {/* 모바일 드로어 메뉴 */}
      {open && (
        <div className="md:hidden border-t bg-white text-gray-900">
          <nav className="px-4 py-2 flex flex-col gap-2 text-sm">
            <Link href="/#about" onClick={() => setOpen(false)}>소개</Link>
            <Link href="/#ministries" onClick={() => setOpen(false)}>사역</Link>
            <Link href="/#sermons" onClick={() => setOpen(false)}>설교</Link>
            <Link href="/#events" onClick={() => setOpen(false)}>행사</Link>
            <Link href="/#contact" onClick={() => setOpen(false)}>연락처</Link>
            <Link
              href="/admin"
              className="mt-2 rounded-md border px-3 py-1.5 font-medium hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              관리자
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
