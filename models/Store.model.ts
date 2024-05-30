import { z } from 'zod';


export const StoreZod = z.object({
    id:z.string(),
    store_name:z.string()
})

export type Store = z.infer<typeof StoreZod>;