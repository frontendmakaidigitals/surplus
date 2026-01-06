"use client";
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export type SelectOption = {
  id?: number;
  key: string;
  value: string;
  subCategories?: SelectOption[];
};

interface SelectBoxProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select option",
  error = false,
}) => {
  // Build lookup map for key -> value
  const valueMap = React.useMemo(() => {
    const map = new Map<string, string>();
    const walk = (opts: SelectOption[]) => {
      for (const opt of opts) {
        map.set(opt.key, opt.value);
        if (opt.subCategories) walk(opt.subCategories);
      }
    };
    walk(options);
    return map;
  }, [options]);

  const displayValue = value ? valueMap.get(value) ?? value : "";

  const renderOptions = (
    opts: SelectOption[],
    level = 0,
    parentPath: boolean[] = []
  ): React.ReactNode[] => {
    return opts.flatMap((opt, idx) => {
      const isLast = idx === opts.length - 1;
      const currentPath = [...parentPath, !isLast];

      return [
        <SelectItem
          key={opt.key}
          value={opt.key}
          className={`relative text-sm group `}
        >
          {/* Hierarchy lines */}
          {level > 0 && (
            <div className="absolute left-0 top-0 bottom-0 flex">
              {parentPath.map((showLine, i) => (
                <div key={i} className="relative w-4">
                  {showLine && (
                    <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-300 group-hover:bg-primary/90" />
                  )}
                </div>
              ))}

              <div className="relative w-4">
                <div
                  className="absolute left-2 top-0 w-px bg-gray-300 group-hover:bg-primary"
                  style={{ height: isLast ? "50%" : "100%" }}
                />
                <div className="absolute left-2 top-1/2 h-px bg-gray-300 group-hover:bg-primary w-2" />
              </div>
            </div>
          )}

          <span style={{ paddingLeft: level > 0 ? `${level * 16 + 8}px` : 0 }}>
            {opt.value}
          </span>
        </SelectItem>,

        // Recursively render children
        ...(opt.subCategories
          ? renderOptions(opt.subCategories, level + 1, currentPath)
          : []),
      ];
    });
  };

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={`${
          error ? "border-red-500/20  bg-red-100 placeholder:text-red-400" : ""
        }`}
      >
        <span
          className={`flex-1 text-left truncate ${error ? "text-red-500" : ""}`}
        >
          {displayValue || (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </span>
      </SelectTrigger>

      <SelectContent className="max-h-[300px] overflow-auto">
        {renderOptions(options)}
      </SelectContent>
    </Select>
  );
};

export default SelectBox;
