"use client";
import { Table } from "../components/Table";
import { JSX, useState, useEffect } from "react";
import { ViewRequestDialog } from "../components/surplus-request/ViewRequestDialog";
import { StatCard } from "../components/Info-Cards";
import axios from "axios";
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
  images: string[];
  message?: string;
  submitted_at: string;
};

export default function SurplesRequestPage() {
  const [requests, setRequests] = useState<SurplusRequest[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/surplus-requests`)
      .then((res) => {
        setRequests(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const columns: Column<SurplusRequest>[] = [
    {
      label: "Date",
      accessor: `submitted_at`,
      className: "w-32",
      render: (row) => (
        <span>{new Date(row.submitted_at).toLocaleDateString()}</span>
      ),
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
      <h1 className="text-3xl font-semibold mb-3">Surplus Requests</h1>
      <div className="mb-6 flex">
        <StatCard
          title="Total Requests"
          value={requests !== null ? requests.length : 0}
        />
      </div>
      {requests == null ? (
        <div className="w-full min-h-[40dvh] flex justify-center items-center">
          <h1 className="text-2xl font-[500] text-slate-500">
            No Request Found
          </h1>
        </div>
      ) : requests.length > 0 ? (
        <div className="overflow-hidden text-sm rounded-xl border ">
          <Table columns={columns} data={requests} />
        </div>
      ) : null}
    </div>
  );
}
