import { Product } from "./types";
export const exportToCSV = (products: Product[], filename = "products.csv") => {
  // Define CSV headers
  const headers = ["ID", "Name", "Category", "Price", "Stock", "Condition"];

  // Convert products to CSV rows
  const rows = products.map((product) => [
    product.id,
    `"${product.name.replace(/"/g, '""')}"`, // Escape quotes in name
    product.category,
    product.price,
    product.stock_quantity,
    product.condition,
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToExcel = (
  products: Product[],
  filename = "products.xlsx"
) => {
  exportToCSV(products, filename);
};
