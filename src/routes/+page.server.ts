import constant from "$lib/constant";
import { conn } from "$lib/db";
import { getUserByMiddleware } from "$lib/middleware/user";
import type { IProduct } from "../lib/interface/products.interface";
import type { PageServerLoad, RequestEvent } from "./$types";

export const load: PageServerLoad = async ({ cookies }: RequestEvent) => {
    const user = await getUserByMiddleware(cookies, true);

    // Get products
    const [products] = await conn.query<IProduct>(constant.getProductList)
    return {
        products,
        isAdmin: user?.role === "ADMIN"
    }
};
