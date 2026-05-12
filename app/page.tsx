import type { Metadata } from "next";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LinkGrid from "@/components/LinkGrid";

export const metadata: Metadata = {
  title: "홈",
};

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-[var(--bg)]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <LinkGrid />
        </main>
      </div>
    </div>
  );
}
