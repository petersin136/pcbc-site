// app/layout.tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";

// 구글 폰트(Geist)
const geistSans = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "포천중앙침례교회",
  description: "오직예수! 오직전도! 제자 되고 제자 삼자",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* 상단 고정 헤더 */}
          <SiteHeader />
          {/* 페이지 내용 */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
