"use client";

import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { Button } from "@/ui/shadcn/button";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "new" | "read";
}

export default function ContactFormsPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      subject: "Product inquiry",
      message: "I want to know more about bulk pricing.",
      createdAt: "2025-01-15",
      status: "new",
    },
    {
      id: "2",
      name: "Sarah Lee",
      email: "sarah@example.com",
      subject: "Shipping question",
      message: "Do you ship internationally?",
      createdAt: "2025-01-14",
      status: "read",
    },
  ]);

  const markAsRead = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status: "read" } : msg))
    );
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Contact Forms</h1>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Subject</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {messages.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                  No contact messages found.
                </td>
              </tr>
            )}

            {messages.map((msg) => (
              <tr key={msg.id} className="border-b last:border-none">
                <td className="px-4 py-3 font-medium">{msg.name}</td>
                <td className="px-4 py-3">{msg.email}</td>
                <td className="px-4 py-3">{msg.subject}</td>
                <td className="px-4 py-3 max-w-xs truncate">{msg.message}</td>
                <td className="px-4 py-3">{msg.createdAt}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      msg.status === "new"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {msg.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => markAsRead(msg.id)}
                  >
                    <Eye size={16} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteMessage(msg.id)}
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
