"use client";

import * as React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Select = ({ value, onValueChange, children, placeholder, className }) => {
  return (
    <RadixSelect.Root value={value} onValueChange={onValueChange}>
      <RadixSelect.Trigger
        className={cn(
          "w-full rounded-lg bg-white/10 border border-white/20 backdrop-blur-lg px-4 py-3 text-sm text-white shadow-md flex justify-between items-center hover:bg-white/15 transition duration-200",
          className
        )}
      >
        <RadixSelect.Value
          placeholder={placeholder}
          className="text-white placeholder-white/70"
        />
        <RadixSelect.Icon>
          <ChevronDown className="h-4 w-4 text-white" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Content
        className="bg-zinc-900 text-white rounded-lg shadow-xl ring-1 ring-white/20 max-h-64 overflow-y-auto z-50"
        position="popper"
      >
        <RadixSelect.Viewport className="p-1">
          {children}
        </RadixSelect.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Root>
  );
};

export const SelectItemStyled = ({ value, children }) => (
  <RadixSelect.Item
    value={value}
    className="px-4 py-2 text-sm rounded-md cursor-pointer hover:bg-white/10 focus:bg-white/15 focus:outline-none transition"
  >
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
  </RadixSelect.Item>
);
