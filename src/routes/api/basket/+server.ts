import constant from '$lib/constant';
import { conn } from '$lib/db';
import { handlerError } from '$lib/handler/error.handler';
import { getUserByMiddleware } from '$lib/middleware/user';
import { json, type RequestEvent } from '@sveltejs/kit';
import { IProduct } from '../../../lib/interface/products.interface';
import { basketSchema } from '$lib/schema/basket.schema';

export async function POST({ request, cookies }: RequestEvent) {
    try {
        const body = await basketSchema.parseAsync(await request.json())

        const user = await getUserByMiddleware(cookies);
        if (!user) return;

        // Check product exist
        const [products] = await conn.query<IProduct>(constant.getProductInfo, [body.product_id]);
        if (products.length === 0) {
            return json(
                {
                    message: 'Product not exist.'
                },
                {
                    status: 404
                }
            );
        }

        const product = products[0];
        if(product.stocks - body.unit < 0){
            return json(
                {
                    message: 'Product has been out of stock.'
                },
                {
                    status: 409
                }
            );
        }

        await conn.execute(constant.addProductToBasket, [product.id, user.id, body.unit]);

        return json({
            message: 'Added to basket'
        },
        {
            status: 201
        });
    } catch (e) {
        return handlerError(e);
    }
}