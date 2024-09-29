"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { comboBoxOptions } from "@/utils/types";

function ComboBox({
  name,
  options,
  label,
}: {
  options: comboBoxOptions[];
  label: string;
  name: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <div className="mb-4, w-fit">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-fit h-fit justify-between"
          >
            {value
              ? options.find((option) => option.value === value)?.label
              : label}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Procurar Opção..." className="h-9" />
            <CommandList>
              <CommandEmpty>Não encontrado</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <input type="hidden" name={name} required value={value} />
    </div>
  );
}

export default ComboBox;
