import constant from '$lib/constant';
import { conn } from '$lib/db';
import { handlerError } from '$lib/handler/error.handler';
import { IAddress } from '$lib/interface/address.interface';
import { json } from '@sveltejs/kit';

export async function GET() {
    try {
        const [data] = await conn.query<IAddress>(constant.getProvinces);
        return json(data);
    } catch (e) {
        return handlerError(e);
    }
}
