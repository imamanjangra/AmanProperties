import { useState } from "react";
import { Phone, Home, Target, Copy, PhoneCall } from "lucide-react";

export default function FormData() {
  const [responses] = useState([
    {
      id: 1,
      firstName: "Aman",
      lastName: "Jangra",
      mobile: "9468255640",
      propertyType: "Apartment",
      purpose: "Buy",
    },
    {
      id: 2,
      firstName: "Rahul",
      lastName: "Sharma",
      mobile: "9876543210",
      propertyType: "Villa",
      purpose: "Rent",
    },
  ]);

  const copyNumber = (number) => {
    navigator.clipboard.writeText(number);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-purple-400">
          Form Responses
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          User inquiries from website forms
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur shadow">
        <table className="w-full text-sm">
          <thead className="border-b border-zinc-800 text-zinc-400">
            <tr>
              <th className="p-4 text-left font-medium">Name</th>
              <th className="p-4 text-left font-medium">Mobile</th>
              <th className="p-4 text-left font-medium">Property</th>
              <th className="p-4 text-left font-medium">Purpose</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((item) => (
              <tr
                key={item.id}
                className="border-b border-zinc-800/60 hover:bg-zinc-800/40 transition"
              >
                <td className="p-4">
                  <p className="font-medium">
                    {item.firstName} {item.lastName}
                  </p>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Phone size={15} className="text-purple-400" />
                    <span className="tracking-wide">{item.mobile}</span>
                    <button
                      onClick={() => copyNumber(item.mobile)}
                      className="text-zinc-400 hover:text-purple-400"
                    >
                      <Copy size={14} />
                    </button>
                    <a
                      href={`tel:${item.mobile}`}
                      className="text-green-400 hover:text-green-300"
                    >
                      <PhoneCall size={14} />
                    </a>
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Home size={15} className="text-purple-400" />
                    {item.propertyType}
                  </div>
                </td>

                <td className="p-4">
                  <span className="inline-flex items-center gap-2 rounded-lg bg-purple-500/10 px-3 py-1 text-purple-400">
                    <Target size={13} />
                    {item.purpose}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="grid gap-4 md:hidden">
        {responses.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-4 shadow"
          >
            <p className="font-medium mb-2">
              {item.firstName} {item.lastName}
            </p>

            <div className="space-y-2 text-sm text-zinc-300">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-purple-400" />
                <span>{item.mobile}</span>
                <button
                  onClick={() => copyNumber(item.mobile)}
                  className="ml-auto text-zinc-400"
                >
                  <Copy size={14} />
                </button>
                <a href={`tel:${item.mobile}`} className="text-green-400">
                  <PhoneCall size={14} />
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Home size={14} className="text-purple-400" />
                {item.propertyType}
              </div>

              <div className="inline-flex items-center gap-2 rounded-lg bg-purple-500/10 px-3 py-1 text-purple-400 w-fit">
                <Target size={13} />
                {item.purpose}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
