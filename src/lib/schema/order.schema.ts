import { z } from "zod";

export const checkoutByBasketSchema = z.object({
    info: z.object({
        name: z.string(),
        address: z.string(),
        address_id: z.coerce.number(),
        mobile: z.string().min(10).max(10)
    }),
    baskets: z.array(z.object({
        basket_id: z.number(),
        unit: z.number().min(1)
    }))
})