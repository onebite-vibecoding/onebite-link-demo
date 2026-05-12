"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFolders } from "@/contexts/FolderContext";
import { useLinks } from "@/contexts/LinkContext";

export default function NewLinkForm() {
  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState("");
  const [loading, setLoading] = useState(false);

  const { folders } = useFolders();
  const { addLink } = useLinks();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/og?url=${encodeURIComponent(url)}`);
      const og = await res.json();

      await addLink({
        title: og.title || url,
        url,
        description: og.description || "",
        thumbnail_url: og.image || null,
        folder_id: folderId ? Number(folderId) : null,
      });

      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 bg-[var(--card)] rounded-[8px] border border-[var(--border)] p-6 w-full max-w-lg"
    >
      <h2 className="text-xl font-semibold text-[var(--text)]">새 링크 추가</h2>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="url" className="text-sm font-medium text-[var(--text)]">
          링크
        </label>
        <input
          id="url"
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="input-base"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="folder" className="text-sm font-medium text-[var(--text)]">
          폴더
        </label>
        <select
          id="folder"
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
          required
          className="input-base"
        >
          <option value="" disabled>
            폴더를 선택하세요
          </option>
          {folders.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-accent mt-1 px-4 py-2 text-sm font-medium rounded-[6px] disabled:opacity-60"
      >
        {loading ? "저장 중..." : "저장"}
      </button>
    </form>
  );
}
