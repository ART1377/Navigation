"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "../Input/Input";
import Button from "../Button/Button";
import * as actions from "@/app/actions/auth/auth-actions";
import { startTransition, useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import LoginInfoModal from "../LoginInfoModal/LoginInfoModal";


const loginSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
  password: z.string().min(1, "رمز عبور الزامی است"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const [state, formAction, pending] = useActionState(actions.login, {
    state: {},
  });


  const router = useRouter();
  useEffect(() => {
    if (state.state.success) {
      toast.success("ورود با موفقیت انجام شد!");
      router.push("/");
    }
  }, [state.state.success, router]);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <>
    <LoginInfoModal/>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full"
        noValidate
      >
        <Input
          placeholder="ایمیل"
          type="email"
          {...register("email")}
          error={errors.email?.message || state.state.errors?.email?.[0]}
          required
        />
        <Input
          placeholder="رمز عبور"
          type="password"
          {...register("password")}
          error={errors.password?.message || state.state.errors?.password?.[0]}
          required
        />
        {state.state.errors?._form && (
          <p className="text-red-500 text-sm">{state.state.errors._form[0]}</p>
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
        <div className="flex gap-1 text-sm">
          <p className="text-gray-700">حساب کاربری ندارید؟</p>
          <Link
            href={"/auth/signup"}
            className="text-primary-dark hover:text-primary-main custom-transition"
          >
            ثبت نام
          </Link>
        </div>
      </form>
    </>
  );
}
