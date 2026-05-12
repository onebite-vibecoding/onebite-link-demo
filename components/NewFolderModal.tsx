"use client";

import { useState } from "react";
import { useFolders } from "@/contexts/FolderContext";

type Props = {
  onClose: () => void;
};

export default function NewFolderModal({ onClose }: Props) {
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const { addFolder } = useFolders();

  async function handleSave() {
    const trimmed = name.trim();
    if (!trimmed || saving) return;
    setSaving(true);
    await addFolder(trimmed);
    onClose();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className="bg-[var(--card)] rounded-[10px] shadow-lg p-6 w-80 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-base font-semibold text-[var(--text)]">새 폴더</h2>
        <input
          className="input-base"
          placeholder="폴더 이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-sm font-medium rounded-[6px] text-[var(--text-sub)] nav-item transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-accent px-4 py-1.5 text-sm font-medium rounded-[6px] disabled:opacity-50"
          >
            {saving ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}
