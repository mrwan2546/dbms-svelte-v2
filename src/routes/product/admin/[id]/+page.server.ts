
import { getUserByMiddleware } from "$lib/middleware/user";
import { error, redirect } from "@sveltejs/kit";
import { PageServerLoad, RequestEvent, type Actions } from "./$types";
import { createProductSchema } from "$lib/schema/product.schema";
import { checkIsAdmin } from "$lib/middleware/admin";
import { conn } from "$lib/db";
import constant from "$lib/constant";
import { IProduct } from "$lib/interface/products.interface";

type TProduct = Omit<IProduct, "created_at" | "updated_at">

export const actions = {
    default: async ({ request, params }: RequestEvent) => {
        const body = await createProductSchema.parseAsync(Object.fromEntries(await request.formData()));
        if (params.id === "add") {
            await conn.execute(constant.createProduct, [
                body.name,
                body.description,
                body.image,
                body.price,
                body.stocks
            ])
        } else {
            // Get products
            const [products] = await conn.query<IProduct>(constant.getProductInfo, [params.id])
            // console.log(products)
            if (products.length === 0) {
                return error(404, {
                    message: "Product not exist."
                })
            }
            // Do update
            await conn.execute(constant.updateProductById, [
                body.name,
                body.description,
                body.image,
                body.price,
                body.stocks,
                products[0].id
            ])

        }
        return redirect(301, "/")
    }
} satisfies Actions;


export const load: PageServerLoad = async ({ cookies, params }: RequestEvent) => {
    const user = await getUserByMiddleware(cookies, true);
    const [success, message] = checkIsAdmin(user?.role || "USER")
    if (!success) return error(403, {
        message: message || "Unknown error"
    })

    let productInfo: TProduct = {
        id: 0,
        title: "",
        description: "",
        image: "",
        price: 0,
        stocks: 0,
    }

    if (params.id !== "add") {
        // Get products
        const [products] = await conn.query<TProduct>(constant.getProductInfo, [params.id])

        // console.log(products)
        // console.log(products)
        if (products.length === 0) {
            return error(404, {
                message: "Product not exist."
            })
        }

        const product = products[0]

        productInfo = { ...product }
    }


    return {
        type: params.id === "add" ? "ADD" : "EDIT",
        data: productInfo
    }
};
