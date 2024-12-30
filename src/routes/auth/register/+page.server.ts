import constant from '$lib/constant';
import { conn } from '$lib/db';
import { hash } from '$lib/password';
import { registerSchema } from '$lib/schema/login.schema';
import { redirect } from '@sveltejs/kit';
import { IUser } from '../../../lib/interface/user.interface';
import type { Actions, RequestEvent } from './$types';
import { handlerError } from '$lib/handler/error.handler';

export const actions = {
    default: async ({ request }: RequestEvent) => {
        try {
            const body = await registerSchema.parseAsync(Object.fromEntries(await request.formData()));

            // Serach in database
            const [accounts] = await conn.query<IUser>(constant.checkUserByUsername, [body.account]);
            if (accounts.length > 0) {
                return {
                    success: false,
                    message: 'User already registered.'
                };
            }

            // Register user
            const password = await hash(body.password);
            await conn.execute(constant.registerUser, [body.account, password, body.display_name]);
        } catch (e) {
            return handlerError(e);
        }

        redirect(301, '/auth/login');
    }
} satisfies Actions;
