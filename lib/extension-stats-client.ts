export type ExtensionStatsPayload = {
  topExtensionName: string;
  secondExtensionName: string;
  topWeeklyUsers: number;
  secondWeeklyUsers: number;
  percentMoreThanSecond: number;
  usageMultiplierVsSecond: number;
  weeklyUserDeltaVsSecond: number;
  extractedAt: string;
};

let inFlight: Promise<ExtensionStatsPayload | null> | null = null;
let cached: ExtensionStatsPayload | null = null;
let cachedAt = 0;

const CACHE_TTL_MS = 60 * 1000;

function hasFreshCache() {
  return !!cached && Date.now() - cachedAt < CACHE_TTL_MS;
}

function isValidPayload(data: unknown): data is ExtensionStatsPayload {
  if (!data || typeof data !== "object") return false;
  const entry = data as Record<string, unknown>;
  return [
    "topExtensionName",
    "secondExtensionName",
    "topWeeklyUsers",
    "secondWeeklyUsers",
    "percentMoreThanSecond",
    "usageMultiplierVsSecond",
    "weeklyUserDeltaVsSecond",
  ].every((key) => {
    const value = entry[key];
    if (key === "topExtensionName" || key === "secondExtensionName") {
      return typeof value === "string" && value.trim().length > 0;
    }
    return Number.isFinite(Number(value));
  });
}

export function getCachedExtensionStats(): ExtensionStatsPayload | null {
  if (!hasFreshCache()) return null;
  return cached;
}

export async function primeExtensionStats(options: { force?: boolean } = {}): Promise<ExtensionStatsPayload | null> {
  const force = !!options.force;

  if (!force && hasFreshCache()) return cached;
  if (inFlight) return inFlight;

  const requestUrl = `/api/extension-stats?t=${Date.now()}`;

  inFlight = fetch(requestUrl, { cache: "no-store" })
    .then(async (response) => {
      if (!response.ok) return cached;
      const data = await response.json();
      if (!isValidPayload(data)) return cached;
      cached = data;
      cachedAt = Date.now();
      return data;
    })
    .catch(() => cached)
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
}
