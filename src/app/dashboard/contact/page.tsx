"use client";
import ConfirmActionButton from "../components/Dialog-Action";
import { useState, useEffect } from "react";
import { Trash2, Info } from "lucide-react";

import axios from "axios";
interface ContactMessage {
  id: string;
  first_name: string;
  email: string;
  phone_number: string;
  message: string;
  created_at: string;
  status: "new" | "read";
}

export default function ContactFormsPage() {
  const [contactForms, setContactForms] = useState<ContactMessage[]>([]);

  useEffect(() => {
    fetchContactForms();
  }, []);

  const fetchContactForms = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/inquiries`)
      .then((res) => {
        setContactForms(res.data.data);
      });
  };

  console.log(contactForms);

  const messages = contactForms.filter((msg) => msg.status === "new");

  const deleteMessage = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/inquiries/${id}`
      );
      fetchContactForms();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Contact Forms</h1>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Message</th>
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
                <td className="px-4 py-3">
                  {new Date(msg.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 font-medium">{msg.first_name}</td>
                <td className="px-4 py-3">{msg.email}</td>
                <td className="px-4 py-3">{msg.phone_number}</td>
                <td className="px-4 py-3 max-w-xs truncate ">
                  {msg.message.length > 50 ? (
                    <div className="flex items-center gap-2 ">
                      <span className="truncate">
                        {msg.message.slice(0, 20)}...
                      </span>
                      <div className="relative group">
                        <button className="w-4 h-4 rounded-full border border-gray-400 text-xs text-gray-600 flex items-center justify-center">
                          <Info />
                        </button>
                        <div className="absolute top-full mb-2 z-[9999999999999999] w-auto bg-gray-800 text-white text-xs p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                          {msg.message}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <span>{msg.message}</span>
                  )}
                </td>

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
                <td className="px-4 py-3 text-right">
                  <ConfirmActionButton
                    onConfirm={() => deleteMessage(msg.id)}
                    title="Delete Contact Message?"
                    description="This will permanently remove the message."
                    confirmText="Delete"
                    trigger={
                      <Trash2
                        size={16}
                        className="text-red-500 group-hover:text-red-50"
                      />
                    }
                    triggerVariant="ghost"
                    buttonClassName="group"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
