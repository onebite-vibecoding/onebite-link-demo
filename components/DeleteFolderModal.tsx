"use client";

import { useFolders } from "@/contexts/FolderContext";

type Props = {
  folderId: number;
  folderName: string;
  onClose: () => void;
};

export default function DeleteFolderModal({ folderId, folderName, onClose }: Props) {
  const { deleteFolder } = useFolders();

  async function handleConfirm() {
    await deleteFolder(folderId);
    onClose();
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
        <h2 className="text-base font-semibold text-[var(--text)]">폴더 삭제</h2>
        <p className="text-sm text-[var(--text-sub)]">
          <span className="font-medium text-[var(--text)]">{folderName}</span> 폴더를 삭제할까요?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-sm font-medium rounded-[6px] text-[var(--text-sub)] nav-item transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-1.5 text-sm font-medium rounded-[6px] bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
