"use client";

import { Button } from "@/components/ui/button";
import { TableOfContents, Grid } from "lucide-react";

interface ViewToggleProps {
  view: "table" | "card";
  onChange: (view: "table" | "card") => void;
}

export default function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant={view === "table" ? "default" : "outline"}
        onClick={() => onChange("table")}
        className="!px-2 !py-0"
      >
        <TableOfContents className="!size-[20px]" />
      </Button>

      <Button
        variant={view === "card" ? "default" : "outline"}
        onClick={() => onChange("card")}
        className="!px-2 !py-1"
      >
        <Grid className="!size-[20px]" />
      </Button>
    </div>
  );
}
