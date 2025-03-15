import TicketForm from "@/app/components/TicketForm/TicketForm";
import TicketList from "@/app/components/TicketList/TicketList";

const SupportPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tickets`);
  const data = await res.json();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">پشتیبانی</h1>
      <TicketForm />
      <TicketList tickets={data} />
    </div>
  );
};

export default SupportPage;
