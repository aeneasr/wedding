import { j as jsxRuntimeExports } from './jsx-runtime-CmNvG13l.js';
import { r as reactExports } from './index-DULTPS0E.js';
import { L as LocaleContext, g as getDictionary, S as SurfaceCard, F as Field, i as inputClassName, t as textAreaClassName, b as buttonClassName } from './locale-context-VveYLVII.js';

"use client";
function GuestRsvpFields({
  locale,
  eventKey,
  invitees: initialInvitees,
  plusOneAllowed,
  childrenAllowed,
  maxChildren,
  initialPlusOne,
  initialChildren = [],
  state,
  pending = false
}) {
  const localeContext = reactExports.useContext(LocaleContext);
  const resolvedLocale = localeContext?.locale ?? locale;
  if (!resolvedLocale) {
    throw new Error(
      "GuestRsvpFields requires a locale prop when rendered outside LocaleProvider."
    );
  }
  const dictionary = getDictionary(resolvedLocale);
  const [invitees, setInvitees] = reactExports.useState(initialInvitees);
  const [plusOne, setPlusOne] = reactExports.useState(
    initialPlusOne ?? {
      attending: false,
      fullName: "",
      dietaryRequirements: "",
      phoneNumber: ""
    }
  );
  const [childCount, setChildCount] = reactExports.useState(initialChildren.length);
  const [children, setChildren] = reactExports.useState(
    initialChildren.length > 0 ? initialChildren : []
  );
  function resizeChildren(nextCount) {
    setChildCount(nextCount);
    setChildren((current) => {
      if (nextCount <= current.length) {
        return current.slice(0, nextCount);
      }
      return [
        ...current,
        ...Array.from({ length: nextCount - current.length }, () => ({
          fullName: "",
          dietaryRequirements: ""
        }))
      ];
    });
  }
  const payload = JSON.stringify({
    eventKey,
    invitees,
    plusOne: plusOneAllowed ? plusOne : null,
    children: childrenAllowed ? children.slice(0, childCount) : []
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", name: "eventKey", value: eventKey }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", name: "payload", value: payload }),
    invitees.map((invitee, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SurfaceCard, { className: "space-y-4 bg-[#fffaf6]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-2xl text-[#2f241c]", children: invitee.fullName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#705d50]", children: invitee.kind === "adult" ? dictionary.guest.invitedPerson : dictionary.guest.children })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: dictionary.guest.status, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: inputClassName(),
            value: invitee.attending ? "yes" : "no",
            onChange: (event) => {
              const nextAttending = event.target.value === "yes";
              setInvitees(
                (current) => current.map(
                  (entry, currentIndex) => currentIndex === index ? {
                    ...entry,
                    attending: nextAttending
                  } : entry
                )
              );
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "yes", children: dictionary.guest.attending }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "no", children: dictionary.guest.notAttending })
            ]
          }
        ) })
      ] }),
      invitee.attending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: dictionary.guest.dietaryRequirements, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            className: textAreaClassName(),
            value: invitee.dietaryRequirements,
            onChange: (event) => {
              const dietaryRequirements = event.target.value;
              setInvitees(
                (current) => current.map(
                  (entry, currentIndex) => currentIndex === index ? { ...entry, dietaryRequirements } : entry
                )
              );
            }
          }
        ) }),
        invitee.kind === "adult" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: dictionary.guest.phoneNumber, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: inputClassName(),
            value: invitee.phoneNumber,
            onChange: (event) => {
              const phoneNumber = event.target.value;
              setInvitees(
                (current) => current.map(
                  (entry, currentIndex) => currentIndex === index ? { ...entry, phoneNumber } : entry
                )
              );
            }
          }
        ) }) : null
      ] }) : null
    ] }, invitee.inviteeId)),
    plusOneAllowed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(SurfaceCard, { className: "space-y-4 bg-[#fffaf6]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-2xl text-[#2f241c]", children: dictionary.guest.plusOne }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: dictionary.guest.bringPlusOne, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          className: inputClassName(),
          value: plusOne.attending ? "yes" : "no",
          onChange: (event) => {
            setPlusOne((current) => ({
              ...current,
              attending: event.target.value === "yes"
            }));
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "no", children: dictionary.guest.no }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "yes", children: dictionary.guest.yes })
          ]
        }
      ) }),
      plusOne.attending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: dictionary.guest.plusOneName, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: inputClassName(),
            value: plusOne.fullName,
            onChange: (event) => {
              const fullName = event.target.value;
              setPlusOne((current) => ({ ...current, fullName }));
            }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: dictionary.guest.phoneNumber, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: inputClassName(),
            value: plusOne.phoneNumber,
            onChange: (event) => {
              const phoneNumber = event.target.value;
              setPlusOne((current) => ({ ...current, phoneNumber }));
            }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: dictionary.guest.dietaryRequirements, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            className: textAreaClassName(),
            value: plusOne.dietaryRequirements,
            onChange: (event) => {
              const dietaryRequirements = event.target.value;
              setPlusOne((current) => ({ ...current, dietaryRequirements }));
            }
          }
        ) })
      ] }) : null
    ] }) : null,
    childrenAllowed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(SurfaceCard, { className: "space-y-4 bg-[#fffaf6]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-2xl text-[#2f241c]", children: dictionary.guest.children }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: dictionary.guest.bringChildren, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: inputClassName(),
            value: childCount > 0 ? "yes" : "no",
            onChange: (event) => {
              if (event.target.value === "no") {
                resizeChildren(0);
                return;
              }
              resizeChildren(childCount === 0 ? 1 : childCount);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "no", children: dictionary.guest.no }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "yes", children: dictionary.guest.yes })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: dictionary.guest.childrenCount, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            className: inputClassName(),
            value: String(childCount),
            onChange: (event) => resizeChildren(Number(event.target.value)),
            disabled: childCount === 0,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "0", children: "0" }),
              Array.from({ length: maxChildren }, (_, index) => index + 1).map((value) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value, children: value }, value))
            ]
          }
        ) })
      ] }),
      childCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: children.map((child, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 rounded-[22px] bg-[#faf4ee] p-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: `${dictionary.guest.childName} ${index + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: inputClassName(),
            value: child.fullName,
            onChange: (event) => {
              const fullName = event.target.value;
              setChildren(
                (current) => current.map(
                  (entry, currentIndex) => currentIndex === index ? { ...entry, fullName } : entry
                )
              );
            }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: dictionary.guest.dietaryRequirements, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            className: textAreaClassName(),
            value: child.dietaryRequirements,
            onChange: (event) => {
              const dietaryRequirements = event.target.value;
              setChildren(
                (current) => current.map(
                  (entry, currentIndex) => currentIndex === index ? { ...entry, dietaryRequirements } : entry
                )
              );
            }
          }
        ) })
      ] }, `child-${index}`)) }) : null
    ] }) : null,
    state?.error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-2xl bg-[#f7dfd9] px-4 py-3 text-sm text-[#8a3f34]", children: state.error }) : null,
    state?.success ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-2xl bg-[#e0ecde] px-4 py-3 text-sm text-[#355b39]", children: state.success }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: buttonClassName(), disabled: pending, children: pending ? `${dictionary.guest.saveRsvp}...` : dictionary.guest.saveRsvp })
  ] });
}

export { GuestRsvpFields };
//# sourceMappingURL=guest-rsvp-fields-Cy3zQkMK.js.map
