"use client";

import { Ticket } from "@prisma/client";

export default function TicketList({ tickets }: { tickets: Ticket[] }) {
  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div key={ticket.id} className="p-4 border rounded">
          <h3 className="font-bold">{ticket.title}</h3>
          <p>{ticket.description}</p>
          <p>وضعیت: {ticket.status === "open" ? "باز" : "بسته"}</p>
        </div>
      ))}
    </div>
  );
}
