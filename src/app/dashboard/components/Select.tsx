"use client";
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface SelectBoxProps {
  value: string;
  onChange: (value: string) => void;
  categories: string[];
  placeholder?: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  value,
  onChange,
  categories,
  placeholder = "Select category",
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={value ? "!text-black" : "text-slate-500"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent>
        {categories.map((c) => (
          <SelectItem key={c} value={c}>
            {c}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBox;
