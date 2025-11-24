"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Download, FileText, Table } from "lucide-react";
import { exportToCSV, exportToExcel } from "@/lib/exportToCSV";
import type { Product } from "../../../../data";

interface ExportDialogProps {
  products: Product[];
  selectedProducts?: Product[];
}

export const ExportDialog: React.FC<ExportDialogProps> = ({
  products,
  selectedProducts = [],
}) => {
  const [open, setOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<"csv" | "json" | "excel">(
    "csv"
  );

  // Export helper
  const runExport = (items: Product[]) => {
    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `products-${timestamp}`;

    switch (exportFormat) {
      case "csv":
        exportToCSV(items, `${filename}.csv`);
        break;
      case "excel":
        exportToExcel(items, `${filename}.xlsx`);
        break;
      case "json":
        const blob = new Blob([JSON.stringify(items, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${filename}.json`;
        a.click();
        URL.revokeObjectURL(url);
        break;
    }

    setOpen(false);
  };

  const hasSelected = selectedProducts.length > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 hover:text-primary-foreground"
        >
          <Download className="w-4 h-4" />
          Export
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Export Products</DialogTitle>
          <DialogDescription>
            Choose the format and pick how you want to export.
          </DialogDescription>
        </DialogHeader>

        {/* EXPORT FORMAT */}
        <div className="space-y-4 py-4">
          <Label className="text-base font-semibold">Export Format</Label>
          <RadioGroup
            value={exportFormat}
            onValueChange={(v: "csv" | "excel") => setExportFormat(v)}
          >
            <div className="flex items-center gap-3 border p-3 rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="csv" id="csv" />
              <FileText className="w-5 h-5 text-green-600" />
              <label htmlFor="csv" className="cursor-pointer flex-1">
                <div className="font-medium">CSV</div>
                <div className="text-xs text-gray-500">
                  Opens easily in Excel or Google Sheets
                </div>
              </label>
            </div>

            <div className="flex items-center gap-3 border p-3 rounded-lg hover:bg-gray-50">
              <RadioGroupItem value="excel" id="excel" />
              <Table className="w-5 h-5 text-orange-600" />
              <label htmlFor="excel" className="cursor-pointer flex-1">
                <div className="font-medium">Excel (.xlsx)</div>
                <div className="text-xs text-gray-500">
                  Microsoft Excel file
                </div>
              </label>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter className="flex justify-between w-full">
          <Button
            variant="outline"
            className="hover:bg-red-500 hover:text-red-100"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            className="bg-primary text-white"
            onClick={() => runExport(products)}
          >
            Bulk Export ({products.length})
          </Button>

          {hasSelected && (
            <Button
              className="bg-secondary hover:bg-secondary/90 text-white"
              onClick={() => runExport(selectedProducts)}
            >
              Export Selected ({selectedProducts.length})
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
