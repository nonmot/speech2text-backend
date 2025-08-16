import type { KeywordHit } from "../types";

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function findKeywordMatches(
  text: string,
  keywords: string[],
  contextLen = 24
) {
  const hits: KeywordHit[] = [];
  for (const kw of keywords) {
    if (!kw) continue;
    const re = RegExp(escapeRegExp(kw), "g");
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      const start = m.index;
      const end = start + kw.length;

      const beforeStart = Math.max(0, start - contextLen);
      const afterEnd = Math.min(text.length, end + contextLen);

      hits.push({
        keyword: kw,
        start,
        end,
        aroundText: {
          before: text.slice(beforeStart, start),
          match: text.slice(start, end),
          after: text.slice(end, afterEnd),
        },
      });
    }
  }
  hits.sort((a, b) => a.start - b.start || a.end - a.start - (b.end - b.start));
  return hits;
}
