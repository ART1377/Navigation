
import TicketForm from "@/app/components/TicketForm/TicketForm";
import TicketList from "@/app/components/TicketList/TicketList";
import * as actions from "@/app/actions/ticket/ticket-actions";


const SupportPage = async () => {
  const data = await actions.fetchTickets();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">پشتیبانی</h1>
      <TicketForm />
      <TicketList tickets={data} />
    </div>
  );
};

export default SupportPage;
