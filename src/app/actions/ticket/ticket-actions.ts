"use server";

import { db } from "@/app/db/db";
import { Ticket } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ticketSchema = z.object({
  title: z
    .string()
    .min(1, "عنوان تیکت الزامی است")
    .max(100, "عنوان تیکت باید کمتر از ۱۰۰ کاراکتر باشد"),
  description: z
    .string()
    .min(1, "توضیحات الزامی است")
    .max(500, "توضیحات باید کمتر از ۵۰۰ کاراکتر باشد"),
});

export interface CreateTicketFormState {
  state: {
    success?: boolean;
    errors?: {
      title?: string[];
      description?: string[];
      _form?: string[];
    };
  };
}

export async function createTicket(
  prevState: CreateTicketFormState,
  formData: FormData
): Promise<CreateTicketFormState> {
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
  };

  //   // Check if user is logged in
  //   const session = await auth();

  //   if (!session || !session.user || !session.user.id) {
  //     return {
  //       state: {
  //         errors: {
  //           _form: ["ابتدا وارد سایت شوید"],
  //         },
  //         success: false,
  //       },
  //     };
  //   }

  // Validate the data using Zod
  const result = ticketSchema.safeParse(rawData);

  if (!result.success) {
    return {
      state: {
        errors: result.error.flatten().fieldErrors,
        success: false,
      },
    };
  }

  const { title, description } = result.data;

  try {
    await db.ticket.create({
      data: {
        title,
        description,
        // userId: session.user.id, // Associate the ticket with the logged-in user
      },
    });

    revalidatePath("/support"); // Revalidate the /support path
    return { state: { success: true } };
  } catch (error) {
    console.log("Failed to create ticket:", error);
    return {
      state: {
        success: false,
        errors: { _form: ["خطا در ایجاد تیکت"] },
      },
    };
  }
}

export async function fetchTickets(): Promise<Ticket[]> {
  try {
    const tickets = await db.ticket.findMany();
    return tickets;
  } catch (error) {
    console.error("Failed to fetch tickets:", error);
    throw new Error("خطا در دریافت تیکت‌ها");
  }
}

export interface ReplyTicketFormState {
  state: {
    success?: boolean;
    errors?: {
      reply?: string[];
      _form?: string[];
    };
  };
}

export async function replyToTicket(
  prevState: ReplyTicketFormState,
  formData: FormData
): Promise<ReplyTicketFormState> {
  const ticketId = formData.get("ticketId") as string;
  const reply = formData.get("reply") as string;

  if (!ticketId || !reply) {
    return { state: { errors: { _form: ["لطفاً پاسخ را وارد کنید"] } } };
  }

  try {
    await db.ticket.update({
      where: { id: ticketId },
      data: { reply, status: "closed" }, // Mark the ticket as closed after replying
    });

    revalidatePath("/support"); // Revalidate the support page
    revalidatePath("/admin/tickets"); // Revalidate the admin panel
    return { state: { success: true } };
  } catch (error) {
    console.error("Failed to reply to ticket:", error);
    return { state: { errors: { _form: ["خطا در پاسخ به تیکت"] } } };
  }
}
