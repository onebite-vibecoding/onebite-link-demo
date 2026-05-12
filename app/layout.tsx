import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { FolderProvider } from "@/contexts/FolderContext";
import { LinkProvider } from "@/contexts/LinkContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | 한입 링크",
    default: "한입 링크",
  },
  description: "나만의 링크 모음",
  openGraph: {
    title: "한입 링크",
    description: "나만의 링크 모음",
    siteName: "한입 링크",
    images: [{ url: "/thumbnail.png", width: 1200, height: 630 }],
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <FolderProvider>
          <LinkProvider>{children}</LinkProvider>
        </FolderProvider>
      </body>
    </html>
  );
}
