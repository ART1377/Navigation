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

const signupSchema = z
  .object({
    name: z.string().min(1, "نام الزامی است"),
    email: z.string().email("ایمیل معتبر نیست"),
    password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
    confirmPassword: z
      .string()
      .min(6, { message: "تکرار رمز عبور باید حداقل ۶ کاراکتر باشد" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن مطابقت ندارند",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const [state, formAction, pending] = useActionState(actions.signup, {
    state: {},
  });

  const router = useRouter();
  useEffect(() => {
    if (state.state.success) {
      toast.success("ثبت نام با موفقیت انجام شد!");
      router.push("/auth/login");
    }
  }, [state.state.success, router]);

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full" noValidate>
      <Input
        placeholder="نام"
        {...register("name")}
        error={errors.name?.message || state.state.errors?.name?.[0]}
        required
      />
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
      <Input
        placeholder="تکرار رمز عبور"
        type="password"
        {...register("confirmPassword")}
        error={
          errors.confirmPassword?.message ||
          state.state.errors?.confirmPassword?.[0]
        }
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
        ثبت نام
      </Button>
      <div className="flex gap-1 text-sm">
        <p className="text-gray-700">قبلا ثبت نام کرده اید؟</p>
        <Link
          href={"/auth/login"}
          className="text-primary-dark hover:text-primary-main custom-transition"
        >
          ورود
        </Link>
      </div>
    </form>
  );
}
