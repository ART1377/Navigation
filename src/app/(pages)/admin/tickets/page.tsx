import * as actions from "@/app/actions/ticket/ticket-actions";
import ReplyTicketForm from "@/app/components/ReplyTicketForm/ReplyTicketForm";
import { Ticket } from "@prisma/client";


export default async function AdminTicketsPage() {
  const tickets = await actions.fetchTickets();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">پنل ادمین - تیکت‌ها</h1>
      <div className="space-y-4">
        {tickets.map((ticket:Ticket) => (
          <div key={ticket.id} className="p-4 border rounded">
            <h3 className="font-bold">{ticket.title}</h3>
            <p>{ticket.description}</p>
            <p>وضعیت: {ticket.status === "open" ? "باز" : "بسته"}</p>
            {ticket.reply && (
              <div className="mt-2 p-2 bg-gray-100 rounded">
                <p className="font-semibold">پاسخ ادمین:</p>
                <p>{ticket.reply}</p>
              </div>
            )}
            <ReplyTicketForm ticketId={ticket.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
