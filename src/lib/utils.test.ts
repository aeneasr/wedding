import { describe, expect, it } from "vitest";

import { formatDateTime } from "@/src/lib/utils";

describe("formatDateTime", () => {
  it("uses German formatting by default", () => {
    expect(formatDateTime("2026-08-20T18:00:00+02:00")).toBe(
      "Donnerstag, 20 August 2026 um 18:00",
    );
  });
});
