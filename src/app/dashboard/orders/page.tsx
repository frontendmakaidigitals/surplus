"use client";

import { useMemo, useState } from "react";
import { Eye, Search } from "lucide-react";
import { Button } from "@/ui/shadcn/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/pagination";

type OrderStatus = "new" | "paid" | "shipped" | "cancelled";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  currency: "USD";
  status: OrderStatus;
  createdAt: string;
}

type SortType = "most-recent" | "old";

const ITEMS_PER_PAGE = 5;

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortType>("most-recent");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [page, setPage] = useState(1);

  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "#ORD-1001",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      totalAmount: 578,
      currency: "USD",
      status: "paid",
      createdAt: "2025-01-15",
    },
    {
      id: "2",
      orderNumber: "#ORD-1002",
      customerName: "Sarah Lee",
      customerEmail: "sarah@example.com",
      totalAmount: 1299,
      currency: "USD",
      status: "shipped",
      createdAt: "2025-01-14",
    },
    {
      id: "3",
      orderNumber: "#ORD-1003",
      customerName: "Amit Sharma",
      customerEmail: "amit@example.com",
      totalAmount: 349,
      currency: "USD",
      status: "new",
      createdAt: "2025-01-13",
    },
  ];

  // 🔍 SEARCH + FILTER + SORT
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((o) => o.status === statusFilter);
    }

    // Sorting
    result.sort((a, b) =>
      sortBy === "most-recent"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return result;
  }, [orders, search, sortBy, statusFilter]);

  // 📄 Pagination
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Orders</h1>

      {/* 🔍 Search + Filters */}
      <div className="flex flex-col lg:flex-row gap-3 mb-4">
        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search orders..."
            className="w-full pl-9 pr-3 py-2 text-sm border rounded-md"
          />
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as OrderStatus | "all");
            setPage(1);
          }}
          className="w-full lg:w-48 px-3 py-2 text-sm border rounded-md"
        >
          <option value="all">All statuses</option>
          <option value="new">Pending</option>
          <option value="paid">Paid</option>
          <option value="shipped">Shipped</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value as SortType);
            setPage(1);
          }}
          className="w-full lg:w-48 px-3 py-2 text-sm border rounded-md"
        >
          <option value="most-recent">Most recent</option>
          <option value="old">Oldest</option>
        </select>
      </div>

      {/* 📦 Table */}
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedOrders.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}

            {paginatedOrders.map((order) => (
              <tr key={order.id} className="border-b last:border-none">
                <td className="px-4 py-3 font-medium">{order.orderNumber}</td>
                <td className="px-4 py-3">{order.customerName}</td>
                <td className="px-4 py-3">{order.customerEmail}</td>
                <td className="px-4 py-3 font-semibold">
                  {order.currency} ${order.totalAmount}
                </td>
                <td className="px-4 py-3 capitalize">{order.status}</td>
                <td className="px-4 py-3">{order.createdAt}</td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="icon">
                    <Eye size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔢 Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-end">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={page === i + 1}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
