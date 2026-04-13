"use client";

import * as Select from "@radix-ui/react-select";

import { cn } from "@/src/lib/utils";

type StyledSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  "aria-invalid"?: true | undefined;
  "aria-labelledby"?: string;
  children: React.ReactNode;
  error?: boolean;
};

export function StyledSelect({
  value,
  onValueChange,
  placeholder,
  id,
  "aria-invalid": ariaInvalid,
  children,
  error = false,
}: StyledSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        id={id}
        aria-invalid={ariaInvalid}
        className={cn(
          "flex w-full items-center justify-between rounded-xl border bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:ring-2",
          error
            ? "border-error-text focus:border-error-text focus:ring-red-100"
            : "border-border focus:border-sage focus:ring-sage-light",
          !value && "text-ink-light",
        )}
      >
        <Select.Value>{!value ? placeholder : undefined}</Select.Value>
        <Select.Icon className="ml-2 shrink-0 text-ink-light">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 4l4 4 4-4" />
          </svg>
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          className="z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-border bg-paper shadow-lg"
        >
          <Select.Viewport className="p-1">
            {children}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

type StyledSelectItemProps = {
  value: string;
  children: React.ReactNode;
};

export function StyledSelectItem({ value, children }: StyledSelectItemProps) {
  return (
    <Select.Item
      value={value}
      className="flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm text-ink outline-none data-[highlighted]:bg-sage-light data-[highlighted]:text-ink"
    >
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
}
