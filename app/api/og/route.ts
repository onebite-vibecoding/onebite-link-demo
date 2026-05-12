import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return Response.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
    });
    const html = await res.text();

    const getOgTag = (property: string) => {
      const m =
        html.match(
          new RegExp(
            `<meta[^>]+property=["']og:${property}["'][^>]+content=["']([^"']+)["']`,
            "i"
          )
        ) ??
        html.match(
          new RegExp(
            `<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:${property}["']`,
            "i"
          )
        );
      return m?.[1] ?? "";
    };

    const titleFallback = () => {
      const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      return m?.[1]?.trim() ?? "";
    };

    return Response.json({
      title: getOgTag("title") || titleFallback(),
      description: getOgTag("description"),
      image: getOgTag("image"),
    });
  } catch {
    return Response.json({ error: "Failed to fetch URL" }, { status: 500 });
  }
}
