import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const createClient = () =>
  createBrowserClient<unknown, "ob_vibecoding_link">(
    supabaseUrl!,
    supabaseKey!,
    { db: { schema: "ob_vibecoding_link" } },
  );
