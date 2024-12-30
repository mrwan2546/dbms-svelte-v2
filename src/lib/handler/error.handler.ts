import { LoginRequired } from "$lib/errors/authenticate.errors";
import { json } from "@sveltejs/kit";
import { ZodError } from "zod";

export function handlerError(e: unknown) {
    if (e instanceof LoginRequired) {
        return json({
            message: e.message,
        }, 
        {
            status: 403
        })
    }

    if (e instanceof ZodError) {
        return json({
            message: "Invalid data",
            issues: e.issues || []
        }, 
        {
            status: 400
        })
    }

    console.error(e)
    return json({
        message: "Server error.",
    },
    {
        status: 500
    })
}