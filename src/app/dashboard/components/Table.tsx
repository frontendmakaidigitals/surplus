// components/ReusableTable.tsx
import React from "react";

type Column<T> = {
  label: string;
  accessor?: keyof T;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  getRowClassName?: (row: T) => string;
};

export function Table<T>({
  columns,
  data,
  emptyMessage = "No records found",
  onRowClick,
  getRowClassName,
}: TableProps<T>) {
  return (
    <table className="w-full table-auto">
      <thead className="bg-slate-100 text-sm text-slate-600 border-b">
        <tr>
          {columns.map((col, i) => (
            <th key={i} className={`p-4 text-left ${col.className || ""}`}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b hover:bg-slate-50 transition ${getRowClassName?.(
                row
              )}`}
              onClick={() => onRowClick && onRowClick(row)} // call
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className={`p-4  ${col.className || ""}`}>
                  {col.render
                    ? col.render(row)
                    : (row[col.accessor as keyof T] as any)}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              className="text-center text-slate-500 py-6"
              colSpan={columns.length}
            >
              {emptyMessage}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
