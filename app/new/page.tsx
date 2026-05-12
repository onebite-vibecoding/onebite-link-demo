import type { Metadata } from "next";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import NewLinkForm from "@/components/NewLinkForm";

export const metadata: Metadata = {
  title: "새 링크",
};

export default function NewPage() {
  return (
    <div className="flex flex-col h-screen bg-[var(--bg)]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6 flex items-start justify-center">
          <NewLinkForm />
        </main>
      </div>
    </div>
  );
}
