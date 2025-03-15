  import { db } from "@/app/db/db";
  // import { revalidatePath } from "next/cache";
  import { NextResponse } from "next/server";

  export const dynamic = "force-static";

  export async function POST(request: Request) {
    const { title, description } = await request.json();


    const newTicket = await db.ticket.create({
      data: {
        title,
        description,
      },
    });
    
    // revalidatePath('/support')
    return NextResponse.json(newTicket, { status: 201 });
    
  }

  export async function GET() {
    const tickets = await db.ticket.findMany();
    return NextResponse.json(tickets);
  }