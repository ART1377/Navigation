import TicketForm from "@/app/components/TicketForm/TicketForm";
import TicketList from "@/app/components/TicketList/TicketList";
import * as actions from "@/app/actions/ticket/ticket-actions";
import { auth } from "@/app/auth";
import Link from "next/link";

const SupportPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  const data = await actions.fetchTicketsByUserId(userId!);

  return (
    <>
      {userId ? (
        <>
          <div className="custom-container mx-auto p-4 bg-white rounded-xl shadow-md">
            <h1 className="text-xl mb-4 text-gray-900">پشتیبانی</h1>
            <TicketForm />
          </div>
          <div className="custom-container mx-auto p-4 bg-white rounded-xl shadow-md !mt-8">
            <h2 className="text-xl mb-4 text-dark">تیکت های شما</h2>
            <TicketList tickets={data || []} />
          </div>
        </>
      ) : (
        <div className="custom-container mx-auto p-4 bg-white rounded-xl shadow-md">
          <div className="bg-red-200 text-red-500 rounded-xl px-3 py-6">
            لطفاً{" "}
            <Link
              href={"/auth/login"}
              className="font-bold hover:border-b border-red-500"
            >
              وارد
            </Link>
            شوید تا تیکت‌های خود را مشاهده کنید و بتوانید تیکت ثبت کنید.
          </div>
        </div>
      )}
    </>
  );
};

export default SupportPage;
