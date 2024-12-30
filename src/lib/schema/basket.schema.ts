import { z } from "zod";

export const basketSchema = z.object({
    product_id: z.number(),
    unit: z.number()
})