import { NextResponse } from "next/server";

const EXTENSIONS_URL = "https://flavortown.hackclub.com/explore/extensions?sort=top";

type ExtensionStats = {
  topExtensionName: string;
  secondExtensionName: string;
  topWeeklyUsers: number;
  secondWeeklyUsers: number;
  percentMoreThanSecond: number;
  usageMultiplierVsSecond: number;
  weeklyUserDeltaVsSecond: number;
  extractedAt: string;
};

type ExtensionCard = {
  name: string;
  weeklyUsers: number;
};

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function extractExtensionCardsFromHtml(html: string): ExtensionCard[] {
  const cardRegex = /<div class="project-card project-card--extension">[\s\S]*?<a class="project-card__title-link"[^>]*>([^<]+)<\/a>[\s\S]*?<h5>\s*(\d+)\s+weekly users\s*<\/h5>[\s\S]*?<\/div>\s*<\/div>/gi;

  return Array.from(html.matchAll(cardRegex))
    .map((match) => {
      const rawName = match[1] || "";
      const rawUsers = match[2] || "0";
      const weeklyUsers = parseInt(rawUsers, 10);
      return {
        name: decodeEntities(rawName),
        weeklyUsers,
      };
    })
    .filter((entry) => entry.name.length > 0 && Number.isFinite(entry.weeklyUsers) && entry.weeklyUsers >= 0);
}

function extractWeeklyUsersFromHtml(html: string): number[] {
  const fromCards = extractExtensionCardsFromHtml(html)
    .map((entry) => entry.weeklyUsers)
    .filter((value) => Number.isFinite(value) && value >= 0);

  if (fromCards.length >= 2) return fromCards;

  const matches = html.match(/(\d+)\s+weekly users/gi) || [];
  const fallback = matches
    .map((entry) => {
      const value = entry.match(/\d+/)?.[0] || "0";
      return parseInt(value, 10);
    })
    .filter((value) => Number.isFinite(value) && value >= 0);

  return fallback;
}

function buildStats(values: number[], cards: ExtensionCard[]): ExtensionStats | null {
  if (values.length < 2) return null;

  const rankedPairs = cards.length >= 2
    ? [...cards].sort((a, b) => b.weeklyUsers - a.weeklyUsers)
    : [...values]
        .sort((a, b) => b - a)
        .slice(0, 2)
        .map((weeklyUsers, index) => ({
          name: index === 0 ? "Top extension" : "#2 extension",
          weeklyUsers,
        }));

  const top = rankedPairs[0]?.weeklyUsers;
  const second = rankedPairs[1]?.weeklyUsers;
  if (!Number.isFinite(top) || !Number.isFinite(second) || second <= 0) return null;

  const percentMore = Math.round(((top - second) / second) * 100);
  const multiplier = Number((top / second).toFixed(1));
  const delta = top - second;

  return {
    topExtensionName: rankedPairs[0]?.name || "Top extension",
    secondExtensionName: rankedPairs[1]?.name || "#2 extension",
    topWeeklyUsers: top,
    secondWeeklyUsers: second,
    percentMoreThanSecond: percentMore,
    usageMultiplierVsSecond: multiplier,
    weeklyUserDeltaVsSecond: delta,
    extractedAt: new Date().toISOString(),
  };
}

export async function GET() {
  try {
    const response = await fetch(EXTENSIONS_URL, {
      headers: {
        "User-Agent": "ftutilswebsite/1.0 (+https://ftutils.hridya.tech)",
        Accept: "text/html",
      },
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Upstream status ${response.status}` }, { status: 502 });
    }

    const html = await response.text();
    const cards = extractExtensionCardsFromHtml(html);
    const values = extractWeeklyUsersFromHtml(html);
    const stats = buildStats(values, cards);

    console.info("[extension-stats] parsed weekly users", {
      matchCount: values.length,
      firstTen: values.slice(0, 10),
      topTwo: values.length >= 2 ? [...values].sort((a, b) => b - a).slice(0, 2) : null,
      topNames: cards.slice(0, 2).map((card) => card.name),
    });

    if (!stats) {
      return NextResponse.json({ error: "Unable to parse extension stats" }, { status: 502 });
    }

    return NextResponse.json(stats, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch extension stats" }, { status: 500 });
  }
}
