"use client";

import { useState } from "react";
import { useFolders } from "@/contexts/FolderContext";

type Props = {
  folderId: number;
  currentName: string;
  onClose: () => void;
};

export default function EditFolderModal({ folderId, currentName, onClose }: Props) {
  const [name, setName] = useState(currentName);
  const { renameFolder } = useFolders();

  async function handleSave() {
    const trimmed = name.trim();
    if (!trimmed) return;
    await renameFolder(folderId, trimmed);
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
        <h2 className="text-base font-semibold text-[var(--text)]">폴더 수정</h2>
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
            className="btn-accent px-4 py-1.5 text-sm font-medium rounded-[6px]"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
