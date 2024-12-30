import constant from '$lib/constant';
import { conn } from '$lib/db';
import { handlerError } from '$lib/handler/error.handler';
import { getUserByMiddleware } from '$lib/middleware/user';
import { json, type RequestEvent } from '@sveltejs/kit';

export async function DELETE({ cookies, params }: RequestEvent) {
    try {
        const user = await getUserByMiddleware(cookies);
        if (!user) return;

        await conn.execute(constant.deleteBasketById, [params.id]);
        return json(
            {},
            {
                status: 200
            }
        );
    } catch (e) {
        return handlerError(e);
    }
}