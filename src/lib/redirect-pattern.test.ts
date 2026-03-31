import { describe, expect, it } from "vitest";

/**
 * These tests document the NEXT_REDIRECT bug pattern and its fix.
 *
 * Next.js `redirect()` works by throwing a special error with digest
 * "NEXT_REDIRECT". If a server action wraps `redirect()` inside a try-catch,
 * the catch block swallows it and the redirect string leaks to the UI.
 *
 * The fix: always call `redirect()` OUTSIDE try-catch blocks.
 */

class NextRedirectError extends Error {
  digest = "NEXT_REDIRECT";
  constructor(url: string) {
    super(`NEXT_REDIRECT;${url}`);
  }
}

function simulateRedirect(url: string): never {
  throw new NextRedirectError(url);
}

describe("redirect outside try-catch pattern", () => {
  it("BUG: redirect inside try-catch is swallowed and returns error string", async () => {
    // This simulates the old broken pattern
    async function brokenAction(): Promise<{ error?: string }> {
      try {
        // ... save logic ...
        simulateRedirect("/admin/invitations/123?saved=1");
      } catch (error) {
        return {
          error:
            error instanceof Error
              ? error.message
              : "Unable to save the invitation.",
        };
      }
      return {};
    }

    const result = await brokenAction();
    // The redirect error leaks as a user-visible error message
    expect(result.error).toContain("NEXT_REDIRECT");
  });

  it("FIX: redirect outside try-catch propagates correctly", async () => {
    // This simulates the fixed pattern
    async function fixedAction(): Promise<{ error?: string }> {
      let id: string;

      try {
        // ... save logic ...
        id = "123";
      } catch (error) {
        return {
          error:
            error instanceof Error
              ? error.message
              : "Unable to save the invitation.",
        };
      }

      simulateRedirect(`/admin/invitations/${id}?saved=1`);
    }

    // The redirect error propagates (not caught), simulating Next.js behavior
    await expect(fixedAction()).rejects.toThrow(NextRedirectError);
  });

  it("FIX: real errors inside try-catch are still caught properly", async () => {
    async function fixedAction(): Promise<{ error?: string }> {
      let id: string;

      try {
        throw new Error("Database connection failed");
        id = "123";
      } catch (error) {
        return {
          error:
            error instanceof Error
              ? error.message
              : "Unable to save the invitation.",
        };
      }

      simulateRedirect(`/admin/invitations/${id}?saved=1`);
    }

    const result = await fixedAction();
    expect(result.error).toBe("Database connection failed");
  });
});
