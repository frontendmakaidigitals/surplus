"use client";

import { Table } from "../components/Table";
import { JSX, useState } from "react";
import { ViewRequestDialog } from "../components/ViewRequestDialog";

type Column<T> = {
  label: string;
  accessor?: keyof T;
  className?: string;
  render?: (row: T) => JSX.Element;
};
export type SurplusRequest = {
  id: string;
  name: string;
  phone: string;
  email: string;
  businessName?: string;
  description?: string;
  category: string;
  quantity: string;
  condition: string;
  location: string;
  images?: string[];
  message?: string;
  createdAt: string;
};

const surplusRequests: SurplusRequest[] = [
  {
    id: "1",
    name: "John Doe",
    phone: "9876543210",
    email: "john@example.com",
    businessName: "JD Traders",
    description: "Surplus steel rods available",
    category: "Metals",
    quantity: "500 kg",
    condition: "New",
    location: "Mumbai, India",
    images: [],
    message: "Need pickup within 7 days",
    createdAt: "2025-01-02",
  },
];
export default function SurplesRequestPage() {
  const [requests] = useState<SurplusRequest[]>(surplusRequests);
  const columns: Column<SurplusRequest>[] = [
    {
      label: "Date",
      accessor: "createdAt",
      className: "w-32",
    },
    {
      label: "Name",
      accessor: "name",
      className: "w-40",
    },
    {
      label: "Phone",
      accessor: "phone",
      className: "w-32",
    },
    {
      label: "Email",
      accessor: "email",
      className: "w-48",
    },
    {
      label: "Category",
      accessor: "category",
      className: "w-32",
    },
    {
      label: "Quantity",
      accessor: "quantity",
      className: "w-20",
    },
    {
      label: "Location",
      accessor: "location",
      className: "w-40",
    },
    {
      label: "Actions",
      className: "w-32 text-right",
      render: (row) => <ViewRequestDialog request={row} />,
    },
  ];
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Surples Requests</h1>

      <div className="overflow-hidden rounded-xl border ">
        <Table columns={columns} data={requests} />
      </div>
    </div>
  );
}
