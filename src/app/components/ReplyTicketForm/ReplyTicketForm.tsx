"use client";

import { useActionState } from "react";
import * as actions from "@/app/actions/ticket/ticket-actions";
import Input from "../Input/Input";
import Button from "../Button/Button";

 const ReplyTicketForm=({ ticketId }: { ticketId: string }) =>{
  const [state, formAction, pending] = useActionState(actions.replyToTicket, {
    state: {},
  });

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
        <p className="text-red-500">{state.state.errors._form[0]}</p>
      )}
      {state.state.success && (
        <p className="text-green-500">پاسخ با موفقیت ارسال شد!</p>
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
}

export default ReplyTicketForm