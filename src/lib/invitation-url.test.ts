import { describe, expect, it } from "vitest";

import { extractInvitationCodeFromUrl } from "@/src/lib/invitation-url";

describe("extractInvitationCodeFromUrl", () => {
  it("returns null when no query or hash is present", () => {
    expect(extractInvitationCodeFromUrl("https://example.com/")).toBeNull();
  });

  it("returns null for an empty password value", () => {
    expect(
      extractInvitationCodeFromUrl("https://example.com/?password="),
    ).toBeNull();
  });

  it("reads a plain query password", () => {
    expect(
      extractInvitationCodeFromUrl("https://example.com/?password=cozy-kitten"),
    ).toBe("cozy-kitten");
  });

  it("preserves literal + in the query password", () => {
    expect(
      extractInvitationCodeFromUrl("https://example.com/?password=anna+aeneas"),
    ).toBe("anna+aeneas");
  });

  it("decodes %2B in the query password", () => {
    expect(
      extractInvitationCodeFromUrl(
        "https://example.com/?password=anna%2Baeneas",
      ),
    ).toBe("anna+aeneas");
  });

  it("reads the password from the hash fragment", () => {
    expect(
      extractInvitationCodeFromUrl("https://example.com/#password=anna+aeneas"),
    ).toBe("anna+aeneas");
  });

  it("prefers the hash fragment when both query and hash are present", () => {
    expect(
      extractInvitationCodeFromUrl(
        "https://example.com/?password=from-query#password=from-hash",
      ),
    ).toBe("from-hash");
  });

  it("ignores unrelated query keys and malformed URLs", () => {
    expect(
      extractInvitationCodeFromUrl("https://example.com/?foo=bar"),
    ).toBeNull();
    expect(extractInvitationCodeFromUrl("not a url at all")).toBeNull();
  });

  it("trims surrounding whitespace", () => {
    expect(
      extractInvitationCodeFromUrl(
        "https://example.com/?password=%20anna%2Baeneas%20",
      ),
    ).toBe("anna+aeneas");
  });
});
