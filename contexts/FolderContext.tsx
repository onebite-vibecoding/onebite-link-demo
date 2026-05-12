"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";

type Folder = { id: number; name: string };

type FolderContextType = {
  folders: Folder[];
  addFolder: (name: string) => Promise<void>;
  deleteFolder: (id: number) => Promise<void>;
  renameFolder: (id: number, name: string) => Promise<void>;
};

const FolderContext = createContext<FolderContextType | null>(null);

const storageKey = (userId: string) => `demo:folders:${userId}`;

function readLocal(userId: string): Folder[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(storageKey(userId));
    return raw ? (JSON.parse(raw) as Folder[]) : null;
  } catch {
    return null;
  }
}

function writeLocal(userId: string, folders: Folder[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(storageKey(userId), JSON.stringify(folders));
}

export function FolderProvider({ children }: { children: ReactNode }) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setFolders([]);
    if (!userId) return;

    const cached = readLocal(userId);
    if (cached) {
      setFolders(cached);
      return;
    }

    const supabase = createClient();
    supabase
      .from("folders")
      .select("id, name")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data) {
          setFolders(data);
          writeLocal(userId, data);
        }
      });
  }, [userId]);

  function persist(next: Folder[]) {
    setFolders(next);
    if (userId) writeLocal(userId, next);
  }

  async function addFolder(name: string) {
    persist([...folders, { id: -Date.now(), name }]);
  }

  async function deleteFolder(id: number) {
    persist(folders.filter((f) => f.id !== id));
  }

  async function renameFolder(id: number, name: string) {
    persist(folders.map((f) => (f.id === id ? { ...f, name } : f)));
  }

  return (
    <FolderContext.Provider value={{ folders, addFolder, deleteFolder, renameFolder }}>
      {children}
    </FolderContext.Provider>
  );
}

export function useFolders() {
  const ctx = useContext(FolderContext);
  if (!ctx) throw new Error("useFolders must be used within FolderProvider");
  return ctx;
}
