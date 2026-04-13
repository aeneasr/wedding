import { InkButton, inkButtonClassName } from "@/src/components/ui";

export function TouchTargetHarness() {
  return (
    <div className="flex gap-4 p-4">
      <InkButton>Primary button</InkButton>
      <InkButton variant="secondary">Secondary button</InkButton>
      <a href="/test" className={inkButtonClassName()}>
        Link styled as button
      </a>
      <button type="submit">Plain button</button>
    </div>
  );
}
