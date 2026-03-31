// @vitest-environment jsdom

import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, expect, test, vi } from "vitest";

import {
  LocaleProvider,
  useLocale,
} from "@/src/components/locale-context";

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

async function render(element: ReturnType<typeof createElement>) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  await act(async () => {
    root.render(element);
  });

  return {
    container,
    unmount: async () => {
      await act(async () => {
        root.unmount();
      });
      container.remove();
    },
  };
}

function LocaleReader() {
  const { locale } = useLocale();

  return createElement("div", { "data-testid": "locale" }, locale);
}

function LocaleSetter() {
  const { locale, setLocale } = useLocale();

  return createElement(
    "button",
    {
      type: "button",
      onClick: () => setLocale("de"),
    },
    locale,
  );
}

test("useLocale throws outside provider", async () => {
  await expect(async () => {
    const view = await render(createElement(LocaleReader));
    await view.unmount();
  }).rejects.toThrow("useLocale must be used within a LocaleProvider");
});

test("provider supplies the initial locale", async () => {
  const view = await render(
    createElement(
      LocaleProvider,
      { initialLocale: "de" },
      createElement(LocaleReader),
    ),
  );

  expect(view.container.textContent).toBe("de");

  await view.unmount();
});

test("setLocale updates locale state", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(() => Promise.resolve(new Response(null, { status: 204 }))),
  );

  const view = await render(
    createElement(
      LocaleProvider,
      { initialLocale: "en" },
      createElement(LocaleSetter),
    ),
  );

  const button = view.container.querySelector("button");

  if (!button) {
    throw new Error("Expected rendered button.");
  }

  await act(async () => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(button.textContent).toBe("de");

  await view.unmount();
});
