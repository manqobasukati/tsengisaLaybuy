import { z } from 'zod';
import { StoreZod } from '~/models/Store.model';



export const LayBuyItemZod = z.object({
    id:z.string().uuid(),
    created_at:z.date(),
    item_name:z.string(),
    receipt:z.string(),
    prize:z.number(),
    deposit_amount:z.number(),
    duration:z.number(),
    store_id:z.string().uuid(),
    store:z.object({StoreZod}).optional(),
    user_id:z.string().uuid(),
})


export const LayBuyItemCreateZod = z.object({
    item_name:z.string(),
    receipt:z.string(),
    prize:z.number(),
    duration:z.number(),
    deposit_amount:z.number(),
    store_id:z.string().uuid(),
    user_id:z.string().uuid(),
});


export type LayBuyItem = z.infer<typeof LayBuyItemZod>;
export type LayBuyItemCreate  = z.infer<typeof LayBuyItemCreateZod>;
