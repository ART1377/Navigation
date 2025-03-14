'use client';

import { useEffect, useState } from 'react';
import TicketForm from '@/app/components/TicketForm/TicketForm';
import TicketList from '@/app/components/TicketList/TicketList';
import { Ticket } from '@prisma/client';

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const fetchTickets = async () => {
    const res = await fetch('/api/tickets');
    const data = await res.json();
    setTickets(data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleSubmit = async (ticket: { title: string; description: string }) => {
    const res = await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ticket),
    });
    const newTicket = await res.json();
    setTickets([...tickets, newTicket]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">پشتیبانی</h1>
      <TicketForm onSubmit={handleSubmit} />
      <TicketList tickets={tickets} />
    </div>
  );
}