import { describe, expect, it } from "vitest";

import { buildCalendarFile } from "@/src/lib/calendar";

describe("buildCalendarFile", () => {
  it("includes the RSVP link, one-month reminder alarm, and August 2026 timing", () => {
    const calendar = buildCalendarFile(
      "de",
      "https://example.com/invite/abc",
    );

    expect(calendar).toContain("TRIGGER:-P1M");
    expect(calendar).toContain("https://example.com/invite/abc");
    expect(calendar).toContain("BEGIN:VEVENT");
    expect(calendar).toContain("DTSTART:20260822T130000Z");
    expect(calendar).toContain("DTEND:20260822T230000Z");
  });
});
