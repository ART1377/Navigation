"use client";

import Input from "../Input/Input";
import Button from "../Button/Button";
import * as actions from "@/app/actions/auth/auth-actions";
import { useActionState } from "react";

export default function SignupForm() {
  const [state, formAction,pending] = useActionState(actions.signup, {
    state: {},
  });

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <Input
        name="name"
        placeholder="نام"
        required
        error={state.state.errors?.name?.[0]}
      />
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
      <Input
        name="confirmPassword"
        placeholder="تکرار رمز عبور"
        type="password"
        required
        error={state.state.errors?.confirmPassword?.[0]}
      />
      {state.state.errors?._form && (
        <p className="text-red-500">{state.state.errors._form[0]}</p>
      )}
      {state.state.success && (
        <p className="text-green-500">ثبت‌نام با موفقیت انجام شد!</p>
      )}
      <Button
        type="submit"
        variant="primary-dark"
        disabled={pending}
        loading={pending}
        className="w-full"
      >
        ثبت نام
      </Button>
    </form>
  );
}
