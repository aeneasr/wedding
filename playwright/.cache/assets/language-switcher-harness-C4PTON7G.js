import { j as jsxRuntimeExports } from './jsx-runtime-CmNvG13l.js';
import { u as useLocale, g as getDictionary, a as LocaleProvider, c as LanguageSwitcher } from './locale-context-VveYLVII.js';
import './index-DULTPS0E.js';

function LocalePreview() {
  const { locale } = useLocale();
  const dictionary = getDictionary(locale);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { "data-testid": "locale-label", children: dictionary.localeLabel });
}
function LanguageSwitcherHarness({
  initialLocale
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LocaleProvider, { initialLocale, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageSwitcher, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LocalePreview, {})
  ] }) });
}

export { LanguageSwitcherHarness };
//# sourceMappingURL=language-switcher-harness-C4PTON7G.js.map
