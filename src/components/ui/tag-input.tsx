
"use client";

import * as React from "react";
import { X, ChevronsUpDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { cn } from "@/lib/utils";

interface TagInputProps {
  value: string; // Comma-separated string of tags
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  id?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  disabled?: boolean;
  className?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select items...",
  id,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  disabled,
  className,
}) => {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const selectedTags = React.useMemo(() => {
    return value ? value.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0) : [];
  }, [value]);

  const handleSelect = (currentValue: string) => {
    const trimmedValue = currentValue.trim();
    if (!trimmedValue) return;

    const newSelectedTags = [...selectedTags];
    if (!newSelectedTags.some(tag => tag.toLowerCase() === trimmedValue.toLowerCase())) {
      newSelectedTags.push(trimmedValue);
    }
    onChange(newSelectedTags.join(", "));
    setOpen(false);
    setSearchQuery("");
  };

  const handleRemove = (tagToRemove: string) => {
    const newSelectedTags = selectedTags.filter(tag => tag !== tagToRemove);
    onChange(newSelectedTags.join(", "));
  };

  const availableOptions = React.useMemo(() => {
    return options.filter(option => !selectedTags.some(tag => tag.toLowerCase() === option.toLowerCase()));
  }, [options, selectedTags]);

  const filteredOptions = React.useMemo(() => {
    if (!searchQuery.trim()) return availableOptions;
    return availableOptions.filter(option =>
      option.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  }, [availableOptions, searchQuery]);

  const showCreateOption = React.useMemo(() => {
    const trimmedSearch = searchQuery.trim();
    if (!trimmedSearch) return false;
    const isAlreadySelected = selectedTags.some(tag => tag.toLowerCase() === trimmedSearch.toLowerCase());
    const isExistingOption = options.some(opt => opt.toLowerCase() === trimmedSearch.toLowerCase());
    return !isAlreadySelected && !isExistingOption;
  }, [searchQuery, selectedTags, options]);

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-controls="tag-input-combobox"
            className="w-full justify-between h-auto min-h-10 py-2 px-3 text-left font-normal hover:bg-background"
            id={id}
            aria-describedby={ariaDescribedBy}
            aria-invalid={ariaInvalid}
            disabled={disabled}
          >
            {selectedTags.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {selectedTags.map(tag => (
                  <Badge
                    variant="secondary"
                    key={tag}
                    className="py-1 px-2 rounded-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      className="ml-1.5 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent popover from opening/closing
                        handleRemove(tag);
                      }}
                      disabled={disabled}
                      aria-label={`Remove ${tag}`}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </Badge>
                ))}
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command shouldFilter={false}> {/* We handle filtering and "create" option manually */}
            <CommandInput
              placeholder="Search or type to add..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              disabled={disabled}
            />
            <CommandList>
              <CommandEmpty>
                {searchQuery.trim() && !showCreateOption ? "No matching items found." : "Type to search or add new."}
              </CommandEmpty>
              <CommandGroup>
                {filteredOptions.map(option => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => handleSelect(option)}
                    disabled={disabled}
                  >
                    {option}
                  </CommandItem>
                ))}
                {showCreateOption && searchQuery.trim() && (
                  <CommandItem
                    key={`create-${searchQuery.trim()}`}
                    value={searchQuery.trim()}
                    onSelect={() => handleSelect(searchQuery.trim())}
                    disabled={disabled}
                  >
                    Add "{searchQuery.trim()}"
                  </CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
