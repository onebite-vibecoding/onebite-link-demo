"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { createClient } from "@/utils/supabase/client";

export type Link = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
};

type LinkContextType = {
  links: Link[];
  addLink: (link: Omit<Link, "id">) => Promise<void>;
  deleteLink: (id: number) => Promise<void>;
  updateLink: (id: number, fields: Pick<Link, "title" | "description" | "folder_id">) => Promise<void>;
};

const LinkContext = createContext<LinkContextType | null>(null);

const storageKey = (userId: string) => `demo:links:${userId}`;

function readLocal(userId: string): Link[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(storageKey(userId));
    return raw ? (JSON.parse(raw) as Link[]) : null;
  } catch {
    return null;
  }
}

function writeLocal(userId: string, links: Link[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(storageKey(userId), JSON.stringify(links));
}

export function LinkProvider({ children }: { children: ReactNode }) {
  const [links, setLinks] = useState<Link[]>([]);
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
    setLinks([]);
    if (!userId) return;

    const cached = readLocal(userId);
    if (cached) {
      setLinks(cached);
      return;
    }

    const supabase = createClient();
    supabase
      .from("links")
      .select("id, url, title, description, thumbnail_url, folder_id")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) {
          setLinks(data);
          writeLocal(userId, data);
        }
      });
  }, [userId]);

  function persist(next: Link[]) {
    setLinks(next);
    if (userId) writeLocal(userId, next);
  }

  async function addLink(link: Omit<Link, "id">) {
    persist([{ id: -Date.now(), ...link }, ...links]);
  }

  async function deleteLink(id: number) {
    persist(links.filter((l) => l.id !== id));
  }

  async function updateLink(id: number, fields: Pick<Link, "title" | "description" | "folder_id">) {
    persist(links.map((l) => (l.id === id ? { ...l, ...fields } : l)));
  }

  return (
    <LinkContext.Provider value={{ links, addLink, deleteLink, updateLink }}>
      {children}
    </LinkContext.Provider>
  );
}

export function useLinks() {
  const ctx = useContext(LinkContext);
  if (!ctx) throw new Error("useLinks must be used within LinkProvider");
  return ctx;
}
