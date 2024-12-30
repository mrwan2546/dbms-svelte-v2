import { getUserByMiddleware } from "$lib/middleware/user";
import { RequestEvent } from "./$types";
import { handlerError } from "$lib/handler/error.handler";
import { json } from "@sveltejs/kit";
import { checkIsAdmin } from "$lib/middleware/admin";
import { conn } from "$lib/db";
import constant from "$lib/constant";

export async function DELETE({ cookies, params }: RequestEvent) {
    try {
        // Validate user
        const user = await getUserByMiddleware(cookies, false);
        if (!user) return
        const [success, message] = checkIsAdmin(user?.role || "USER")
        if (!success) return json({
            message: message || "Unknown error"
        }, { status: 403 })

        await conn.execute(constant.deleteProductById, [params.id])

        return json({}, { status: 200 })

    } catch (e) {
        return handlerError(e);
    }
}


