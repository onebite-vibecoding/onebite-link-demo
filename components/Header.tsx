"use client";

import Link from "next/link";
import { useState } from "react";
import NewFolderModal from "./NewFolderModal";
import DemoBanner from "./DemoBanner";

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <DemoBanner />
      <header className="header-nav flex items-center justify-between px-4 h-12 border-b border-[var(--border)] shrink-0">
        <span className="text-base font-semibold text-[var(--text)]">
          한입 링크
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-1.5 text-sm font-medium rounded-[6px] border border-[var(--border)] text-[var(--text)] nav-item transition-colors"
          >
            + 새 폴더
          </button>
          <Link
            href="/new"
            className="btn-accent px-4 py-1.5 text-sm font-medium rounded-[6px]"
          >
            + 새 링크
          </Link>
        </div>
      </header>
      {modalOpen && <NewFolderModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
