import { j as jsxRuntimeExports } from './jsx-runtime-CmNvG13l.js';
import { GuestRsvpFields } from './guest-rsvp-fields-Cy3zQkMK.js';
import './index-DULTPS0E.js';
import './locale-context-VveYLVII.js';

function AdminRsvpHarness({
  invitationId,
  ...rsvpProps
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", name: "invitationId", value: invitationId }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GuestRsvpFields, { ...rsvpProps })
  ] });
}

export { AdminRsvpHarness };
//# sourceMappingURL=admin-rsvp-harness-BlcWx0Q0.js.map
