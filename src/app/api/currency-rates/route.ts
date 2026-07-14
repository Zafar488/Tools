import { NextResponse } from "next/server";

// In-memory cache — survives across requests in the same process
const cache: Record<string, { data: unknown; timestamp: number }> = {};
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const base = searchParams.get("base") ?? "USD";

  // Validate currency code format
  if (!/^[A-Z]{3}$/.test(base)) {
    return NextResponse.json({ error: "Invalid currency code. Must be 3 uppercase letters." }, { status: 400 });
  }

  // Check cache
  const cached = cache[base];
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return NextResponse.json(cached.data, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200", "X-Cache": "HIT" },
    });
  }

  // Fetch from Frankfurter
  try {
    const res = await fetch(`https://api.frankfurter.app/latest?from=${base}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Frankfurter API returned ${res.status}`);
    }

    const data = await res.json();
    cache[base] = { data, timestamp: Date.now() };

    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200", "X-Cache": "MISS" },
    });
  } catch (err) {
    // Return stale cache on error
    if (cached) {
      return NextResponse.json(cached.data, {
        headers: { "X-Cache": "STALE" },
      });
    }

    console.error("Currency rates fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch exchange rates. Please try again." }, { status: 502 });
  }
}
