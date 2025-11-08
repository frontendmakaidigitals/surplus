"use client";

import React from "react";
import SelectPopover from "@/ui/search-select";

const frameworks = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte", value: "svelte" },
];

export default function SelectBox() {
  const [value1, setValue1] = React.useState("");
  const [value2, setValue2] = React.useState("");

  return (
    <div className="flex gap-10  items-center">
      <SelectPopover
        options={frameworks}
        placeholder="Select Framework"
        searchPlaceholder="Search framework..."
        value={value1}
        onChange={setValue1}
        className="h-12"
      />
      <SelectPopover
        options={frameworks}
        placeholder="Select Library"
        searchPlaceholder="Search library..."
        value={value2}
        onChange={setValue2}
        className="h-12"
      />
    </div>
  );
}
