import { z } from "zod";

export const loginSchema = z.object({
    account: z.string(),
    password: z.string()
})

export const registerSchema = z.object({
    account: z.string(),
    password: z.string(),
    display_name: z.string()
})