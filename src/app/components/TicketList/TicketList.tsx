import { Ticket } from "@prisma/client";
import ReplyTicketForm from "../ReplyTicketForm/ReplyTicketForm";

export default function TicketList({
  tickets,
  adminPage = false,
}: {
  tickets: Ticket[];
  adminPage?: boolean;
}) {
  return (
    <>
      {!adminPage ? (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="p-4 rounded-lg bg-primary-light">
              <p className="font-medium text-gray-900">{ticket.title}</p>
              <p className="font-normal text-gray-700 my-2">
                {ticket.description}
              </p>
              <p
                className={`text-gray-700 px-3 py-1 rounded-full w-fit ${
                  ticket.status === "open" ? "bg-green-200" : "bg-red-200"
                }`}
              >
                وضعیت :
                <span
                  className={`${
                    ticket.status === "open" ? "text-green-500" : "text-red-500"
                  } ms-1`}
                >
                  {ticket.status === "open" ? "باز" : "بسته"}
                </span>
              </p>
              {ticket.reply && (
                <div className="mt-3 p-3 bg-gray-100 rounded-md">
                  <p className="font-medium text-base  text-gray-900">
                    پاسخ ادمین :{" "}
                  </p>
                  <p className="text-sm mt-2 ms-2 text-gray-700">
                    {ticket.reply}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {tickets.map((ticket: Ticket) => (
              <div key={ticket.id} className="p-4 rounded-lg bg-white">
                <p className="font-medium text-gray-900">{ticket.title}</p>
                <p className="font-normal text-gray-700 my-2">
                  {ticket.description}
                </p>
                <p
                  className={`text-gray-700 px-3 py-1 rounded-full w-fit ${
                    ticket.status === "open" ? "bg-green-200" : "bg-red-200"
                  }`}
                >
                  وضعیت :
                  <span
                    className={`${
                      ticket.status === "open"
                        ? "text-green-500"
                        : "text-red-500"
                    } ms-1`}
                  >
                    {ticket.status === "open" ? "باز" : "بسته"}
                  </span>
                </p>
                {ticket.reply && (
                  <div className="mt-3 p-3 bg-gray-100 rounded-md">
                    <p className="font-medium text-base  text-gray-900">
                      پاسخ ادمین :{" "}
                    </p>
                    <p className="text-sm mt-2 ms-2 text-gray-700">
                      {ticket.reply}
                    </p>
                  </div>
                )}
                <ReplyTicketForm ticketId={ticket.id} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
