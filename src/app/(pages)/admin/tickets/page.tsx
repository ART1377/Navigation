import * as actions from "@/app/actions/ticket/ticket-actions";
import { auth } from "@/app/auth";
import TicketList from "@/app/components/TicketList/TicketList";
import Link from "next/link";

const AdminTicketsPage = async () => {
  const session = await auth();
  const isAdmin = session?.user?.id && session.user.role === "ADMIN";

  const tickets = await actions.fetchTickets();

  return (
    <>
      {isAdmin ? (
        <div className="mx-auto">
          <h1 className="text-xl mb-4 text-gray-900">پنل ادمین - تیکت‌ها</h1>
          <TicketList adminPage tickets={tickets} />
        </div>
      ) : (
        <>
          <div className="custom-container mx-auto p-4 bg-white rounded-xl shadow-md">
            <div className="bg-red-200 text-red-500 rounded-xl px-3 py-6">
              برای مشاهده و پاسخ به تیکت ها ابتدا به عنوان ادمین{" "}
              <Link
                href={"/auth/login"}
                className="font-bold hover:border-b border-red-500"
              >
                وارد
              </Link>{" "}
              سایت شوید.
            </div>
          <div className="text-center flex flex-col gap-2 mt-6 border border-red-500 rounded-xl px-3 py-6">
            <p className="text-red-500 text-3xl">توجه !!!</p>
            <small className="text-gray-900">
              با توجه به این که این سایت صرفا جهت ضمیمه شدن به رزومه طراحی شده
              برای مشاهده و امتحان بخش داشبورد از اطلاعات زیر برای ورود به عنوان
              ادمین استفاده کنید.
            </small>
            <div className="mt-4 flex flex-col gap-2 mx-auto">
              <div className="flex gap-1">
                <small>ایمیل :</small>
                <small className="text-primary-dark">admin@gmail.com</small>
              </div>
              <div className="flex gap-1">
                <small>رمز عبور :</small>
                <small className="text-primary-dark">123456</small>
              </div>
            </div>
          </div>
          </div>
        </>
      )}
    </>
  );
};
export default AdminTicketsPage;
