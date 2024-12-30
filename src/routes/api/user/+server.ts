import { getUserByMiddleware } from "$lib/middleware/user";
import { json } from "@sveltejs/kit";
import { RequestEvent } from "./$types";
import { handlerError } from "$lib/handler/error.handler";

export async function GET({ cookies }: RequestEvent) {
    try {
        // Get user
        const user = await getUserByMiddleware(cookies, false);
        return json({
            ...user,
            password: undefined,
        })
    } catch (e) {
        return handlerError(e);
    }
}


