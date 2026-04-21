const PARAM = "password";

function parseRawPairs(segment: string): string | null {
  if (!segment) return null;
  for (const pair of segment.split("&")) {
    const eq = pair.indexOf("=");
    const rawKey = eq === -1 ? pair : pair.slice(0, eq);
    const rawValue = eq === -1 ? "" : pair.slice(eq + 1);
    let key: string;
    try {
      key = decodeURIComponent(rawKey);
    } catch {
      continue;
    }
    if (key !== PARAM) continue;
    let value: string;
    try {
      value = decodeURIComponent(rawValue);
    } catch {
      return null;
    }
    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed;
  }
  return null;
}

export function extractInvitationCodeFromUrl(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  const fromHash = parseRawPairs(parsed.hash.replace(/^#/, ""));
  if (fromHash !== null) return fromHash;
  return parseRawPairs(parsed.search.replace(/^\?/, ""));
}
