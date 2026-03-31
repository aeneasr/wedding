import { describe, expect, it } from "vitest";

import { buildCalendarFile } from "@/src/lib/calendar";

describe("buildCalendarFile", () => {
  it("includes the RSVP link and one-month reminder alarm", () => {
    const calendar = buildCalendarFile(
      "event_2",
      "en",
      "https://example.com/invite/abc",
    );

    expect(calendar).toContain("TRIGGER:-P1M");
    expect(calendar).toContain("https://example.com/invite/abc");
    expect(calendar).toContain("BEGIN:VEVENT");
  });
});
