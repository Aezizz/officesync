'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ticketInputSchema, TicketInput } from '../schema';
import { createTicketAction } from '../actions';
import { TicketStatus, TicketPriority } from '@officesync/shared';

export function TicketForm({ onSuccess }: { onSuccess?: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TicketInput>({
    resolver: zodResolver(ticketInputSchema) as any,
    defaultValues: {
      title: '',
      description: '',
      status: TicketStatus.TODO,
      priority: TicketPriority.MEDIUM,
      divisionId: '',
    },
  });

  const onSubmit = async (data: TicketInput) => {
    await createTicketAction(data);
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div>
        <label className="text-xs font-semibold">Judul Tiket</label>
        <input {...register('title')} className="w-full border rounded px-3 py-1.5 text-sm" />
        {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
      </div>
      <div>
        <label className="text-xs font-semibold">Deskripsi</label>
        <textarea {...register('description')} className="w-full border rounded px-3 py-1.5 text-sm" />
      </div>
      <button type="submit" className="bg-primary text-primary-foreground py-2 rounded text-sm font-semibold">
        Buat Tiket
      </button>
    </form>
  );
}
