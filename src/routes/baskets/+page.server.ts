import constant from "$lib/constant";
import { conn } from "$lib/db";
import type { PageServerLoad } from "./$types";
import { getUserByMiddleware } from "$lib/middleware/user";
import { LoginRequired } from "$lib/errors/authenticate.errors";
import { error, redirect } from "@sveltejs/kit";
import { IBasket } from "$lib/interface/basket.interface";

export const load: PageServerLoad = async ({ cookies }) => {
    try {
        const user = await getUserByMiddleware(cookies);
        if (!user) return;

        // Check product exist
        const [baskets] = await conn.query<IBasket>(constant.getBaskets, [user.id]);

        return {
            baskets: (baskets || []).map((i) => ({
                ...i,
                units: i.units > i.stocks ? i.stocks : i.units
            }))
        }
    } catch (e) {
        if (e instanceof LoginRequired) {
            return redirect(302, "/auth/login")
        }

        console.error(e)
        return error(500, "Server error.")
    }
};
