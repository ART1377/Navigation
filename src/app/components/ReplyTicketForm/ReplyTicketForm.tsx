"use client";

import { useActionState, useEffect } from "react";
import * as actions from "@/app/actions/ticket/ticket-actions";
import Input from "../Input/Input";
import Button from "../Button/Button";
import toast from "react-hot-toast";

const ReplyTicketForm = ({ ticketId }: { ticketId: string }) => {
  const [state, formAction, pending] = useActionState(actions.replyToTicket, {
    state: {},
  });

  useEffect(() => {
    if (state.state.success) {
      toast.success("تیکت با موفقیت ایجاد شد!");
    }
  }, [state.state.success]);

  return (
    <form action={formAction} className="mt-4 space-y-4" noValidate>
      <input type="hidden" name="ticketId" value={ticketId} />
      <div>
        <Input
          name="reply"
          placeholder="پاسخ خود را وارد کنید"
          as="textarea"
          error={state.state.errors?.reply?.[0]}
          required
        />
      </div>
      {state.state.errors?._form && (
        <p className="text-red-500 text-sm">{state.state.errors._form[0]}</p>
      )}
      <Button
        type="submit"
        disabled={pending}
        loading={pending}
        variant="primary-dark"
        className="w-full"
      >
        ارسال پاسخ
      </Button>
    </form>
  );
};

export default ReplyTicketForm;
