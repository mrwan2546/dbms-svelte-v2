import { getUserByMiddleware } from "$lib/middleware/user";
import { RequestEvent } from "./$types";
import { handlerError } from "$lib/handler/error.handler";
import { json } from "@sveltejs/kit";
import { checkIsAdmin } from "$lib/middleware/admin";
import { conn } from "$lib/db";
import constant from "$lib/constant";
import { IProduct } from "$lib/interface/products.interface";

export async function DELETE({ cookies, params }: RequestEvent) {
    try {
        // Validate user
        const user = await getUserByMiddleware(cookies, false);
        if (!user) return
        const [success, message] = checkIsAdmin(user?.role || "USER")
        if (!success) return json({
            message: message || "Unknown error"
        }, { status: 403 })

        // Get products
        const [products] = await conn.query<IProduct>(constant.getProductInfo, [params.id])
        // console.log(products)
        if (products.length === 0) {
            return json({
                message: message || "Unknown error"
            }, { status: 403 })
        }

        const product = products[0]

        // Get order items
        const [ordersItems] = await conn.query<{ order_id: number; }>(constant.getOrderItemByProductId, [product.id])
        // Do delete
        if (ordersItems.length > 0) {
            await conn.execute(constant.deleteManyOrderById, ordersItems.map((i) => i.order_id))
        }
        // Then remove products
        await conn.execute(constant.deleteProductById, [params.id])

        return json({}, { status: 200 })

    } catch (e) {
        return handlerError(e);
    }
}


