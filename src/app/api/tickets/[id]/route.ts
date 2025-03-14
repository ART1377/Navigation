import { db } from "@/app/db/db";
import { NextResponse } from "next/server";



export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const ticket = await db.ticket.findUnique({
    where: { id },
  });

  if (!ticket) {
    return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
  }

  return NextResponse.json(ticket);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { response } = await request.json();

  const updatedTicket = await db.ticket.update({
    where: { id },
    data: {
      status: "closed",
    },
  });

  return NextResponse.json(updatedTicket);
}
