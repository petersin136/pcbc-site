// lib/supabase/client.ts
"use client";

import { createClient as createBrowserClient, SupabaseClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * 환경변수가 아직 안 읽힌 경우에도 앱이 죽지 않도록
 * null을 반환합니다. 화면에서 체크할 수 있게요.
 */
export function getSupabase(): SupabaseClient | null {
  if (!URL || !ANON) {
    console.warn(
      "[supabase] env missing. Check .env.local and restart (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)"
    );
    return null;
  }
  return createBrowserClient(URL, ANON);
}

// Convenience wrapper to match component imports expecting `createClient()`
export function createClient(): SupabaseClient {
  const client = getSupabase();
  if (!client) {
    throw new Error(
      "Supabase environment variables are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }
  return client;
}
