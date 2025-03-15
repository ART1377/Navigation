"use client";

import { useActionState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import * as actions from "@/app/actions/auth/auth-actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(actions.login, {
    state: {},
  });

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <Input
        name="email"
        placeholder="ایمیل"
        type="email"
        required
        error={state.state.errors?.email?.[0]}
      />
      <Input
        name="password"
        placeholder="رمز عبور"
        type="password"
        required
        error={state.state.errors?.password?.[0]}
      />
      {state.state.errors?._form && (
        <p className="text-red-500">{state.state.errors._form[0]}</p>
      )}
      {state.state.success && (
        <p className="text-green-500">ورود با موفقیت انجام شد!</p>
      )}
      <Button
        type="submit"
        variant="primary-dark"
        disabled={pending}
        loading={pending}
        className="w-full"
      >
        ورود
      </Button>
    </form>
  );
}
