import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createClient = (cookieStore: Awaited<ReturnType<typeof cookies>>) => {
  return createServerClient<any, "ob_vibecoding_link">(
    supabaseUrl!,
    supabaseKey!,
    {
      db: { schema: "ob_vibecoding_link" },
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};
