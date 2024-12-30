import constant from '$lib/constant';
import { conn } from '$lib/db';
import { handlerError } from '$lib/handler/error.handler';
import { IAddress } from '$lib/interface/address.interface';
import { json } from '@sveltejs/kit';
import { RequestEvent } from './$types';

export async function GET({ params }: RequestEvent) {
    try {
        const [data] = await conn.query<IAddress>(constant.getDistrictByProvinceId, [params.id]);
        return json(data);
    } catch (e) {
        return handlerError(e);
    }
}
