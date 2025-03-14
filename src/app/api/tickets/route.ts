import { db } from "@/app/db/db";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const { title, description } = await request.json();


  const newTicket = await db.ticket.create({
    data: {
      title,
      description,
    },
  });

  return NextResponse.json(newTicket, { status: 201 });
}

export async function GET() {
  const tickets = await db.ticket.findMany();
  return NextResponse.json(tickets);
}