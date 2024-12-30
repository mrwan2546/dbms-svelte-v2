import constant from "$lib/constant";
import { conn } from "$lib/db";
import { error } from "@sveltejs/kit";
import type { IProduct } from "../../../lib/interface/products.interface";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    // Get products
    const [products] = await conn.query<IProduct>(constant.getProductInfo, [params.id])
    // console.log(products)
    if (products.length === 0) {
        return error(404, {
            message: "Product not exist."
        })
    }

    return {
        product: products[0]
    }
};
