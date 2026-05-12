"use client";

import { useState } from "react";
import DeleteLinkModal from "@/components/DeleteLinkModal";
import EditLinkModal from "@/components/EditLinkModal";

type LinkCardProps = {
  id: number;
  title: string | null;
  url: string;
  description: string | null;
  folder_id: number | null;
  thumbnail_url: string | null;
  folderName?: string;
};

export default function LinkCard({ id, title, url, description, folder_id, thumbnail_url, folderName }: LinkCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <div className="card-hover group relative flex flex-col bg-[var(--card)] rounded-[8px] border border-[var(--border)] overflow-hidden transition-colors max-w-[300px]">
        {thumbnail_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnail_url}
            alt={title ?? ""}
            className="w-full h-36 object-cover"
          />
        )}
        <div className="flex flex-col gap-3 p-4 overflow-hidden">
          {folderName && (
            <span className="self-start text-[13px] px-2 py-0.5 rounded-[4px] bg-[var(--hover-bg)] text-[var(--text)]">
              {folderName}
            </span>
          )}
          <h3 className="text-sm font-semibold text-[var(--text)] line-clamp-1">
            {title ?? url}
          </h3>
          <p className="text-sm text-[var(--text-sub)] line-clamp-2 leading-relaxed">
            {description}
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--accent)] hover:underline truncate mt-auto transition-colors"
          >
            {url}
          </a>
        </div>

        {/* 수정 버튼 */}
        <button
          onClick={() => setShowEditModal(true)}
          className="absolute top-2 right-10 p-1.5 rounded-[6px] text-[var(--text-sub)] bg-[var(--card)] border border-[var(--border)] opacity-0 group-hover:opacity-100 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
          aria-label="링크 수정"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>

        {/* 삭제 버튼 */}
        <button
          onClick={() => setShowDeleteModal(true)}
          className="absolute top-2 right-2 p-1.5 rounded-[6px] text-[var(--text-sub)] bg-[var(--card)] border border-[var(--border)] opacity-0 group-hover:opacity-100 hover:text-red-500 hover:border-red-300 transition-all"
          aria-label="링크 삭제"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      </div>

      {showEditModal && (
        <EditLinkModal
          linkId={id}
          currentTitle={title ?? ""}
          currentDescription={description ?? ""}
          currentFolderId={folder_id}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteLinkModal
          linkId={id}
          linkTitle={title ?? url}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}
