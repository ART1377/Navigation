"use client";

import { useActionState, useEffect } from "react";
import * as actions from "@/app/actions/ticket/ticket-actions";
import Input from "../Input/Input";
import Button from "../Button/Button";
import toast from "react-hot-toast";



export default function TicketForm() {
  const [state, formAction, pending] = useActionState(actions.createTicket, {
    state: {},
  });

    useEffect(() => {
      if (state.state.success) {
        toast.success("تیکت با موفقیت ایجاد شد!"); 
      }
    }, [state.state.success]);

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <div>
        <Input
          name="title"
          placeholder="عنوان تیکت"
          error={state.state.errors?.title?.[0]} // Pass the first error message
          required
        />
      </div>
      <div>
        <Input
          name="description"
          placeholder="توضیحات"
          as="textarea" // Use the `as` prop to render a textarea
          error={state.state.errors?.description?.[0]} // Pass the first error message
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
        ارسال تیکت
      </Button>
    </form>
  );
}
