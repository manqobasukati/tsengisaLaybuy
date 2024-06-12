import { z } from 'zod';

const TransactionZod = z.object({
  id: z.string().uuid(),
  laybuy_id: z.string().uuid(),
  amount: z.number(),
  created_at: z.date(),
});

export const CreateTransactionZod = z.object({
  laybuy_id: z.string().uuid(),
  amount: z.number({ required_error: 'Amount is required' }),
});

export type Transaction = z.infer<typeof TransactionZod>;
export type CreateTransaction = z.infer<typeof CreateTransactionZod>;
