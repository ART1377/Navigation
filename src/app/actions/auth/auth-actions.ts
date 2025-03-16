// actions/auth.ts
"use server";

import { db } from "@/app/db/db";
import { z } from "zod";
import { comparePassword, hashPassword } from "@/app/lib/utils/bcrypt/bcrypt";
import { signIn } from "@/app/auth";



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

const loginSchema = z.object({
  email: z.string().email("ایمیل معتبر نیست"),
  password: z.string().min(1, "رمز عبور الزامی است"),
});

export interface SighUpFormState {
  state: {
    errors?: {
      name?: string[];
      email?: string[];
      password?: string[];
      confirmPassword?: string[];
      _form?: string[];
    };
    success?: boolean;
  };
}

export interface LoginFormState {
  state: {
    errors?: {
      email?: string[];
      password?: string[];
      _form?: string[];
    };
    success?: boolean;
  };
}
export async function signup(
  prevState: SighUpFormState,
  formData: FormData
): Promise<SighUpFormState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const result = signupSchema.safeParse(rawData);

  if (!result.success) {
    return {
      state: {
        errors: result.error.flatten().fieldErrors,
        success: false,
      },
    };
  }

  const existingUser = await db.user.findUnique({
    where: {
      email: result.data.email,
    },
  });

  if (existingUser) {
    return {
      state: {
        errors: {
          email: ["کاربری با این ایمیل موجود است"],
        },
        success: false,
      },
    };
  }

  const { name, email, password } = result.data;

  const hashedPassword = await hashPassword(password);

  try {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    // redirect("/dashboard");

    return {
      state: {
        success: true,
      },
    };
  } catch (error) {
    console.error("Signup failed:", error);
    return {
      state: {
        errors: {
          _form: ["خطا در ایجاد کاربر رخ داده است"],
        },
        success: false,
      },
    };
  }
}

export async function login(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = loginSchema.safeParse(rawData);

  if (!result.success) {
    return {
      state: {
        errors: result.error.flatten().fieldErrors,
        success: false,
      },
    };
  }

  const user = await db.user.findUnique({
    where: { email: result.data.email },
  });

  if (!user) {
    return {
      state: {
        errors: {
          _form: ["کاربری با این ایمیل یافت نشد"],
        },
        success: false,
      },
    };
  }

  if (user) {
    const isValidPassword = await comparePassword(
      result.data.password,
      user.password!
    );
    if (!isValidPassword) {
      return {
        state: {
          errors: {
            _form: ["رمز عبور با ایمیل مطابقت ندارد"],
          },
          success: false,
        },
      };
    }
  }

  const { email, password } = result.data;


  
  try {
    signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // redirect("/dashboard");

    return {
      state: {
        success: true,
      },
    };
  } catch (error) {
    console.error("Login failed:", error);
    return {
      state: {
        errors: {
          _form: ["خطا در ورود به سیستم."],
        },
        success: false,
      },
    };
  }
}
