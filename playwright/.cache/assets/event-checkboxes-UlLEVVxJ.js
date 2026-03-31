import { j as jsxRuntimeExports } from './jsx-runtime-CmNvG13l.js';
import { r as reactExports } from './index-DULTPS0E.js';

function EventCheckboxes({
  initialEvent2Invited = false,
  initialPlusOne = false,
  initialChildren = false
}) {
  const [event2Invited, setEvent2Invited] = reactExports.useState(initialEvent2Invited);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 rounded-[24px] bg-[#faf4ee] p-4 text-sm text-[#3b2d24]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", name: "event1Invited", defaultChecked: true }),
      "Invite to Event One"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "checkbox",
          name: "event2Invited",
          checked: event2Invited,
          onChange: (e) => setEvent2Invited(e.target.checked)
        }
      ),
      "Invite to Event Two"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "label",
      {
        className: `flex items-center gap-3 ${!event2Invited ? "opacity-40" : ""}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              name: "event2PlusOneAllowed",
              defaultChecked: initialPlusOne,
              disabled: !event2Invited
            }
          ),
          "Event Two: plus one allowed"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "label",
      {
        className: `flex items-center gap-3 ${!event2Invited ? "opacity-40" : ""}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              name: "event2ChildrenAllowed",
              defaultChecked: initialChildren,
              disabled: !event2Invited
            }
          ),
          "Event Two: children allowed"
        ]
      }
    )
  ] });
}

export { EventCheckboxes };
//# sourceMappingURL=event-checkboxes-UlLEVVxJ.js.map
