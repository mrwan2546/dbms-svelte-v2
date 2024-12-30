import constant from '$lib/constant';
import { conn } from '$lib/db';
import { verify } from '$lib/password';
import { loginSchema } from '$lib/schema/login.schema';
import { encodeToken } from '$lib/token';
import { redirect } from '@sveltejs/kit';
import { IUser, IUserJWT } from '../../../lib/interface/user.interface';
import type { Actions, RequestEvent } from './$types';

export const actions = {
    default: async ({ request, cookies }: RequestEvent) => {
        const body = await loginSchema.parseAsync(Object.fromEntries(await request.formData()));

        // Serach in database
        const [accounts] = await conn.query<IUser>(constant.checkUserByUsername, [body.account]);
        if (accounts.length === 0) {
            return {
                success: false,
                message: 'Invalid credential'
            };
        }

        const account = accounts[0];
        if (!(await verify(account.password, body.password))) {
            return {
                success: false,
                message: 'Invalid credential'
            };
        }

        // Generate JWT
        const token = await encodeToken<IUserJWT>({
            userid: account.id
        });

        cookies.set('token', token, {
            path: '/',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24
        });

        redirect(301, "/")
    }
} satisfies Actions;
