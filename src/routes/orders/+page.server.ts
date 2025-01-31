import constant from "$lib/constant";
import { conn } from "$lib/db";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getUserByMiddleware } from "$lib/middleware/user";
import { LoginRequired } from "$lib/errors/authenticate.errors";
import { IOrders, IOrdersParsed } from "$lib/interface/order.interface";

export const load: PageServerLoad = async ({ cookies }) => {
    try {
        const user = await getUserByMiddleware(cookies);
        if (!user) return;

        // Check product exist
        const [orders] = await conn.query<IOrders>(constant.getOrders, [user.id]);
        if (orders[0]?.id) return {
            orders: orders.map((i) => ({
                ...(i || {}),
                items: JSON.parse(i.items)
            }) as IOrdersParsed),
        }

        return {
            orders: []
        }

    } catch (e) {
        if (e instanceof LoginRequired) {
            return redirect(302, "/auth/login")
        }

        console.error(e)
        return error(500, "Server error.")
    }
};
