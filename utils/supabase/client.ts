import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createClient = () =>
  createBrowserClient<any, "ob_vibecoding_link">(
    supabaseUrl!,
    supabaseKey!,
    { db: { schema: "ob_vibecoding_link" } },
  );
