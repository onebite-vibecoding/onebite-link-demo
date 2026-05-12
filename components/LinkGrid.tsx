"use client";

import LinkCard from "@/components/LinkCard";
import { useLinks } from "@/contexts/LinkContext";
import { useFolders } from "@/contexts/FolderContext";

type LinkGridProps = {
  folderId?: string;
};

export default function LinkGrid({ folderId }: LinkGridProps) {
  const { links } = useLinks();
  const { folders } = useFolders();

  const filtered = folderId
    ? links.filter((l) => l.folder_id === Number(folderId))
    : links;

  const folderMap = Object.fromEntries(folders.map((f) => [f.id, f.name]));

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,300px))] gap-4">
      {filtered.map((link) => (
        <LinkCard
          key={link.id}
          {...link}
          folderName={link.folder_id != null ? folderMap[link.folder_id] : undefined}
        />
      ))}
    </div>
  );
}
